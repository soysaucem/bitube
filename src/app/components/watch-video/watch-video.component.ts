import { MetaTagService } from './../../services/meta-tag.service';
import { CookieService } from 'ngx-cookie-service';
import {
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Subject, combineLatest } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { ComponentWithFollowButton } from '../../abstract-components/component-with-follow-button';
import { AuthService } from '../../services/auth.service';
import { FollowService } from '../../services/follow.service';
import { UserQuery } from '../../state/user/user.query';
import { VideoQuery } from '../../state/video/video.query';
import { VideoService } from '../../state/video/video.service';
import { VideoStore } from '../../state/video/video.store';
import { downloadVideo } from '../../util/download';
import { VideoHistoryService } from '../../state/video-history/video-history.service';
import { Video } from '../../models';
import { List } from 'immutable';
import { noUndefined } from '@angular/compiler/src/util';
import { UserService } from '../../state/user/user.service';

type Opinion = 'like' | 'dislike';
declare const FB: any;

@Component({
  selector: 'app-watch-video',
  templateUrl: './watch-video.component.html',
  styleUrls: ['./watch-video.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WatchVideoComponent
  extends ComponentWithFollowButton
  implements OnInit, OnDestroy {
  @ViewChild('player') player: ElementRef;

  video: Video;
  likeRatio: number;
  link: string;
  facebookUrl: string;
  twitterUrl: string;

  private updated: boolean = false;

  watchVideoChanges$: Subject<any> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private videoQuery: VideoQuery,
    private userQuery: UserQuery,
    private userService: UserService,
    private videoStore: VideoStore,
    private auth: AuthService,
    private snackbar: MatSnackBar,
    private cookieService: CookieService,
    private titleService: Title,
    private videoHistoryService: VideoHistoryService,
    private metaTagService: MetaTagService,
    readonly followService: FollowService,
    readonly router: Router
  ) {
    super(followService, router);
    FB.init({
      appId: '2658133077766202',
      cookie: false, // enable cookies to allow the server to access
      // the session
      xfbml: true, // parse social plugins on this page
      version: 'v3.0',
    });
  }

  ngOnInit(): void {
    this.setupVideoSubscriber();
    this.twitterUrl = `https://twitter.com/intent/tweet?url=${document.location.href}`;
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.watchVideoChanges$.next();
    this.watchVideoChanges$.complete();
  }

  /**
   * Setup video stream
   */
  setupVideoSubscriber(): void {
    this.autoUnsubscribe(
      this.route.params.pipe(
        switchMap(({ id }) => this.videoService.syncDoc({ id }))
      )
    ).subscribe();

    this.autoUnsubscribe(
      this.route.params.pipe(
        switchMap(({ id }) => this.videoQuery.selectEntity(id)),
        filter((video) => video !== undefined)
      )
    ).subscribe(async (video: Video) => {
      try {
        this.handleIncomingVideo(video);
      } catch (err) {
        console.error('Failed to retrieve video');
        console.error(err);
      }
    });
  }

  async handleIncomingVideo(video: Video): Promise<void> {
    this.video = video;
    this.videoStore.setActive(this.video.id);

    // Set browser title
    this.titleService.setTitle(this.video.title);

    // Set metadata
    this.metaTagService.setSocialMediaTags(
      this.video.title,
      this.video.thumbnail
    );

    // Generate cloudfront link of video
    this.link = video.location;

    //Close subscription for previous video
    this.watchVideoChanges$.next();

    this.setupDisplayInfoForVideo();
    this.updateViewCount();
  }

  setupDisplayInfoForVideo(): void {
    this.selectUsersAndSubscribe();
    this.likeRatio =
      this.video.likes.length /
      (this.video.likes.length + this.video.dislikes.length);
  }

  selectUsersAndSubscribe(): void {
    this.autoUnsubscribe(
      this.userService.syncUser(this.video.ownerRef)
    ).subscribe();

    this.autoUnsubscribe(
      combineLatest([
        this.userQuery.selectEntity(this.video.ownerRef),
        this.userQuery.selectMyAccount(),
      ]).pipe(takeUntil(this.watchVideoChanges$))
    ).subscribe(async ([owner, me]) => {
      try {
        this.user = owner;
        this.me = me;
        await this.updateVideoHistoriesForCurrentUser();
      } catch (err) {
        console.error('Failed to setup before watching a video!');
        console.error(err);
      }
    });
  }

  updateViewCount(): void {
    if (!this.updated) {
      this.videoService.updateVideo(this.video.id, {
        views: this.video.views + 1,
      });
      this.updated = true;
    }
  }

  async updateVideoHistoriesForCurrentUser(): Promise<void> {
    if (this.me) {
      await this.videoHistoryService.addVideoHistory({
        ownerRef: this.me.id,
        videoRef: this.video.id,
      });
    }
  }

  setupDefaultPlayerProps(): void {
    const playerEl = this.player.nativeElement as HTMLVideoElement;

    if (this.cookieService.get('media-muted')) {
      playerEl.muted =
        this.cookieService.get('media-muted') === 'true' ? true : false;
    }

    if (this.cookieService.get('media-volume')) {
      playerEl.volume = Number(this.cookieService.get('media-volume'));
    }
  }

  handleVolume(event: any): void {
    this.cookieService.set('media-muted', event.target.muted);
    this.cookieService.set('media-volume', event.target.volume);
  }

  /**
   * Copy video link to clipboard
   */
  copy(): void {
    const el = document.createElement('textarea');
    el.value = document.location.href;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    this.snackbar.open('Copied!', 'Dismiss', {
      duration: 3000,
      horizontalPosition: 'left',
    });
  }

  /**
   * Generate download link and invoke it to download
   */
  async download(): Promise<void> {
    if (!(await this.auth.isAuthenticated())) {
      this.router.navigate(['login']);
      return;
    }

    downloadVideo(this.link, this.video.title);
  }

  /**
   * Update likes/dislikes for video on user action
   * @param type type of action (like/dislike)
   */
  async updateOpinion(type: Opinion): Promise<void> {
    if (!this.me) {
      return;
    }

    if (type === 'like') {
      const likes = this.isLiked()
        ? List(this.video.likes).filter((like) => like !== this.me.id)
        : List(this.video.likes).push(this.me.id);
      let dislikes = List(this.video.dislikes);

      // Remove dislike on like
      if (dislikes.includes(this.me.id)) {
        dislikes = dislikes.filter((dislike) => dislike !== this.me.id);
      }

      await this.videoService.updateVideo(this.video.id, {
        likes: likes.toArray(),
        dislikes: dislikes.toArray(),
      });
    } else if (type === 'dislike') {
      const dislikes = this.isDisliked()
        ? List(this.video.dislikes).filter((dislike) => dislike !== this.me.id)
        : List(this.video.dislikes).push(this.me.id);
      let likes = List(this.video.likes);

      // Remove like on dislike
      if (likes.includes(this.me.id)) {
        likes = likes.filter((like) => like !== this.me.id);
      }

      await this.videoService.updateVideo(this.video.id, {
        likes: likes.toArray(),
        dislikes: dislikes.toArray(),
      });
    }
  }

  isLiked(): boolean {
    return this.video.likes.includes(this.me?.id) ? true : false;
  }

  isDisliked(): boolean {
    return this.video.dislikes.includes(this.me?.id) ? true : false;
  }

  get description(): string {
    return this.video.description
      ? this.video.description
      : 'There is no description for this video';
  }

  get publishedDate(): string {
    const date = moment(this.video.createdAt);
    return date.format('DD MMM YYYY');
  }

  get tags(): string {
    let tagString = '';
    this.video.tags.forEach((tag, index) => {
      if (index === this.video.tags.length - 1) {
        tagString += `#${tag}.`;
      } else {
        tagString += `#${tag}, `;
      }
    });
    return tagString;
  }

  get followButtonText(): string {
    return this.isFollowed ? 'Unfollow' : 'Follow';
  }

  shareFacebook() {
    return FB.ui(
      {
        display: 'popup',
        method: 'share',
        href: `${window.location.href}`,
      },
      function (response) {}
    );
  }
}
