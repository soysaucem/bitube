import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import * as firebase from 'firebase';
import { FileQueueObject } from 'src/app/controller/upload/file-queue.model';
import { FileQueueStatus } from '../../../../controller/upload/file-queue.model';
import { UploadController } from '../../../../controller/upload/upload.controller';
import { createVideo, User } from '../../../../models';
import { UserQuery } from '../../../../state/user/user.query';
import { VideoService } from '../../../../state/video/video.service';
import { generateThumbnail } from '../../../../util/generate-thumbnail';
import { COMMA, ENTER } from '../../../../util/variables';
import { ComponentWithSubscription } from './../../../../abstract-components/component-with-subscription';

type InputType = 'description' | 'title';

@Component({
  selector: 'app-uploading-item',
  templateUrl: './uploading-item.component.html',
  styleUrls: ['./uploading-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UploadingItemComponent
  extends ComponentWithSubscription
  implements OnInit {
  @Input() file: FileQueueObject;
  @Input() controller: UploadController;
  me: User;
  progress: number;
  status: FileQueueStatus = FileQueueStatus.Pending;

  title: string;
  description: string;
  tags: Array<string> = [];

  // Configurations for mat chip
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private userQuery: UserQuery,
    private videoService: VideoService
  ) {
    super();
  }

  ngOnInit() {
    this.observeUser();
  }

  observeUser(): void {
    this.autoUnsubscribe(this.userQuery.selectMyAccount()).subscribe(
      (user) => (this.me = user)
    );
  }

  upload(): void {
    this.file.request.on(
      'state_changed',
      (snapshot) => {
        this.status = FileQueueStatus.Progress;
        this.progress = snapshot.bytesTransferred / snapshot.totalBytes;

        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      },
      (err) => {
        this.status = FileQueueStatus.Error;
        console.error('There was an error uploading your file: ', err);
        console.error(err);
      },
      async () => {
        await this.processSucceedUpload();
      }
    );
  }

  cancel(): void {
    if (this.status === FileQueueStatus.Progress) {
      this.file.request.cancel();
    }
    this.status = FileQueueStatus.Cancel;
    this.controller.remove(this.file);
  }

  get currentProgress(): number {
    return Math.floor(this.progress * 100);
  }

  get fileName(): string {
    return this.title ? this.title : this.file.file.name;
  }

  async handleInput(event: any, type: InputType): Promise<void> {
    if (type === 'title') {
      this.title = event;

      if (this.status === FileQueueStatus.Success) {
        await this.videoService.updateVideo(this.file.id, {
          title: this.title,
        });
      }
    } else if (type === 'description') {
      this.description = event.target.value;

      if (this.status === FileQueueStatus.Success) {
        await this.videoService.updateVideo(this.file.id, {
          description: this.description,
        });
      }
    }
  }

  async addTag(event: MatChipInputEvent): Promise<void> {
    const input = event.input;
    const value = event.value;

    // Add tag
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    if (this.status === FileQueueStatus.Success) {
      await this.videoService.updateVideo(this.file.id, {
        tags: this.tags,
      });
    }
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags = this.tags.splice(index, 1);
    }
  }

  private async processSucceedUpload(): Promise<void> {
    this.status = FileQueueStatus.Success;

    // Make video thumbnail
    const thumbnail = await generateThumbnail(this.file.file);
    const thumbnailData = await this.controller.uploadImage(
      this.file.id,
      thumbnail
    );
    const thumbnailLocation = await thumbnailData.ref.getDownloadURL();
    const videoLocation = await this.file.request.snapshot.ref.getDownloadURL();

    // Add video reference to firebase
    const video = createVideo({
      id: this.file.id,
      title: this.title ? this.title : this.file.file.name,
      description: this.description ? this.description : null,
      thumbnail: thumbnailLocation,
      tags: this.tags,
      ownerRef: this.me.id,
      location: videoLocation,
    });

    await this.videoService.addVideo(video);
  }
}
