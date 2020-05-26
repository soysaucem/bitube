import * as moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { List } from 'immutable';

export interface Playlist {
  id: string;
  ownerRef: string;
  name: string;
  type: 'default' | 'custom';
  videoRefs: List<string>;
  createdAt: string;
}

export interface PlaylistJSON {
  id: string;
  ownerRef: string;
  name: string;
  type: 'default' | 'custom';
  videoRefs: string[];
  createdAt: string;
}

export function createDefault(): Playlist {
  return Object.freeze({
    id: uuidv4(),
    ownerRef: null,
    name: null,
    type: 'default',
    videoRefs: List(),
    createdAt: moment().toISOString(),
  });
}

export function makePlaylist(props: Partial<Playlist>): Playlist {
  return Object.freeze({
    ...createDefault(),
    ...props,
  });
}

export function fromPlaylistJS(input: PlaylistJSON): Playlist {
  return Object.freeze({
    ...input,
    videoRefs: List(input.videoRefs),
  });
}

export function toPlaylistJS(input: Playlist): PlaylistJSON {
  return Object.freeze({
    ...input,
    videoRefs: input.videoRefs.toArray(),
  });
}
