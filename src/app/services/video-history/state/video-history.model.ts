import * as moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

export interface VideoHistory {
  id: string;
  ownerRef: string;
  videoRef: string;
  watchedAt: string;
}

export interface VideoHistoryJSON {
  id: string;
  ownerRef: string;
  videoRef: string;
  watchedAt: string;
}

export function createDefault(): VideoHistory {
  return Object.freeze({
    id: uuidv4(),
    ownerRef: null,
    videoRef: null,
    watchedAt: moment().toISOString(),
  });
}

export function makeVideoHistory(props: Partial<VideoHistory>): VideoHistory {
  return Object.freeze({
    ...createDefault(),
    ...props,
  });
}

export function fromVideoHistoryJS(input: VideoHistoryJSON): VideoHistory {
  return Object.freeze({
    ...input,
  });
}

export function toVideoHistoryJS(input: VideoHistory): VideoHistoryJSON {
  return Object.freeze({
    ...input,
  });
}
