import { Component, OnInit, Input } from '@angular/core';
import { FileQueueObject } from 'src/app/models/file-queue.model';
import { UploadController } from '../../../../services/upload.controller';
import { FileQueueStatus } from '../../../../models/file-queue.model';
import { UserService } from '../../../../services/user.service';
import { VideoService } from '../../../../services/video.service';
import { makeVideo } from '../../../../models/video.model';
import { MatChipInputEvent } from '@angular/material/chips';
import { List } from 'immutable';
import { generateThumbnail } from '../../../../util/generate-thumbnail';

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
  tags: string[] = [];

  // Configurations for mat chip
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private userService: UserService,
    private videoService: VideoService
  ) {}

  ngOnInit() {}

  upload() {
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

  cancel() {
    if (this.status === FileQueueStatus.Progress) {
      this.file.request.abort();
    }
    this.status = FileQueueStatus.Cancel;
    this.controller.remove(this.file);
  }

  get currentProgress() {
    return this.progress * 100;
  }

  handleInput(event: any, type: InputType) {
    if (type === 'title') {
      this.title = event.target.value;
      if (this.status === FileQueueStatus.Success) {
        this.videoService.update(this.file.id, {
          title: this.title,
        });
      }
    } else if (type === 'description') {
      this.description = event.target.value;
      if (this.status === FileQueueStatus.Success) {
        this.videoService.update(this.file.id, {
          description: this.description,
        });
      }
    }
  }

  addTag(event: MatChipInputEvent): void {
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
      this.videoService.update(this.file.id, {
        tags: this.tags,
      });
    }
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  private async processSucceedUpload() {
    this.status = FileQueueStatus.Success;

    // Make video thumbnail
    const thumbnail = await generateThumbnail(this.file.file);

    // Add video reference to firebase
    const currentUser = await this.userService.getMyAccount();
    const video = makeVideo({
      id: this.file.id,
      title: this.title ? this.title : this.file.file.name,
      description: this.description ? this.description : null,
      thumbnail,
      tags: List(this.tags),
      ownerId: currentUser.id,
      ownerName: currentUser.name,
    });

    await this.videoService.add(video);
  }
}
