import { Injectable } from '@angular/core';
import { Comment } from './comment.model';
import { EntityState, ActiveState, EntityStore, StoreConfig } from '@datorama/akita';

export interface CommentState extends EntityState<Comment, string>, ActiveState<string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'comment' })
export class CommentStore extends EntityStore<CommentState> {

  constructor() {
    super();
  }

}

