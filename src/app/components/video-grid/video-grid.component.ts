import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from 'immutable';
import { Video } from '../../services/video/state/video.model';
import { VideoQuery } from '../../services/video/state/video.query';
import { UserQuery } from '../../services/user/state/user.query';
import { generateKeywords } from 'src/app/util/generate-keywords';
import { tap } from 'rxjs/operators';
import { VideoService } from '../../services/video/state/video.service';

@Component({
  selector: 'app-video-grid',
  templateUrl: './video-grid.component.html',
  styleUrls: ['./video-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VideoGridComponent implements OnInit {
  videos$: Observable<List<Video>>;

  constructor(
    private videoQuery: VideoQuery,
    private userQuery: UserQuery,
    private videoService: VideoService
  ) {}

  ngOnInit(): void {
    this.videos$ = this.videoQuery.selectVideos().pipe(
      tap(videos =>
        videos.forEach(video =>
          this.videoService.updateVideo(video.id, {
            keywords: generateKeywords(video.title),
          })
        )
      )
    );
  }

  async getOwner(id: string): Promise<string> {
    const owner = await this.userQuery.getUser(id);
    return owner.name;
  }
}
