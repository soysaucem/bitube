import { UserQuery } from './../../state/user/user.query';
import {
  Component,
  HostListener,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { List } from 'immutable';
import { FileQueueObject } from 'src/app/controller/upload/file-queue.model';
import { UploadController } from 'src/app/controller/upload/upload.controller';
import { Title } from '@angular/platform-browser';
import { ComponentWithSubscription } from '../../abstract-components/component-with-subscription';
import { User } from '../../models';

const BASE_MB = 1024 * 1024;
const FILE_SIZE_LIMIT = 50 * BASE_MB;

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent
  extends ComponentWithSubscription
  implements OnInit {
  @ViewChild('uploadInput') uploadInput: ElementRef;

  me: User;
  controller = new UploadController();
  queue: List<FileQueueObject>;

  constructor(private titleService: Title, private userQuery: UserQuery) {
    super();
  }

  ngOnInit(): void {
    this.titleService.setTitle('Upload');
    this.autoUnsubscribe(this.userQuery.selectMyAccount()).subscribe(
      (me) => (this.me = me)
    );
  }

  onDrop(event: DragEvent): void {
    this.cancelEventInvoke(event);
    this.addUploadFile(event);
  }

  addUploadFile(event: any): void {
    let files =
      event.type === 'drop' ? event.dataTransfer.files : event.target.files;

    // Filter not video files and files exceed limit
    files = Array.prototype.filter.call(files, (file: File) =>
      file.type.includes('video')
    );

    this.controller.add(files, this.me.id);

    // Clear file input after added
    (this.uploadInput.nativeElement as HTMLInputElement).value = '';
  }

  cancelEventInvoke(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  setQueue(event: List<FileQueueObject>): void {
    this.queue = event;
  }

  hasUploadingJob(): boolean {
    return this.queue?.size > 0 ? true : false;
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification(event: any): void {
    if (this.hasUploadingJob()) {
      event.returnValue = true;
    }
  }
}
