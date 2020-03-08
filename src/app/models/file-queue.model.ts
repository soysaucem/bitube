import { v4 as uuidv4 } from "uuid";

export enum FileQueueStatus {
  Pending = "Pending",
  Success = "Success",
  Error = "Error",
  Progress = "Progress"
}

export interface FileQueueObject {
  id: string;
  file: File;
  status: FileQueueStatus;
  progress: number;
}

export const makeObjectWith = (props: Partial<FileQueueObject>) => {
  return {
    id: uuidv4(),
    file: props.file,
    status: FileQueueStatus.Pending,
    progress: 0
  };
};
