import { Injectable } from '@angular/core';
import { Video, VideoJSON } from './video.model';
import {
  EntityState,
  ActiveState,
  EntityStore,
  StoreConfig,
} from '@datorama/akita';

export interface VideoState
  extends EntityState<Video | VideoJSON, string>,
    ActiveState<string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'video' })
export class VideoStore extends EntityStore<VideoState> {
  constructor() {
    super();
  }
}
