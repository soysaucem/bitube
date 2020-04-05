import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { VideoStore, VideoState } from './video.store';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { List } from 'immutable';
import { fromJS, VideoJSON, Video } from './video.model';
import { Observable } from 'rxjs';
import { VideoService } from './video.service';

@Injectable({ providedIn: 'root' })
export class VideoQuery extends QueryEntity<VideoState> {
  constructor(
    protected store: VideoStore,
    private firestore: AngularFirestore
  ) {
    super(store);
  }

  selectVideos(): Observable<List<Video>> {
    return this.firestore
      .collection('videos')
      .valueChanges()
      .pipe(
        map(videos => List(videos.map((video: VideoJSON) => fromJS(video))))
      );
  }

  async getVideosWith(title: string): Promise<List<Video>> {
    const docs = await this.firestore
      .collection('videos')
      .ref.where('keywords', 'array-contains', title.toLowerCase())
      .get();

    return List(docs.docs.map(doc => fromJS(doc.data() as VideoJSON)));
  }

  async getVideo(id: string): Promise<Video> {
    if (!this.hasEntity(id)) {
      const doc = await this.firestore
        .collection('videos')
        .doc(id)
        .ref.get();

      this.store.add(fromJS(doc.data() as VideoJSON));
    }

    return this.getEntity(id) as Video;
  }
}
