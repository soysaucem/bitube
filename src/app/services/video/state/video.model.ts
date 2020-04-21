import { List } from 'immutable';
import * as moment from 'moment';

export interface Video {
  id: string;
  ownerRef: string;
  title: string;
  description: string;
  thumbnail: string;
  views: number;
  keywords: List<string>;
  tags: List<string>;
  likes: List<string>;
  dislikes: List<string>;
  createdAt: string;
}

export interface VideoJSON {
  id: string;
  ownerRef: string;
  title: string;
  description: string;
  thumbnail: string;
  views: number;
  keywords: string[];
  tags: string[];
  likes: string[];
  dislikes: string[];
  createdAt: string;
}

export interface SearchVideoJSON {
  id: string;
  ownerRef: string;
  title: string;
  description: string;
  thumbnail: string;
  views: number;
  keywords: string[];
  tags: string[];
  likes: string[];
  dislikes: string[];
  createdAt: string;
  objectID: string;
}

export function createDefault(): Video {
  return Object.freeze({
    id: null,
    ownerRef: null,
    title: null,
    description: null,
    thumbnail: null,
    views: 0,
    keywords: List(),
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

export function fromVideoJS(
  input: VideoJSON | Omit<SearchVideoJSON, 'objectID'>
): Video {
  return Object.freeze({
    ...input,
    keywords: List(input.keywords),
    tags: List(input.tags),
    likes: List(input.likes),
    dislikes: List(input.dislikes),
  });
}

export function toVideoJS(input: Video): VideoJSON {
  return Object.freeze({
    ...input,
    keywords: input.keywords.toArray(),
    tags: input.tags.toArray(),
    likes: input.likes.toArray(),
    dislikes: input.dislikes.toArray(),
  });
}
