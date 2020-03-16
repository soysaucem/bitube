import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { List } from 'immutable';
import { Video, toJS, VideoJSON, fromJS } from './video/state/video.model';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private firestore: AngularFirestore) {}

  async add(video: Video) {
    const videoJS = toJS(video);
    return await this.firestore.collection('videos').add(videoJS);
  }

  async update(id: string, props: Partial<VideoJSON>) {
    const docs = await this.firestore.firestore
      .collection('videos')
      .where('id', '==', id)
      .get();
    return await this.firestore
      .collection('videos')
      .doc(docs.docs[0].id)
      .update(props);
  }

  selectAll() {
    return this.firestore
      .collection<VideoJSON>('videos')
      .valueChanges()
      .pipe(map(videos => List(videos.map(video => fromJS(video)))));
  }

  async getVideo(id: string): Promise<Video> {
    const docs = await this.firestore
      .collection<VideoJSON>('videos')
      .ref.where('id', '==', id)
      .get();
    const video = docs.docs[0].data();
    return fromJS(video as any);
  }
}
