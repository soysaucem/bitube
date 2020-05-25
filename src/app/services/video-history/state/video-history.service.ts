import { Injectable } from '@angular/core';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import {
  toVideoHistoryJS,
  VideoHistory,
  VideoHistoryJSON,
} from './video-history.model';
import { VideoHistoryState, VideoHistoryStore } from './video-history.store';
import { VideoHistoryQuery } from './video-history.query';
import * as moment from 'moment';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'videohistories', idKey: 'id' })
export class VideoHistoryService extends CollectionService<VideoHistoryState> {
  constructor(
    store: VideoHistoryStore,
    private videoHistoryQuery: VideoHistoryQuery
  ) {
    super(store);
  }

  async addVideoHistory(history: VideoHistory): Promise<any> {
    const historyJS = toVideoHistoryJS(history);
    const redundantHistories = await this.videoHistoryQuery.getVideoHistoriesForVideo(
      historyJS.videoRef
    );
    let isRedundant = false;
    let redundantHistory: VideoHistory;

    redundantHistories.forEach((history) => {
      if (
        moment(history.watchedAt).format('YYYY-MM-DD') ===
        moment(historyJS.watchedAt).format('YYYY-MM-DD')
      ) {
        isRedundant = true;
        redundantHistory = history;
      }
    });

    if (isRedundant) {
      return this.updateVideoHistory(redundantHistory.id, {
        watchedAt: historyJS.watchedAt,
      });
    }

    return this.add(historyJS);
  }

  updateVideoHistory(id: string, props: Partial<VideoHistoryJSON>): any {
    return this.update({ ...props, id: id });
  }

  removeVideoHistory(id: string): Promise<any> {
    return this.remove(id);
  }
}
