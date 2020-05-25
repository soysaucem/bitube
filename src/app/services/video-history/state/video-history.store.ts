import { Injectable } from '@angular/core';
import { VideoHistoryJSON } from './video-history.model';
import {
  EntityState,
  ActiveState,
  EntityStore,
  StoreConfig,
} from '@datorama/akita';

export interface VideoHistoryState
  extends EntityState<VideoHistoryJSON, string>,
    ActiveState<string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'videohistories' })
export class VideoHistoryStore extends EntityStore<VideoHistoryState> {
  constructor() {
    super();
  }
}
