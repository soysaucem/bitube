import { Injectable } from '@angular/core';
import { CommentStore, CommentState } from './comment.store';
import {
  CollectionConfig,
  SubcollectionService,
  pathWithParams,
} from 'akita-ng-fire';
import { toCommentJS, CommentJSON, Comment } from './comment.model';
import { VideoQuery } from '../../video/state/video.query';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'videos/:id/comments', idKey: 'id' })
export class CommentService extends SubcollectionService<CommentState> {
  constructor(
    store: CommentStore,
    private videoQuery: VideoQuery,
    private fireAuth: AngularFireAuth
  ) {
    super(store);
  }

  addComment(comment: Comment): Promise<any> {
    const commentJS = toCommentJS({
      ...comment,
      ownerRef: this.fireAuth.auth.currentUser.uid,
    });
    return this.add(commentJS);
  }

  updateComment(id: string, props: Partial<CommentJSON>): any {
    this.store.update(id, props);
    return this.update({ ...props, id: id });
  }

  get currentPath(): string {
    const id = this.videoQuery.getActiveId();
    return pathWithParams(this.constructor['path'], { id });
  }
}
