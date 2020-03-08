import { List } from "immutable";

export interface Video {
  id: string;
  user: string;
  title: string;
  description: string;
  views: number;
  tags: List<string>;
}

export interface VideoJSON {
  id: string;
  user: string;
  title: string;
  description: string;
  views: number;
  tags: string[];
}

export function createDefault(): Video {
  return Object.freeze({
    id: null,
    user: null,
    title: null,
    description: null,
    views: 0,
    tags: List()
  });
}

export function makeVideo(props: Partial<Video>): Video {
  return Object.freeze({
    ...createDefault(),
    ...props
  });
}

export function fromJS(input: VideoJSON): Video {
  return Object.freeze({
    ...input,
    tags: List(input.tags)
  });
}

export function toJS(input: Video): VideoJSON {
  return Object.freeze({
    ...input,
    tags: input.tags.toArray()
  });
}
