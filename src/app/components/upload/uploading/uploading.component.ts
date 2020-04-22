import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { List } from 'immutable';
import { FileQueueObject } from 'src/app/controller/upload/file-queue.model';
import { UploadController } from '../../../controller/upload/upload.controller';
import { ComponentWithSubscription } from '../../../abstract-components/component-with-subscription';

@Component({
  selector: 'app-uploading',
  templateUrl: './uploading.component.html',
  styleUrls: ['./uploading.component.scss'],
})
export class UploadingComponent extends ComponentWithSubscription
  implements OnInit {
  @Input() controller: UploadController;
  queueObjects: List<FileQueueObject>;

  @Output() queue = new EventEmitter<List<FileQueueObject>>();

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.autoUnsubscribe(this.controller.selectQueue()).subscribe(
      (objects: List<FileQueueObject>) => {
        this.queueObjects = objects;
        this.queue.emit(objects);
      }
    );
  }
}
