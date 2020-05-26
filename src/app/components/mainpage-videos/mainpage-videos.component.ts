import { PlaylistService } from './../../services/playlist/state/playlist.service';
import { UserService } from './../../services/user/state/user.service';
import { UserQuery } from './../../services/user/state/user.query';
import { Component, OnInit } from '@angular/core';
import { VideoQuery } from '../../services/video/state/video.query';
import { VideoService } from '../../services/video/state/video.service';
import { tap } from 'rxjs/operators';
import { generateKeywords } from '../../util/generate-keywords';
import { Observable } from 'rxjs';
import { List } from 'immutable';
import { Video } from '../../services/video/state/video.model';
import { Title } from '@angular/platform-browser';
import { User, toUserJS, makeUser } from '../../services/user/state/user.model';
import { makePlaylist } from '../../services/playlist/state/playlist.model';

@Component({
  selector: 'app-mainpage-videos',
  templateUrl: './mainpage-videos.component.html',
  styleUrls: ['./mainpage-videos.component.scss'],
})
export class MainPageVideosComponent implements OnInit {
  featuredVideos$: Observable<List<Video>>;
  me: User;

  constructor(
    private userQuery: UserQuery,
    private userService: UserService,
    private videoQuery: VideoQuery,
    private videoService: VideoService,
    private playlistService: PlaylistService,
    private titleService: Title
  ) {}

  async ngOnInit(): Promise<void> {
    this.titleService.setTitle('BiboApp');

    this.featuredVideos$ = this.videoQuery.selectVideos().pipe(
      tap((videos) =>
        videos.forEach((video) =>
          this.videoService.updateVideo(video.id, {
            keywords: generateKeywords(video.title),
          })
        )
      )
    );

    this.me = await this.userQuery.getMyAccount();
    await this.createDefaultPlaylist();
  }

  async createDefaultPlaylist(): Promise<void> {
    if (!this.me || this.me.defaultPlaylist) {
      return;
    }

    const defaultPlaylist = await this.playlistService.addPlaylist(
      makePlaylist({
        ownerRef: this.me.id,
        name: 'Watch later',
      })
    );

    await this.userService.updateUser(this.me.id, {
      defaultPlaylist: defaultPlaylist.id,
    });
  }
}
