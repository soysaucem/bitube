import { Component, OnInit, Input } from '@angular/core';
import { FileQueueObject } from 'src/app/models/file-queue.model';
import { UploadController } from '../../../../services/upload.controller';
import { FileQueueStatus } from '../../../../models/file-queue.model';
import { UserService } from '../../../../services/user.service';
import { VideoService } from '../../../../services/video.service';
import { makeVideo } from '../../../../models/video.model';

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

  constructor(
    private userService: UserService,
    private videoService: VideoService
  ) {}

  ngOnInit() {}

  upload() {
    this.file.request
      .on('httpUploadProgress', event => {
        this.status = FileQueueStatus.Progress;
        this.progress = (event.loaded / event.total) * 100;
      })
      .send(async (err, data) => {
        try {
          if (err) {
            console.error('There was an error uploading your file: ', err);
            this.status = FileQueueStatus.Error;
            return err;
          }

          // Add video reference to firebase
          const currentUser = await this.userService.getMyAccount();
          const video = makeVideo({
            id: this.file.id,
            title: this.file.file.name,
            user: currentUser.id,
          });

          await this.videoService.add(video);

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
}
