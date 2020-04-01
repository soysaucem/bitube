import { Injectable } from '@angular/core';
import { CommentStore, CommentState } from './comment.store';
import {
  CollectionConfig,
  SubcollectionService,
  pathWithParams,
} from 'akita-ng-fire';
import { toJS, CommentJSON, Comment } from './comment.model';
import { VideoQuery } from '../../video/state/video.query';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserJSON } from '../../user/state/user.model';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'videos/:id/comments', idKey: 'id' })
export class CommentService extends SubcollectionService<CommentState> {
  constructor(
    store: CommentStore,
    private videoQuery: VideoQuery,
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth
  ) {
    super(store);
  }

  addComment(comment: Comment): Promise<any> {
    const commentJS = toJS({
      ...comment,
      ownerRef: this.firestore
        .collection('users')
        .doc<UserJSON>(this.fireAuth.auth.currentUser.uid).ref,
    });
    return this.add(commentJS);
  }

  updateComment(id: string, props: Partial<CommentJSON>): any {
    return this.update({ ...props, id: id });
  }

  get currentPath(): string {
    const id = this.videoQuery.getActiveId();
    return pathWithParams(this.constructor['path'], { id });
  }
}
