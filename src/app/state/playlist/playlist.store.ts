import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { CollectionState } from 'akita-ng-fire';
import { Playlist } from '../../models';

export interface PlaylistState extends CollectionState<Playlist> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'videohistories' })
export class PlaylistStore extends EntityStore<PlaylistState> {
  constructor() {
    super();
  }
}
