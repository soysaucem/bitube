import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { createPlaylist, User, Video } from '../../models';
import { PlaylistService } from '../../state/playlist/playlist.service';
import { UserQuery } from '../../state/user/user.query';
import { UserService } from '../../state/user/user.service';
import { VideoQuery } from '../../state/video/video.query';
import { VideoService } from '../../state/video/video.service';
import { ComponentWithSubscription } from './../../abstract-components/component-with-subscription';

@Component({
  selector: 'app-mainpage-videos',
  templateUrl: './mainpage-videos.component.html',
  styleUrls: ['./mainpage-videos.component.scss'],
})
export class MainPageVideosComponent
  extends ComponentWithSubscription
  implements OnInit
{
  featuredVideos$: Observable<Video[]>;
  me: User;

  constructor(
    private userQuery: UserQuery,
    private userService: UserService,
    private videoQuery: VideoQuery,
    private videoService: VideoService,
    private playlistService: PlaylistService,
    private titleService: Title
  ) {
    super();
  }

  ngOnInit(): void {
    this.titleService.setTitle('Bitube');

    this.autoUnsubscribe(this.userQuery.selectMyAccount()).subscribe((me) => {
      this.me = me;
    });

    this.observeVideoCollection();
  }

  observeVideoCollection(): void {
    this.autoUnsubscribe(this.videoService.syncCollection()).subscribe();
    this.featuredVideos$ = this.videoQuery.selectAll();
  }

  async createDefaultPlaylist(): Promise<void> {
    if (!this.me || this.me.defaultPlaylist) {
      return;
    }

    const defaultPlaylist = await this.playlistService.addPlaylist(
      createPlaylist({
        ownerRef: this.me.id,
        name: 'Watch later',
      })
    );

    await this.userService.updateUser(this.me.id, {
      defaultPlaylist: defaultPlaylist,
    });
  }
}
