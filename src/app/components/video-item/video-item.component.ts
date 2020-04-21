import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../../services/video/state/video.model';
import * as moment from 'moment';
import {
  User,
  fromUserJS,
  UserJSON,
} from '../../services/user/state/user.model';
import { UserQuery } from '../../services/user/state/user.query';

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

  owner: User;

  hidden: boolean = true;

  constructor(private userQuery: UserQuery) {}

  async ngOnInit(): Promise<void> {
    this.owner = await this.userQuery.getUser(this.video.ownerRef);
  }

  toggleMenu(event: any): void {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.hidden = !this.hidden;
  }

  get createdDuration(): string {
    return moment(this.video.createdAt).fromNow();
  }

  get showSettings(): boolean {
    return this.type === 'card-settings' && this.owner.id === this.me?.id;
  }
}
