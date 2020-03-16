import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from 'immutable';
import { VideoService } from '../../services/video.service';
import { UserService } from '../../services/user.service';
import { Video } from '../../services/video/state/video.model';

@Component({
  selector: 'app-video-grid',
  templateUrl: './video-grid.component.html',
  styleUrls: ['./video-grid.component.scss'],
})
export class VideoGridComponent implements OnInit {
  videos$: Observable<List<Video>>;

  constructor(
    private videoService: VideoService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.videos$ = this.videoService.selectAll();
  }

  async getOwner(id: string) {
    const owner = await this.userService.getUser(id);
    return owner.name;
  }
}
