import { ComponentWithSubscription } from './../../abstract-components/component-with-subscription';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, Video, VideoHistory } from '../../models';
import { UserQuery } from '../../state/user/user.query';
import { VideoHistoryService } from '../../state/video-history/video-history.service';
import { VideoQuery } from '../../state/video/video.query';
import { VideoService } from '../../state/video/video.service';
import { UserService } from '../../state/user/user.service';

@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.scss'],
})
export class HistoryItemComponent
  extends ComponentWithSubscription
  implements OnChanges {
  @Input() videoHistory: VideoHistory;
  video: Video;
  owner: User;

  constructor(
    private videoHistoryService: VideoHistoryService,
    private videoQuery: VideoQuery,
    private videoService: VideoService,
    private userQuery: UserQuery,
    private userService: UserService,
    private router: Router
  ) {
    super();
  }

  ngOnChanges(): void {
    this.autoUnsubscribe(
      this.videoService.syncVideo(this.videoHistory.videoRef)
    ).subscribe();

    this.autoUnsubscribe(
      this.userService.syncUser(this.videoHistory.ownerRef)
    ).subscribe();

    this.autoUnsubscribe(
      this.videoQuery.selectEntity(this.videoHistory.videoRef)
    ).subscribe((video) => (this.video = video));

    this.autoUnsubscribe(
      this.userQuery.selectEntity(this.videoHistory.ownerRef)
    ).subscribe((user) => (this.owner = user));
  }

  async removeHistory(event: MouseEvent): Promise<void> {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.videoHistoryService.removeVideoHistory(this.videoHistory.id);
  }

  navigateToOwnerChannel(event: MouseEvent): void {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.router.navigate([`/channel/${this.owner.id}`]);
  }
}
