import { Injectable } from '@angular/core';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { toVideoJS, Video, VideoJSON } from './video.model';
import { VideoState, VideoStore } from './video.store';
import { generateKeywords } from '../../../util/generate-keywords';
import { List } from 'immutable';
import { S3BucketSingleton } from '../../../abstract-components/s3-bucket-singleton';
import { BUCKET_NAME } from '../../../util/variables';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'videos', idKey: 'id' })
export class VideoService extends CollectionService<VideoState> {
  private bucket = S3BucketSingleton.instance.bucket;

  constructor(store: VideoStore) {
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
    return this.update({ ...props, id: id });
  }

  deleteVideo(id: string): Promise<any> {
    const params = { Bucket: BUCKET_NAME, Key: id };

    this.remove(id);

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
