import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, Video, VideoHistory } from '../../models';
import { UserQuery } from '../../state/user/user.query';
import { VideoHistoryService } from '../../state/video-history/video-history.service';
import { VideoQuery } from '../../state/video/video.query';

@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.scss'],
})
export class HistoryItemComponent implements OnInit {
  @Input() videoHistory: VideoHistory;
  video: Video;
  owner: User;

  constructor(
    private videoHistoryService: VideoHistoryService,
    private videoQuery: VideoQuery,
    private userQuery: UserQuery,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.video = await this.videoQuery.getVideo(this.videoHistory.videoRef);
    this.owner = await this.userQuery.getUser(this.video.ownerRef);
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
