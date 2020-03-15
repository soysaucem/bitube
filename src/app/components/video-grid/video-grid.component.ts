import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from 'immutable';
import { Video } from '../../models/video.model';
import { VideoService } from '../../services/video.service';
import { BUCKET_URL } from '../../util/variables';

@Component({
  selector: 'app-video-grid',
  templateUrl: './video-grid.component.html',
  styleUrls: ['./video-grid.component.scss'],
})
export class VideoGridComponent implements OnInit {
  videos$: Observable<List<Video>>;
  bucketUrl = BUCKET_URL;

  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.videos$ = this.videoService.selectAll();
  }
}
