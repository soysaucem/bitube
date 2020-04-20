import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Video } from '../../services/video/state/video.model';
import * as moment from 'moment';
import { User } from '../../services/user/state/user.model';

export type ItemType = 'card' | 'card-settings';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
})
export class VideoItemComponent implements OnInit {
  @Input() me: User;
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

  get showSettings(): boolean {
    return this.type === 'card-settings' && this.video.ownerId === this.me?.id;
  }
}
