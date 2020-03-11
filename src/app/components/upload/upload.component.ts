import { Component, OnInit } from '@angular/core';
import { UploadController } from 'src/app/services/upload.controller';
import { VideoService } from 'src/app/services/video.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit {
  controller = new UploadController();

  constructor(
    private videoService: VideoService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.controller.register(this.videoService, this.userService);
  }

  onDrop(event: DragEvent) {
    this.cancelEventInvoke(event);

    let files = event.dataTransfer.files;

    files = Array.prototype.filter.call(
      files,
      (file: File) => file.type === 'video/mp4'
    );

    this.controller.add(files);
  }

  cancelEventInvoke(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }
}
