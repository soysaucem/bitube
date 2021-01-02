import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { CollectionState } from 'akita-ng-fire';
import { Comment } from '../../models';

export interface CommentState extends CollectionState<Comment> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'comment' })
export class CommentStore extends EntityStore<CommentState> {
  constructor() {
    super();
  }
}
