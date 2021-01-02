import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Video } from '../../models';
import { VideoState, VideoStore } from './video.store';

@Injectable({ providedIn: 'root' })
export class VideoQuery extends QueryEntity<VideoState> {
  constructor(
    protected store: VideoStore,
    private firestore: AngularFirestore
  ) {
    super(store);
  }

  selectVideosForUser(id: string): Observable<Video[]> {
    return this.firestore
      .collection<Video>('videos', (ref) => ref.where('ownerRef', '==', id))
      .valueChanges()
      .pipe(tap((videos) => this.store.set([...videos])));
  }

  selectVideosForUserWithLimit(id: string, limit: number): Observable<Video[]> {
    return this.firestore
      .collection<Video>('videos', (ref) =>
        ref
          .where('ownerRef', '==', id)
          .limit(limit)
          .orderBy('createdAt', 'desc')
      )
      .valueChanges()
      .pipe(tap((videos) => this.store.set([...videos])));
  }

  async getVideosForPlaylist(ids: Array<string>): Promise<Video[]> {
    if (!ids || ids.length === 0) {
      return [];
    }

    const videoPromises = ids.map((id) => this.getVideo(id));
    const videos = await Promise.all(videoPromises);

    return videos;
  }

  async getVideosWith(title: string): Promise<Video[]> {
    const docs = await this.firestore
      .collection('videos')
      .ref.where('keywords', 'array-contains', title.toLowerCase())
      .get();

    return docs.docs.map((doc) => doc.data() as Video);
  }

  async getVideo(id: string): Promise<Video> {
    if (!this.hasEntity(id)) {
      const doc = await this.firestore.collection('videos').doc(id).ref.get();

      this.store.add(doc.data() as Video);
    }

    return this.getEntity(id);
  }
}
