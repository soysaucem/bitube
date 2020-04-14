import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Video } from '../../services/video/state/video.model';
import * as moment from 'moment';

export type ItemType = 'card' | 'card-settings';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
})
export class VideoItemComponent implements OnInit {
  @Input() video: Video;
  @Input() type: ItemType;

  hidden: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  toggleMenu(event: any): void {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.hidden = !this.hidden;
  }

  get createdDuration(): string {
    return moment(this.video.createdAt).fromNow();
  }
}
