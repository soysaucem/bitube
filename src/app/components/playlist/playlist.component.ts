import { PlaylistService } from '../../state/playlist/playlist.service';
import { ComponentWithSubscription } from './../../abstract-components/component-with-subscription';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { VideoQuery } from '../../state/video/video.query';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Playlist, Video } from '../../models';

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
    private videoQuery: VideoQuery
  ) {
    super();
  }

  ngOnInit(): void {
    this.autoUnsubscribe(
      this.route.params.pipe(
        switchMap(({ id }) => this.playlistService.selectPlaylist(id))
      )
    ).subscribe(async (playlist) => {
      try {
        this.playlist = playlist;
        this.playlistVideos = await this.videoQuery.getVideosForPlaylist(
          playlist.videoRefs
        );
      } catch (err) {
        console.error('Failed to get videos for playlist!');
        console.error(err);
      }
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
