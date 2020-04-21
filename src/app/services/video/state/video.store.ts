import { Injectable } from '@angular/core';
import { Video, VideoJSON } from './video.model';
import {
  EntityState,
  ActiveState,
  EntityStore,
  StoreConfig,
} from '@datorama/akita';
import { DocumentReference } from '@angular/fire/firestore';

export interface VideoState
  extends EntityState<VideoJSON, string>,
    ActiveState<string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'video' })
export class VideoStore extends EntityStore<VideoState> {
  constructor() {
    super();
  }

  akitaPreAddEntity(video: VideoJSON) {
    return {
      ...video,
      ownerRef:
        typeof video.ownerRef === 'string'
          ? video.ownerRef
          : (<DocumentReference>video.ownerRef).id,
    };
  }
}
