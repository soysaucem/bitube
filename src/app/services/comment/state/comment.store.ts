import { Injectable } from '@angular/core';
import {
  ActiveState,
  EntityState,
  EntityStore,
  StoreConfig,
} from '@datorama/akita';
import { CommentJSON } from './comment.model';

export interface CommentState
  extends EntityState<CommentJSON, string>,
    ActiveState<string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'comment' })
export class CommentStore extends EntityStore<CommentState> {
  constructor() {
    super();
  }
}
