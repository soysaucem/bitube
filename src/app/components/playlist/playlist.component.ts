import { VideoService } from './../../state/video/video.service';
import { PlaylistService } from '../../state/playlist/playlist.service';
import { ComponentWithSubscription } from './../../abstract-components/component-with-subscription';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs/operators';
import { VideoQuery } from '../../state/video/video.query';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Playlist, Video } from '../../models';
import { PlaylistQuery } from '../../state/playlist/playlist.query';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent
  extends ComponentWithSubscription
  implements OnInit {
  playlistVideos: Video[];
  playlist: Playlist;

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService,
    private playlistQuery: PlaylistQuery,
    private videoQuery: VideoQuery,
    private videoService: VideoService
  ) {
    super();
  }

  ngOnInit(): void {
    this.autoUnsubscribe(
      this.route.params.pipe(
        switchMap(({ id }) => this.playlistService.syncPlaylist(id))
      )
    ).subscribe();

    this.autoUnsubscribe(
      this.route.params.pipe(
        switchMap(({ id }) => this.playlistQuery.selectEntity(id)),
        tap((playlist) => (this.playlist = playlist)),
        filter((playlist) => playlist !== undefined),
        switchMap((playlist) =>
          this.videoService.syncVideosForPlaylist(playlist.videoRefs)
        )
      )
    ).subscribe();

    this.autoUnsubscribe(this.videoQuery.selectAll()).subscribe((videos) => {
      this.playlistVideos = videos;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.playlistVideos,
      event.previousIndex,
      event.currentIndex
    );
  }
}
