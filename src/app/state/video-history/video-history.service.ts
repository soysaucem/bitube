import { Injectable } from '@angular/core';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import * as moment from 'moment';
import {
  createVideoHistory,
  VideoHistory,
  VideoHistoryInput,
} from '../../models';
import { VideoHistoryQuery } from './video-history.query';
import { VideoHistoryState, VideoHistoryStore } from './video-history.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'videohistories', idKey: 'id' })
export class VideoHistoryService extends CollectionService<VideoHistoryState> {
  constructor(
    protected store: VideoHistoryStore,
    private videoHistoryQuery: VideoHistoryQuery
  ) {
    super(store);
  }

  async addVideoHistory(input: VideoHistoryInput): Promise<string | void> {
    const existed = this.videoHistoryQuery
      .getAll()
      .filter(
        (video) =>
          video.ownerRef === input.ownerRef && video.videoRef === input.videoRef
      )[0];

    if (existed) {
      return this.updateVideoHistory(existed.id, {
        watchedAt: moment().toISOString(),
      });
    }

    const history = createVideoHistory({ ...input });

    return this.add(history);
  }

  updateVideoHistory(id: string, props: Partial<VideoHistory>): Promise<void> {
    return this.update(id, { ...props });
  }

  removeVideoHistory(id: string): Promise<any> {
    return this.remove(id);
  }
}
