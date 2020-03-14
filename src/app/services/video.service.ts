import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Video, toJS, VideoJSON, fromJS } from '../models/video.model';
import { map } from 'rxjs/operators';
import { List } from 'immutable';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  constructor(private firestore: AngularFirestore) {}

  async add(video: Video) {
    console.log(video);
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
}
