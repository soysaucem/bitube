import * as firebase from 'firebase';
import { List } from 'immutable';
import { Subject } from 'rxjs';
import { v4 } from 'uuid';
import { FileQueueObject, createFileQueueObject } from './file-queue.model';
import { Buffer } from 'buffer';

export type ImageType = 'profile' | 'thumbnail';

export class UploadController {
  private storage = firebase.storage().ref();
  private queueStream$ = new Subject<List<FileQueueObject>>();
  private queue = List<FileQueueObject>();

  constructor() {}

  private createUploadRequest(
    id: string,
    file: File,
    userId: string
  ): firebase.storage.UploadTask {
    const videoType = file.name.split('.')[file.name.split('.').length - 1];

    const metadata: firebase.storage.UploadMetadata = {
      contentType: 'application/octet-stream',
      contentDisposition: `inline; filename=${id}.${videoType};`,
    };

    return this.storage.child(`videos/${userId}/${id}`).put(file, metadata);
  }

  add(files: FileList, userId: string): void {
    // Add files to queue
    const arr = Array.from(files);

    arr.forEach((file) => {
      const id = v4();
      const object = createFileQueueObject({
        id,
        file,
        request: this.createUploadRequest(id, file, userId),
      });
      this.queue = this.queue.push(object);
    });

    // Emit queue
    this.queueStream$.next(this.queue);
  }

  remove(file: FileQueueObject): void {
    this.queue = this.queue.filter((object) => object.id !== file.id);
    this.queueStream$.next(this.queue);
  }

  selectQueue(): Subject<List<FileQueueObject>> {
    return this.queueStream$;
  }

  uploadImage(
    id: string,
    base64Data: string,
    type: ImageType,
    userId?: string
  ): Promise<firebase.storage.UploadTaskSnapshot> {
    const imgRef =
      type === 'profile'
        ? this.storage.child(`profiles/${id}/image`)
        : this.storage.child(`thumbnails/${userId}/${id}`);

    return new Promise((resolve, reject) => {
      const bufferData = new Buffer(
        base64Data.replace(/^data:image\/\w+;base64,/, ''),
        'base64'
      );

      const metadata: firebase.storage.UploadMetadata = {
        contentEncoding: 'base64',
        contentType: 'image/webp',
      };

      return imgRef.put(bufferData, metadata).then(
        (snapshot) => resolve(snapshot),
        (err) => reject(err)
      );
    });
  }
}
