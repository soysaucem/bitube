import { Injectable } from '@angular/core';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import * as moment from 'moment';
import {
  toVideoHistoryJS,
  VideoHistory,
  VideoHistoryJSON,
} from './video-history.model';
import { VideoHistoryQuery } from './video-history.query';
import { VideoHistoryState, VideoHistoryStore } from './video-history.store';

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
    this.store.update(id, props);
    return this.update({ ...props, id: id });
  }

  removeVideoHistory(id: string): Promise<any> {
    this.store.remove(id);
    return this.remove(id);
  }
}
