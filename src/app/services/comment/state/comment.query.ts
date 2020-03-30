import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CommentStore, CommentState } from './comment.store';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap } from 'rxjs/operators';
import { List } from 'immutable';
import { Comment, CommentJSON, fromJS } from './comment.model';
import { VideoQuery } from '../../video/state/video.query';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommentQuery extends QueryEntity<CommentState> {
  constructor(
    protected store: CommentStore,
    private firestore: AngularFirestore,
    private videoQuery: VideoQuery
  ) {
    super(store);
  }

  selectComments(): Observable<List<Comment>> {
    return this.videoQuery.selectActiveId().pipe(
      map(id => `videos/${id}/comments`),
      switchMap(path => this.firestore.collection(path).valueChanges()),
      map(comments =>
        List(comments.map((comment: CommentJSON) => fromJS(comment)))
      )
    );
  }
}
