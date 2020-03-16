import { v4 as uuidv4 } from 'uuid';
import * as S3 from 'aws-sdk/clients/s3';

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
  request: S3.ManagedUpload;
}

export function createDefault(): FileQueueObject {
  return Object.freeze({
    id: uuidv4(),
    title: null,
    description: null,
    file: null,
    request: null,
  });
}

export function makeFileQueueObject(props: Partial<FileQueueObject>) {
  return Object.freeze({
    ...createDefault(),
    ...props,
  });
}
