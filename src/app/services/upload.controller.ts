import * as S3 from "aws-sdk/clients/s3";
import { List } from "immutable";
import { Subject } from "rxjs";
import { v4 as uuidv4 } from "uuid";
import { awsS3Config } from "../../environments/environment";
import {
  FileQueueObject,
  FileQueueStatus,
  makeObjectWith
} from "../models/file-queue.model";
import { makeVideo } from "../models/video.model";
import { UserService } from "./user.service";
import { VideoService } from "./video.service";

export class UploadController {
  private bucket = new S3({
    accessKeyId: awsS3Config.aws_access_key_id,
    secretAccessKey: awsS3Config.aws_secret_access_key,
    region: "ap-southeast-2"
  });

  private uploadingSubject$ = new Subject<FileQueueObject>();
  private monitorSubject$ = new Subject<List<FileQueueObject>>();
  private queue = List<FileQueueObject>();

  private monitorIndex = 0;

  private videoService: VideoService;
  private userService: UserService;

  constructor() {
    this.monitorAndPerformUpload();
  }

  register(service: VideoService, userSer: UserService) {
    this.videoService = service;
    this.userService = userSer;
  }

  private monitorAndPerformUpload() {
    this.uploadingSubject$.subscribe(async object => {
      const data = this.upload(object);
    });
  }

  private upload(object: FileQueueObject) {
    const contentType = object.file.type;

    const params = {
      Bucket: "bibo-app",
      Key: object.id,
      Body: object.file,
      ACL: "public-read",
      contentType
    };

    return this.bucket
      .upload(params)
      .on("httpUploadProgress", event => {
        this.updateQueueStatus(
          FileQueueStatus.Progress,
          (event.loaded / event.total) * 100
        );
      })
      .send(async (err, data) => {
        if (err) {
          console.log("There was an error uploading your file: ", err);
          return err;
        }

        this.updateQueueStatus(FileQueueStatus.Success, 100);

        // Add video reference to firebase
        const currentUser = await this.userService.getMyAccount();
        const video = makeVideo({
          id: object.id,
          title: object.file.name,
          user: currentUser.id
        });
        await this.videoService.add(video);

        // Move to next file and upload
        this.monitorIndex++;
        const nextFile = this.queue.get(this.monitorIndex);
        if (nextFile) {
          this.uploadingSubject$.next(nextFile);
        }

        return data;
      });
  }

  add(files: FileList) {
    // Add files to queue
    const arr = Array.from(files);
    arr.forEach(file => {
      const object = makeObjectWith({ file });
      this.queue = this.queue.push(object);
    });

    // Check if there is uploading job, if not start uploading
    const check = this.queue.find(
      file => file.status === FileQueueStatus.Progress
    );
    if (!check) {
      this.uploadingSubject$.next(this.queue.get(this.monitorIndex));
    }

    // Emit new queue to uploading component
    this.monitorSubject$.next(this.queue);
  }

  updateQueueStatus(status: FileQueueStatus, progress: number) {
    this.queue = this.queue.update(this.monitorIndex, file => {
      return {
        ...file,
        status: status,
        progress: progress
      };
    });

    this.monitorSubject$.next(this.queue);
  }

  selectAll() {
    return this.monitorSubject$;
  }
}
