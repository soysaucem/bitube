import { Component, HostListener, OnInit } from '@angular/core';
import { List } from 'immutable';
import { ComponentWithSubscription } from 'src/app/helper-components/component-with-subscription/component-with-subscription';
import { FileQueueObject } from 'src/app/controller/upload/file-queue.model';
import { UploadController } from 'src/app/controller/upload/upload.controller';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent extends ComponentWithSubscription
  implements OnInit {
  controller = new UploadController();
  queue: List<FileQueueObject>;

  constructor() {
    super();
  }

  ngOnInit() {}

  onDrop(event: DragEvent) {
    this.cancelEventInvoke(event);
    this.addUploadFile(event);
  }

  addUploadFile(event: any) {
    let files =
      event.type === 'drop' ? event.dataTransfer.files : event.target.files;

    files = Array.prototype.filter.call(files, (file: File) =>
      file.type.includes('video')
    );

    this.controller.add(files);
  }

  cancelEventInvoke(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  setQueue(event: any) {
    this.queue = event;
  }

  hasUploadingJob() {
    return this.queue?.size > 0 ? true : false;
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.hasUploadingJob()) {
      $event.returnValue = true;
    }
  }
}
