import * as S3 from 'aws-sdk/clients/s3';
import { List } from 'immutable';
import { Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { awsS3Config } from '../../../environments/environment';
import { FileQueueObject, makeFileQueueObject } from './file-queue.model';
import { BUCKET_NAME, PROFILE_BUCKET_NAME } from '../../util/variables';
import { Buffer } from 'buffer';

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
    const params = {
      Bucket: BUCKET_NAME,
      Key: id,
      Body: file,
      ACL: 'private',
      ContentType: 'application/octet-stream',
    };

    return this.bucket.upload(params);
  }

  add(files: FileList): void {
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

  remove(file: FileQueueObject): void {
    this.queue = this.queue.filter(object => object.id !== file.id);
    this.queueStream$.next(this.queue);
  }

  selectQueue(): Subject<List<FileQueueObject>> {
    return this.queueStream$;
  }

  uploadProfile(id: string, base64Thumbnail: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const base64Data = new Buffer(
        base64Thumbnail.replace(/^data:image\/\w+;base64,/, ''),
        'base64'
      );

      const params = {
        Bucket: PROFILE_BUCKET_NAME,
        Key: id + '-thumbnail',
        Body: base64Data,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: 'image/webp',
      };

      this.bucket.upload(params).send((err, data) => {
        if (err) {
          reject(err);
        }

        resolve(data);
      });
    });
  }
}
