import * as moment from 'moment';
import { v4 } from 'uuid';

export interface VideoHistoryInput {
  ownerRef: string;
  videoRef: string;
}

export interface VideoHistory {
  id: string;
  ownerRef: string;
  videoRef: string;
  watchedAt: string;
}

function createDefault(): VideoHistory {
  return Object.freeze({
    id: v4(),
    ownerRef: null,
    videoRef: null,
    watchedAt: moment().toISOString(),
  });
}

export function createVideoHistory(props: Partial<VideoHistory>): VideoHistory {
  return Object.freeze({
    ...createDefault(),
    ...props,
  });
}
