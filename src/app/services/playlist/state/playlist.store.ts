import { Injectable } from '@angular/core';
import { PlaylistJSON } from './playlist.model';
import {
  EntityState,
  ActiveState,
  EntityStore,
  StoreConfig,
} from '@datorama/akita';

export interface PlaylistState
  extends EntityState<PlaylistJSON, string>,
    ActiveState<string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'videohistories' })
export class PlaylistStore extends EntityStore<PlaylistState> {
  constructor() {
    super();
  }
}
