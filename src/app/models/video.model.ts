import { v4 } from 'uuid';
import * as moment from 'moment';

export interface Video {
  id: string;
  ownerRef: string;
  location: string;
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

export interface SearchVideo {
  id: string;
  ownerRef: string;
  location: string;
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

function createDefault(): Video {
  return Object.freeze({
    id: v4(),
    ownerRef: null,
    location: null,
    title: null,
    description: null,
    thumbnail: null,
    views: 0,
    keywords: [],
    tags: [],
    likes: [],
    dislikes: [],
    createdAt: moment().toISOString(),
  });
}

export function createVideo(props: Partial<Video>): Video {
  return Object.freeze({
    ...createDefault(),
    ...props,
  });
}
