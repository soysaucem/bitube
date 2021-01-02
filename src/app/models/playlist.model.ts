import * as moment from 'moment';
import { v4 } from 'uuid';

export type PlaylistType = 'default' | 'custom';

export interface Playlist {
  id: string;
  ownerRef: string;
  name: string;
  type: PlaylistType;
  videoRefs: string[];
  createdAt: string;
}

export function createDefault(): Playlist {
  return Object.freeze({
    id: v4(),
    ownerRef: null,
    name: null,
    type: 'default',
    videoRefs: [],
    createdAt: moment().toISOString(),
  });
}

export function createPlaylist(props: Partial<Playlist>): Playlist {
  return Object.freeze({
    ...createDefault(),
    ...props,
  });
}
