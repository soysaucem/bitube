import { Injectable } from '@angular/core';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { toJS, Video, VideoJSON } from './video.model';
import { VideoState, VideoStore } from './video.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'videos', idKey: 'id' })
export class VideoService extends CollectionService<VideoState> {
  constructor(store: VideoStore) {
    super(store);
  }

  addVideo(video: Video): Promise<any> {
    const videoJS = toJS(video);
    return this.add(videoJS);
  }

  updateVideo(id: string, props: Partial<VideoJSON>): any {
    return this.update({ ...props, id: id });
  }
}
