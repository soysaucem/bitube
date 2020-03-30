import { Component, HostListener, OnInit } from '@angular/core';
import { List } from 'immutable';
import { ComponentWithSubscription } from 'src/app/helper-components/component-with-subscription/component-with-subscription';
import { FileQueueObject } from 'src/app/controller/upload/file-queue.model';
import { UploadController } from 'src/app/controller/upload/upload.controller';

const BASE_MB = 1024 * 1024;

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

  ngOnInit(): void {}

  onDrop(event: DragEvent): void {
    this.cancelEventInvoke(event);
    this.addUploadFile(event);
  }

  addUploadFile(event: any): void {
    let files =
      event.type === 'drop' ? event.dataTransfer.files : event.target.files;

    files = Array.prototype.filter.call(
      files,
      (file: File) => file.type.includes('video') && file.size <= 50 * BASE_MB
    );

    this.controller.add(files);
  }

  cancelEventInvoke(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  setQueue(event: any): void {
    this.queue = event;
  }

  hasUploadingJob(): boolean {
    return this.queue?.size > 0 ? true : false;
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): void {
    if (this.hasUploadingJob()) {
      $event.returnValue = true;
    }
  }
}
