import { Component, OnInit, Input } from '@angular/core';
import { FileQueueObject } from 'src/app/models/file-queue.model';

@Component({
  selector: 'app-uploading-item',
  templateUrl: './uploading-item.component.html',
  styleUrls: ['./uploading-item.component.scss'],
})
export class UploadingItemComponent implements OnInit {
  @Input() file: FileQueueObject;

  constructor() {}

  ngOnInit() {}
}
