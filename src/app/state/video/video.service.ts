import { Injectable } from '@angular/core';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { CollectionConfig, CollectionService, resetStore } from 'akita-ng-fire';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Video } from '../../models';
import { generateKeywords } from '../../util/generate-keywords';
import { VideoHistoryService } from '../video-history/video-history.service';
import { VideoState, VideoStore } from './video.store';
@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'videos', idKey: 'id' })
export class VideoService extends CollectionService<VideoState> {
  private storage = firebase.storage().ref();

  constructor(
    protected store: VideoStore,
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

  async deleteVideo(video: Video): Promise<void> {
    const histories = await this.videoHistoryService
      .syncCollection((ref) => ref.where('videoRef', '==', video.id))
      .pipe(take(1))
      .toPromise();

    const deletePromises = histories.map((history) =>
      this.videoHistoryService.remove(history.payload.doc.id)
    );

    return new Promise((resolve, reject) => {
      const videoDesertRef = this.storage.child(video.id);
      const thumbDesertRef = this.storage.child(`${video.id}-image`);

      videoDesertRef
        .delete()
        .then(() =>
          thumbDesertRef
            .delete()
            .then(() =>
              Promise.all([deletePromises, this.remove(video.id)]).then(() =>
                resolve()
              )
            )
            .catch((err) => reject(err))
        )
        .catch((err) => reject(err));
    });
  }

  syncVideo(id: string) {
    return this.syncDoc({ id });
  }

  syncVideosForUserWithLimit(
    id: string,
    limit: number
  ): Observable<DocumentChangeAction<Video>[]> {
    return this.syncCollection((ref) =>
      ref.where('ownerRef', '==', id).limit(limit).orderBy('createdAt', 'desc')
    );
  }

  syncVideosForPlaylist(ids: Array<string>) {
    resetStore(this.store.storeName);

    return this.syncManyDocs(ids);
  }

  syncVideosForChanel(id: string) {
    resetStore(this.store.storeName);

    return this.syncCollection((ref) => ref.where('ownerRef', '==', id));
  }
}
