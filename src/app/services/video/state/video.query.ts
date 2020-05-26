import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { QueryEntity } from '@datorama/akita';
import { List } from 'immutable';
import { Observable } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { UserQuery } from '../../user/state/user.query';
import { fromVideoJS, Video, VideoJSON } from './video.model';
import { VideoState, VideoStore } from './video.store';
import { VideoService } from './video.service';

@Injectable({ providedIn: 'root' })
export class VideoQuery extends QueryEntity<VideoState> {
  constructor(
    protected store: VideoStore,
    private firestore: AngularFirestore,
    private userQuery: UserQuery,
    private videoService: VideoService
  ) {
    super(store);
  }

  selectVideos(): Observable<List<Video>> {
    return this.firestore
      .collection<VideoJSON>('videos')
      .valueChanges()
      .pipe(
        tap((videos) => this.store.set([...videos])),
        map((videos) =>
          List(videos.map((video: VideoJSON) => fromVideoJS(video)))
        )
      );
  }

  selectVideo(id: string): Observable<Video> {
    return this.videoService
      .syncDoc({ id })
      .pipe(map((videoJSON) => fromVideoJS(videoJSON)));
  }

  selectMyVideos(): Observable<List<Video>> {
    return this.userQuery
      .selectMyFirebaseAccount()
      .pipe(
        switchMap((firebaseUser) => this.selectVideosForUser(firebaseUser.uid))
      );
  }

  selectVideosForUser(id: string): Observable<List<Video>> {
    return this.firestore
      .collection<VideoJSON>('videos', (ref) => ref.where('ownerRef', '==', id))
      .valueChanges()
      .pipe(
        tap((videos) => this.store.set([...videos])),
        map((videos) =>
          List(videos.map((video) => fromVideoJS(video as VideoJSON)))
        )
      );
  }

  async getVideosForPlaylist(ids: List<string>): Promise<List<Video>> {
    if (!ids || ids.size === 0) {
      return List();
    }

    const videoPromises = ids.map((id) => this.getVideo(id));
    const videos = await Promise.all(videoPromises);

    return List(videos);
  }

  async getVideosWith(title: string): Promise<List<Video>> {
    const docs = await this.firestore
      .collection('videos')
      .ref.where('keywords', 'array-contains', title.toLowerCase())
      .get();

    return List(docs.docs.map((doc) => fromVideoJS(doc.data() as VideoJSON)));
  }

  async getVideo(id: string): Promise<Video> {
    if (!this.hasEntity(id)) {
      const doc = await this.firestore.collection('videos').doc(id).ref.get();

      this.store.add(doc.data() as VideoJSON);
    }

    return fromVideoJS(this.getEntity(id) as VideoJSON);
  }
}
