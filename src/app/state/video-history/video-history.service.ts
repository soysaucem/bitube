import { Injectable } from '@angular/core';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import * as moment from 'moment';
import { take } from 'rxjs/operators';
import {
  createVideoHistory,
  VideoHistory,
  VideoHistoryInput,
} from '../../models';
import { VideoHistoryState, VideoHistoryStore } from './video-history.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'videohistories', idKey: 'id' })
export class VideoHistoryService extends CollectionService<VideoHistoryState> {
  constructor(protected store: VideoHistoryStore) {
    super(store);
  }

  async addVideoHistory(input: VideoHistoryInput): Promise<string | void> {
    const existed = (
      await this.syncCollection((ref) =>
        ref
          .where('ownerRef', '==', input.ownerRef)
          .where('videoRef', '==', input.videoRef)
      )
        .pipe(take(1))
        .toPromise()
    )[0]?.payload?.doc?.data();

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
