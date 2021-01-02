import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { CollectionState } from 'akita-ng-fire';
import { VideoHistory } from '../../models';

export interface VideoHistoryState extends CollectionState<VideoHistory> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'videohistories' })
export class VideoHistoryStore extends EntityStore<VideoHistoryState> {
  constructor() {
    super();
  }
}
