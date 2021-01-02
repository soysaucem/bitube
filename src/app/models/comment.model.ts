import { v4 } from 'uuid';
import * as moment from 'moment';

export interface Comment {
  id: string;
  ownerRef: string;
  content: string;
  ip: string;
  createdAt: string;
}

function createDefault(): Comment {
  return Object.freeze({
    id: v4(),
    ownerRef: null,
    content: null,
    ip: null,
    createdAt: moment().toISOString(),
  });
}

export function createComment(props: Partial<Comment>): Comment {
  return Object.freeze({
    ...createDefault(),
    ...props,
  });
}
