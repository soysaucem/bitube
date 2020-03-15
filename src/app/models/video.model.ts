import { List } from 'immutable';

export interface Video {
  id: string;
  ownerId: string;
  ownerName: string;
  title: string;
  description: string;
  thumbnail: string;
  views: number;
  tags: List<string>;
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
  });
}

export function toJS(input: Video): VideoJSON {
  return Object.freeze({
    ...input,
    tags: input.tags.toArray(),
  });
}
