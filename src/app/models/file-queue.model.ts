import { v4 as uuidv4 } from 'uuid';
import * as S3 from 'aws-sdk/clients/s3';

export enum FileQueueStatus {
  Pending = 'Pending',
  Error = 'Error',
  Progress = 'Progress',
  Cancel = 'Cancel',
}

export interface FileQueueObject {
  id: string;
  file: File;
  request: S3.ManagedUpload;
}

export const makeObjectWith = (props: Partial<FileQueueObject>) => {
  return {
    id: props.id ? props.id : uuidv4(),
    file: props.file,
    request: props.request,
  };
};
