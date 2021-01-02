import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { CollectionState } from 'akita-ng-fire';
import { Video } from './../../models';

export interface VideoState extends CollectionState<Video> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'video', resettable: true })
export class VideoStore extends EntityStore<VideoState> {
  constructor() {
    super();
  }
}
