import { ComponentWithSubscription } from './../../abstract-components/component-with-subscription';
import { PlaylistService } from '../../state/playlist/playlist.service';
import { Router } from '@angular/router';
import { UserQuery } from '../../state/user/user.query';
import { VideoQuery } from '../../state/video/video.query';
import { Component, OnInit, Input } from '@angular/core';
import { User, Video } from '../../models';
import { VideoService } from '../../state/video/video.service';
import { UserService } from '../../state/user/user.service';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-video-list-item',
  templateUrl: './video-list-item.component.html',
  styleUrls: ['./video-list-item.component.scss'],
})
export class VideoListItemComponent
  extends ComponentWithSubscription
  implements OnInit {
  @Input() playlistId: string;
  @Input() videoListItemId: string;
  video: Video;
  owner: User;

  constructor(
    private playlistService: PlaylistService,
    private videoQuery: VideoQuery,
    private videoService: VideoService,
    private userQuery: UserQuery,
    private userService: UserService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.autoUnsubscribe(
      this.videoService.syncVideo(this.videoListItemId)
    ).subscribe();

    this.autoUnsubscribe(
      this.videoQuery.selectEntity(this.videoListItemId).pipe(
        tap((video) => (this.video = video)),
        switchMap((video) => this.userService.syncUser(video.ownerRef))
      )
    ).subscribe();

    this.autoUnsubscribe(
      this.userQuery.selectEntity(this.video.ownerRef)
    ).subscribe((user) => (this.owner = user));
  }

  async removeVideoListItem(event: MouseEvent): Promise<void> {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.playlistService.removeVideoFromPlaylist(
      this.videoListItemId,
      this.playlistId
    );
  }

  navigateToOwnerChannel(event: MouseEvent): void {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.router.navigate([`/channel/${this.owner.id}`]);
  }
}
