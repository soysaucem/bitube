import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { QueryEntity } from '@datorama/akita';
import { List } from 'immutable';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import {
  fromVideoHistoryJS,
  VideoHistory,
  VideoHistoryJSON,
} from './video-history.model';
import { VideoHistoryState, VideoHistoryStore } from './video-history.store';

@Injectable({ providedIn: 'root' })
export class VideoHistoryQuery extends QueryEntity<VideoHistoryState> {
  constructor(
    protected store: VideoHistoryStore,
    private firestore: AngularFirestore
  ) {
    super(store);
  }

  selectVideoHistoriesForUser(id: string): Observable<List<VideoHistory>> {
    return this.firestore
      .collection<VideoHistoryJSON>('videohistories', (ref) =>
        ref.where('ownerRef', '==', id)
      )
      .valueChanges()
      .pipe(
        tap((histories) => this.store.set([...histories])),
        map((histories) =>
          List(
            histories.map((history) =>
              fromVideoHistoryJS(history as VideoHistoryJSON)
            )
          )
        )
      );
  }

  async getVideoHistoriesForUser(id: string): Promise<List<VideoHistory>> {
    const histories = await this.selectVideoHistoriesForUser(id)
      .pipe(take(1))
      .toPromise();
    return histories.map((history) =>
      fromVideoHistoryJS(history as VideoHistoryJSON)
    );
  }

  async getVideoHistoriesForVideo(
    videoId: string
  ): Promise<List<VideoHistory>> {
    const docs = await this.firestore
      .collection('videohistories')
      .ref.where('videoRef', '==', videoId)
      .get();

    return List(
      docs.docs.map((doc) => fromVideoHistoryJS(doc.data() as VideoHistoryJSON))
    );
  }
}
