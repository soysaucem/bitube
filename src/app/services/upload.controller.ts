import * as S3 from 'aws-sdk/clients/s3';
import { List } from 'immutable';
import { Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { awsS3Config } from '../../environments/environment';
import {
  FileQueueObject,
  makeFileQueueObject,
} from '../models/file-queue.model';

export class UploadController {
  private bucket = new S3({
    accessKeyId: awsS3Config.aws_access_key_id,
    secretAccessKey: awsS3Config.aws_secret_access_key,
    region: 'ap-southeast-2',
  });

  private queueStream$ = new Subject<List<FileQueueObject>>();
  private queue = List<FileQueueObject>();

  constructor() {}

  private makeUploadRequest(id: string, file: File): S3.ManagedUpload {
    const contentType = file.type;

    const params = {
      Bucket: 'bibo-app',
      Key: id,
      Body: file,
      ACL: 'public-read',
      contentType,
    };

    return this.bucket.upload(params);
  }

  add(files: FileList) {
    // Add files to queue
    const arr = Array.from(files);
    arr.forEach(file => {
      const id = uuidv4();
      const object = makeFileQueueObject({
        id,
        file,
        request: this.makeUploadRequest(id, file),
      });
      this.queue = this.queue.push(object);
    });

    // Emit queue
    this.queueStream$.next(this.queue);
  }

  remove(file: FileQueueObject) {
    this.queue = this.queue.filter(object => object.id !== file.id);
    this.queueStream$.next(this.queue);
  }

  selectQueue() {
    return this.queueStream$;
  }
}
