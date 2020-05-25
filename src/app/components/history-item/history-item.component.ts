import { Router } from '@angular/router';
import { UserQuery } from './../../services/user/state/user.query';
import { Video } from './../../services/video/state/video.model';
import { VideoQuery } from './../../services/video/state/video.query';
import { Component, OnInit, Input } from '@angular/core';
import { VideoHistory } from '../../services/video-history/state/video-history.model';
import { User } from '../../services/user/state/user.model';
import { VideoHistoryService } from '../../services/video-history/state/video-history.service';

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
