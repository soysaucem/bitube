import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';

export interface Comment {
  id: string;
  ownerRef: string;
  content: string;
  createdAt: string;
}

export interface CommentJSON {
  id: string;
  ownerRef: string;
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

export function fromCommentJS(input: CommentJSON): Comment {
  return Object.freeze({
    ...input,
  });
}

export function toCommentJS(input: Comment): CommentJSON {
  return Object.freeze({
    ...input,
  });
}
