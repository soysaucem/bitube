import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from 'immutable';
import { Video } from '../../services/video/state/video.model';
import { VideoQuery } from '../../services/video/state/video.query';
import { UserQuery } from '../../services/user/state/user.query';

@Component({
  selector: 'app-video-grid',
  templateUrl: './video-grid.component.html',
  styleUrls: ['./video-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VideoGridComponent implements OnInit {
  videos$: Observable<List<Video>>;

  constructor(private videoQuery: VideoQuery, private userQuery: UserQuery) {}

  ngOnInit() {
    this.videos$ = this.videoQuery.selectVideos();
  }

  async getOwner(id: string) {
    const owner = await this.userQuery.getUser(id);
    return owner.name;
  }
}
