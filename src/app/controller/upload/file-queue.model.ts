import { v4 } from 'uuid';
import * as firebase from 'firebase';

export enum FileQueueStatus {
  Pending = 'Pending',
  Error = 'Error',
  Progress = 'Progress',
  Cancel = 'Cancel',
  Success = 'Success',
}

export interface FileQueueObject {
  id: string;
  title: string;
  description: string;
  file: File;
  request: firebase.storage.UploadTask;
}

export function createDefault(): FileQueueObject {
  return Object.freeze({
    id: v4(),
    title: null,
    description: null,
    file: null,
    request: null,
  });
}

export function createFileQueueObject(props: Partial<FileQueueObject>) {
  return Object.freeze({
    ...createDefault(),
    ...props,
  });
}
