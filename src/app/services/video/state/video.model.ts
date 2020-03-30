import { List } from 'immutable';
import * as moment from 'moment';

export interface Video {
  id: string;
  ownerId: string;
  ownerName: string;
  title: string;
  description: string;
  thumbnail: string;
  views: number;
  tags: List<string>;
  likes: List<string>;
  dislikes: List<string>;
  createdAt: string;
}

export interface VideoJSON {
  id: string;
  ownerId: string;
  ownerName: string;
  title: string;
  description: string;
  thumbnail: string;
  views: number;
  tags: string[];
  likes: string[];
  dislikes: string[];
  createdAt: string;
}

export function createDefault(): Video {
  return Object.freeze({
    id: null,
    ownerId: null,
    ownerName: null,
    title: null,
    description: null,
    thumbnail: null,
    views: 0,
    tags: List(),
    likes: List(),
    dislikes: List(),
    createdAt: moment().toISOString(),
  });
}

export function makeVideo(props: Partial<Video>): Video {
  return Object.freeze({
    ...createDefault(),
    ...props,
  });
}

export function fromJS(input: VideoJSON): Video {
  return Object.freeze({
    ...input,
    tags: List(input.tags),
    likes: List(input.likes),
    dislikes: List(input.dislikes),
  });
}

export function toJS(input: Video): VideoJSON {
  return Object.freeze({
    ...input,
    tags: input.tags.toArray(),
    likes: input.likes.toArray(),
    dislikes: input.dislikes.toArray(),
  });
}
