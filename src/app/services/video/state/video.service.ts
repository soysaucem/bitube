import { Injectable } from '@angular/core';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { List } from 'immutable';
import { S3BucketSingleton } from '../../../abstract-components/s3-bucket-singleton';
import { generateKeywords } from '../../../util/generate-keywords';
import { BUCKET_NAME } from '../../../util/variables';
import { VideoHistoryQuery } from './../../video-history/state/video-history.query';
import { VideoHistoryService } from './../../video-history/state/video-history.service';
import { toVideoJS, Video, VideoJSON } from './video.model';
import { VideoState, VideoStore } from './video.store';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'videos', idKey: 'id' })
export class VideoService extends CollectionService<VideoState> {
  private bucket = S3BucketSingleton.instance.bucket;

  constructor(
    store: VideoStore,
    private videoHistoryQuery: VideoHistoryQuery,
    private videoHistoryService: VideoHistoryService
  ) {
    super(store);
  }

  addVideo(video: Video): Promise<any> {
    const videoJS = toVideoJS({
      ...video,
      keywords: List(generateKeywords(video.title)),
    });
    return this.add(videoJS);
  }

  updateVideo(id: string, props: Partial<VideoJSON>): any {
    this.store.update(id, props);
    return this.update({ ...props, id: id });
  }

  async deleteVideo(id: string): Promise<any> {
    const params = { Bucket: BUCKET_NAME, Key: id };
    const histories = await this.videoHistoryQuery.getVideoHistoriesForVideo(
      id
    );
    const deletePromises = histories.map((history) =>
      this.videoHistoryService.remove(history.id)
    );

    this.store.remove(id);
    await Promise.all([deletePromises, this.remove(id)]);

    return new Promise((resolve, reject) => {
      this.bucket.deleteObject(params, (err, data) => {
        if (err) {
          reject(err);
        }

        resolve(data);
      });
    });
  }
}
