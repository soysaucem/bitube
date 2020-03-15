import { Component, OnInit } from '@angular/core';
import { BUCKET_URL } from '../../util/variables';
import { ActivatedRoute } from '@angular/router';
import { Video } from '../../models/video.model';
import { VideoService } from '../../services/video.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-watch-video',
  templateUrl: './watch-video.component.html',
  styleUrls: ['./watch-video.component.scss'],
})
export class WatchVideoComponent implements OnInit {
  bucketUrl = BUCKET_URL;
  videoId: string;
  video: Video;

  constructor(
    private activatedRoute: ActivatedRoute,
    private videoService: VideoService,
    private userService: UserService
  ) {}

  async ngOnInit() {
    this.videoId = this.activatedRoute.snapshot.paramMap.get('id');
    this.video = await this.videoService.getVideo(this.videoId);
  }
}
