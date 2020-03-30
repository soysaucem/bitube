import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { List } from 'immutable';
import { Observable } from 'rxjs';
import { Video } from '../../services/video/state/video.model';
import { VideoQuery } from '../../services/video/state/video.query';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss'],
})
export class MainpageComponent implements OnInit {
  videos$: Observable<List<Video>>;

  constructor(readonly auth: AuthService, private videoQuery: VideoQuery) {}

  ngOnInit(): void {
    this.videos$ = this.videoQuery.selectVideos();
  }
}
