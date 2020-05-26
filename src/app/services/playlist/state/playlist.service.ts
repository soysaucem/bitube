import { Injectable } from '@angular/core';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import {
  toPlaylistJS,
  Playlist,
  PlaylistJSON,
  fromPlaylistJS,
} from './playlist.model';
import { PlaylistState, PlaylistStore } from './playlist.store';
import { PlaylistQuery } from './playlist.query';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'playlists', idKey: 'id' })
export class PlaylistService extends CollectionService<PlaylistState> {
  constructor(store: PlaylistStore, private playlistQuery: PlaylistQuery) {
    super(store);
  }

  addPlaylist(playlist: Playlist): Promise<any> {
    const playlistJS = toPlaylistJS(playlist);
    return this.add(playlistJS);
  }

  updatePlaylist(id: string, props: Partial<PlaylistJSON>): any {
    this.store.update(id, props);
    return this.update({ ...props, id: id });
  }

  removePlaylist(id: string): Promise<any> {
    this.store.remove(id);
    return this.remove(id);
  }

  async addVideoToWatchLater(id: string, userId: string) {
    const defaultPlaylist = await this.playlistQuery.getDefaultPlaylistForUser(
      userId
    );

    return this.updatePlaylist(defaultPlaylist.id, {
      videoRefs: defaultPlaylist.videoRefs.push(id).toArray(),
    });
  }

  async removeVideoFromWatchLater(id: string, userId: string) {
    const defaultPlaylist = await this.playlistQuery.getDefaultPlaylistForUser(
      userId
    );

    return this.updatePlaylist(defaultPlaylist.id, {
      videoRefs: defaultPlaylist.videoRefs
        .filter((videoId) => videoId !== id)
        .toArray(),
    });
  }

  async removeVideoFromPlaylist(id: string, playlistId: string): Promise<any> {
    const playlist = await this.playlistQuery.getPlaylist(playlistId);

    return this.updatePlaylist(playlist.id, {
      videoRefs: playlist.videoRefs
        .filter((videoId) => videoId !== id)
        .toArray(),
    });
  }

  selectPlaylist(id: string): Observable<Playlist> {
    return this.syncDoc({ id }).pipe(
      map((playlistJSON) => fromPlaylistJS(playlistJSON))
    );
  }
}
