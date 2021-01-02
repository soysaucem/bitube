import { VideoHistoryService } from './video-history.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { VideoHistory } from '../../models';
import { VideoHistoryState, VideoHistoryStore } from './video-history.store';

@Injectable({ providedIn: 'root' })
export class VideoHistoryQuery extends QueryEntity<VideoHistoryState> {
  constructor(protected store: VideoHistoryStore) {
    super(store);
  }

  async getVideoHistoriesForVideo(videoId: string): Promise<VideoHistory[]> {
    // const docs = await this.firestore
    //   .collection('videohistories')
    //   .ref.where('videoRef', '==', videoId)
    //   .get();
    // return docs.docs.map((doc) => doc.data() as VideoHistory);
    return [];
  }
}
