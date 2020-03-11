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
    const videoJS = toJS(video);
    return await this.firestore.collection('videos').add(videoJS);
  }

  selectAll() {
    return this.firestore
      .collection<VideoJSON>('videos')
      .valueChanges()
      .pipe(map(videos => List(videos.map(video => fromJS(video)))));
  }
}
