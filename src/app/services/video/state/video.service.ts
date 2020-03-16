import { Injectable } from '@angular/core';
import { VideoStore, VideoState } from './video.store';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'videos' })
export class VideoService extends CollectionService<VideoState> {

  constructor(store: VideoStore) {
    super(store);
  }

}
