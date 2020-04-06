import { Component, OnInit, Input } from '@angular/core';
import { FileQueueObject } from 'src/app/controller/upload/file-queue.model';
import { UploadController } from '../../../../controller/upload/upload.controller';
import { FileQueueStatus } from '../../../../controller/upload/file-queue.model';
import { MatChipInputEvent } from '@angular/material/chips';
import { List } from 'immutable';
import { generateThumbnail } from '../../../../util/generate-thumbnail';
import { makeVideo } from '../../../../services/video/state/video.model';
import { VideoService } from '../../../../services/video/state/video.service';
import { UserQuery } from '../../../../services/user/state/user.query';
import { ProfileUploadService } from '../../../../services/profile-upload.service';

type InputType = 'description' | 'title';
const ENTER = 13;
const COMMA = 188;

@Component({
  selector: 'app-uploading-item',
  templateUrl: './uploading-item.component.html',
  styleUrls: ['./uploading-item.component.scss'],
})
export class UploadingItemComponent implements OnInit {
  @Input() file: FileQueueObject;
  @Input() controller: UploadController;
  progress: number;
  status = FileQueueStatus.Pending;

  title: string;
  description: string;
  tags = List<string>();

  // Configurations for mat chip
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private userQuery: UserQuery,
    private videoService: VideoService,
    private profileUploadService: ProfileUploadService
  ) {}

  ngOnInit() {}

  upload(): void {
    this.file.request
      .on('httpUploadProgress', event => {
        this.status = FileQueueStatus.Progress;
        this.progress = event.loaded / event.total;
      })
      .send(async (err, data) => {
        try {
          if (err) {
            console.error('There was an error uploading your file: ', err);
            this.status = FileQueueStatus.Error;
            return err;
          }

          await this.processSucceedUpload();

          return data;
        } catch (error) {
          console.error(error);
        }
      });
  }

  cancel(): void {
    if (this.status === FileQueueStatus.Progress) {
      this.file.request.abort();
    }
    this.status = FileQueueStatus.Cancel;
    this.controller.remove(this.file);
  }

  get currentProgress(): number {
    return this.progress * 100;
  }

  get fileName(): string {
    return this.title ? this.title : this.file.file.name;
  }

  async handleInput(event: any, type: InputType): Promise<void> {
    if (type === 'title') {
      this.title = event.target.value;
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
      this.tags = this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    if (this.status === FileQueueStatus.Success) {
      await this.videoService.updateVideo(this.file.id, {
        tags: this.tags.toArray(),
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
      thumbnail,
      'thumbnail'
    );

    // Add video reference to firebase
    const currentUser = await this.userQuery.getMyAccount();
    const video = makeVideo({
      id: this.file.id,
      title: this.title ? this.title : this.file.file.name,
      description: this.description ? this.description : null,
      thumbnail: thumbnailData.Location,
      tags: this.tags,
      ownerId: currentUser.id,
      ownerName: currentUser.name,
    });

    await this.videoService.addVideo(video);
  }
}
