import { v4 as uuidv4 } from 'uuid';
import {
  AngularFirestoreDocument,
  DocumentReference,
} from '@angular/fire/firestore';
import * as moment from 'moment';

export interface Comment {
  id: string;
  ownerRef: DocumentReference;
  content: string;
  createdAt: string;
}

export interface CommentJSON {
  id: string;
  ownerRef: DocumentReference;
  content: string;
  createdAt: string;
}

export function createDefault(): Comment {
  return Object.freeze({
    id: uuidv4(),
    ownerRef: null,
    content: null,
    createdAt: moment().toISOString(),
  });
}

export function makeComment(props: Partial<Comment>): Comment {
  return Object.freeze({
    ...createDefault(),
    ...props,
  });
}

export function fromJS(input: CommentJSON): Comment {
  return Object.freeze({
    ...input,
  });
}

export function toJS(input: Comment): CommentJSON {
  return Object.freeze({
    ...input,
  });
}
