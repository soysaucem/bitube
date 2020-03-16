import { Injectable } from '@angular/core';
import { CommentStore, CommentState } from './comment.store';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'comments' })
export class CommentService extends CollectionService<CommentState> {

  constructor(store: CommentStore) {
    super(store);
  }

}
