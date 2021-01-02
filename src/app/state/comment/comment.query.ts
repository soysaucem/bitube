import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CommentState, CommentStore } from './comment.store';

@Injectable({ providedIn: 'root' })
export class CommentQuery extends QueryEntity<CommentState> {
  constructor(protected store: CommentStore) {
    super(store);
  }
}
