import { Injectable } from '@angular/core';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { Video } from '../../models';
import { generateKeywords } from '../../util/generate-keywords';
import { VideoHistoryQuery } from '../video-history/video-history.query';
import { VideoHistoryService } from '../video-history/video-history.service';
import { VideoState, VideoStore } from './video.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'videos', idKey: 'id' })
export class VideoService extends CollectionService<VideoState> {
  constructor(
    protected store: VideoStore,
    private videoHistoryQuery: VideoHistoryQuery,
    private videoHistoryService: VideoHistoryService
  ) {
    super(store);
  }

  addVideo(video: Video): Promise<string> {
    return this.add({ ...video, keywords: generateKeywords(video.title) });
  }

  updateVideo(id: string, props: Partial<Video>): Promise<void> {
    return this.update(id, { ...props });
  }

  async deleteVideo(id: string): Promise<any> {
    // const video = this.videoQuery.getEntity(id);
    // const histories = this.videoHistoryQuery.getValue().entities.toArray()
    // await Promise.all([deletePromises, this.remove(id)]);
    // return new Promise((resolve, reject) => {
    //   this.bucket.deleteObject(params, (err, data) => {
    //     if (err) {
    //       reject(err);
    //     }
    //     resolve(data);
    //   });
    // });
  }
}
