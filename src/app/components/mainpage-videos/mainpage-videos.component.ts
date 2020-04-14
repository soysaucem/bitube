import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { VideoQuery } from '../../services/video/state/video.query';
import { VideoService } from '../../services/video/state/video.service';
import { tap } from 'rxjs/operators';
import { generateKeywords } from '../../util/generate-keywords';
import { Observable } from 'rxjs';
import { List } from 'immutable';
import { Video } from '../../services/video/state/video.model';

@Component({
  selector: 'app-mainpage-videos',
  templateUrl: './mainpage-videos.component.html',
  styleUrls: ['./mainpage-videos.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MainPageVideosComponent implements OnInit {
  featuredVideos$: Observable<List<Video>>;

  constructor(
    private videoQuery: VideoQuery,
    private videoService: VideoService
  ) {}

  ngOnInit(): void {
    this.featuredVideos$ = this.videoQuery.selectVideos().pipe(
      tap((videos) =>
        videos.forEach((video) =>
          this.videoService.updateVideo(video.id, {
            keywords: generateKeywords(video.title),
          })
        )
      )
    );
  }
}
