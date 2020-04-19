import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { switchMap } from 'rxjs/operators';
import { ComponentWithSubscription } from '../../helper-components/component-with-subscription/component-with-subscription';
import { AuthService } from '../../services/auth.service';
import { User } from '../../services/user/state/user.model';
import { UserQuery } from '../../services/user/state/user.query';
import {
  fromJS,
  Video,
  VideoJSON,
} from '../../services/video/state/video.model';
import { VideoService } from '../../services/video/state/video.service';
import { VideoStore } from '../../services/video/state/video.store';
import { downloadVideo } from '../../util/download';
import { generateVideoUrl } from '../../util/video-url-generator';

type Opinion = 'like' | 'dislike';

@Component({
  selector: 'app-watch-video',
  templateUrl: './watch-video.component.html',
  styleUrls: ['./watch-video.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WatchVideoComponent extends ComponentWithSubscription
  implements OnInit {
  video: Video;
  owner: User;
  me: User;
  likeRatio: number;
  link: string;
  facebookUrl: string;
  twitterUrl: string;

  private updated = false;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService,
    private userQuery: UserQuery,
    private videoStore: VideoStore,
    private auth: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {
    super();
  }

  ngOnInit(): void {
    this.setupVideoSubscriber();
    this.facebookUrl = `https://www.facebook.com/sharer/sharer.php?display=page&u=${document.location.href}&src=sdkpreparse`;
    this.twitterUrl = `https://twitter.com/intent/tweet?url=${document.location.href}`;
  }

  /**
   * Setup video stream
   */
  setupVideoSubscriber(): void {
    this.autoUnsubscribe(
      this.route.params.pipe(
        switchMap(({ id }) => this.videoService.syncDoc({ id }))
      )
    ).subscribe(async (video: VideoJSON) => {
      try {
        this.video = fromJS(video);
        this.videoStore.setActive(this.video.id);

        // Generate cloudfront link
        this.link = await generateVideoUrl(this.video.id);

        // Set video display information
        this.owner = await this.userQuery.getUser(this.video.ownerId);
        this.me = await this.userQuery.getMyAccount();
        this.likeRatio =
          this.video.likes.size /
          (this.video.likes.size + this.video.dislikes.size);

        // Update view count for video
        if (!this.updated) {
          this.videoService.updateVideo(this.video.id, {
            views: this.video.views + 1,
          });
          this.updated = true;
        }
      } catch (err) {
        console.error('Failed to retrieve video');
        console.error(err);
      }
    });
  }

  /**
   * Copy video link to clipboard
   */
  copy() {
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
   * Update likes/dislikes for video on user action
   * @param type type of action (like/dislike)
   */
  async updateOpinion(type: Opinion): Promise<void> {
    if (!this.me) {
      return;
    }

    if (type === 'like' && !this.isLiked()) {
      const likes = this.video.likes.push(this.me.id);
      let dislikes = this.video.dislikes;

      // Remove dislike on like
      if (dislikes.includes(this.me.id)) {
        dislikes = dislikes.filter((dislike) => dislike !== this.me.id);
      }

      await this.videoService.updateVideo(this.video.id, {
        likes: likes.toArray(),
        dislikes: dislikes.toArray(),
      });
    } else if (type === 'dislike' && !this.isDisliked()) {
      const dislikes = this.video.dislikes.push(this.me.id);
      let likes = this.video.likes;

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
      if (index === this.video.tags.size - 1) {
        tagString += `#${tag}.`;
      } else {
        tagString += `#${tag}, `;
      }
    });
    return tagString;
  }

  /**
   * Generate download link and invoke it to download
   */
  async download(): Promise<void> {
    if (!(await this.auth.isAuthenticated())) {
      this.router.navigate(['login']);
      return;
    }

    const url = await generateVideoUrl(this.video.id);
    downloadVideo(url, this.video.title);
  }
}
