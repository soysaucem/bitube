import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { VideoStore, VideoState } from './video.store';

@Injectable({ providedIn: 'root' })
export class VideoQuery extends QueryEntity<VideoState> {

  constructor(protected store: VideoStore) {
    super(store);
  }

}
