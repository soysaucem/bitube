import { Injectable } from '@angular/core';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { Observable } from 'rxjs';
import { Playlist } from '../../models';
import { PlaylistQuery } from './playlist.query';
import { PlaylistState, PlaylistStore } from './playlist.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'playlists', idKey: 'id' })
export class PlaylistService extends CollectionService<PlaylistState> {
  constructor(store: PlaylistStore, private playlistQuery: PlaylistQuery) {
    super(store);
  }

  addPlaylist(playlist: Playlist): Promise<string> {
    return this.add(playlist);
  }

  updatePlaylist(id: string, props: Partial<Playlist>): Promise<void> {
    return this.update(id, { ...props });
  }

  removePlaylist(id: string): Promise<void> {
    return this.remove(id);
  }

  async addVideoToWatchLater(id: string, userId: string) {
    const defaultPlaylist = await this.playlistQuery.getDefaultPlaylistForUser(
      userId
    );

    return this.updatePlaylist(defaultPlaylist.id, {
      videoRefs: [...defaultPlaylist.videoRefs, id],
    });
  }

  async removeVideoFromWatchLater(id: string, userId: string) {
    const defaultPlaylist = await this.playlistQuery.getDefaultPlaylistForUser(
      userId
    );

    return this.updatePlaylist(defaultPlaylist.id, {
      videoRefs: defaultPlaylist.videoRefs.filter((videoId) => videoId !== id),
    });
  }

  async removeVideoFromPlaylist(id: string, playlistId: string): Promise<any> {
    const playlist = await this.playlistQuery.getPlaylist(playlistId);

    return this.updatePlaylist(playlist.id, {
      videoRefs: playlist.videoRefs.filter((videoId) => videoId !== id),
    });
  }

  syncPlaylist(id: string): Observable<Playlist> {
    return this.syncDoc({ id });
  }
}
