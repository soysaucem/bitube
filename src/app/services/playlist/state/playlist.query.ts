import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { QueryEntity } from '@datorama/akita';
import { List } from 'immutable';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { fromPlaylistJS, Playlist, PlaylistJSON } from './playlist.model';
import { PlaylistState, PlaylistStore } from './playlist.store';

@Injectable({ providedIn: 'root' })
export class PlaylistQuery extends QueryEntity<PlaylistState> {
  constructor(
    protected store: PlaylistStore,
    private firestore: AngularFirestore
  ) {
    super(store);
  }

  selectPlaylistsForUser(id: string): Observable<List<Playlist>> {
    return this.firestore
      .collection<PlaylistJSON>('playlists', (ref) =>
        ref.where('ownerRef', '==', id)
      )
      .valueChanges()
      .pipe(
        tap((playlists) => this.store.set([...playlists])),
        map((playlists) =>
          List(
            playlists.map((playlist) =>
              fromPlaylistJS(playlist as PlaylistJSON)
            )
          )
        )
      );
  }

  getPlaylistsForUser(id: string): Promise<List<Playlist>> {
    return this.selectPlaylistsForUser(id).pipe(take(1)).toPromise();
  }

  async getDefaultPlaylistForUser(id: string): Promise<Playlist> {
    const playlists = (await this.getPlaylistsForUser(id)).filter(
      (playlist) => playlist.type === 'default'
    );

    return playlists.get(0);
  }

  async getPlaylist(id: string): Promise<Playlist> {
    if (!this.hasEntity(id)) {
      const doc = await this.firestore
        .collection('playlists')
        .doc(id)
        .ref.get();

      this.store.add(doc.data() as PlaylistJSON);
    }

    return fromPlaylistJS(this.getEntity(id) as PlaylistJSON);
  }

  async isAddedToWatchLater(id: string, userId: string): Promise<boolean> {
    const playlist = await this.getDefaultPlaylistForUser(userId);

    if (playlist.videoRefs.contains(id)) {
      return true;
    }

    return false;
  }
}
