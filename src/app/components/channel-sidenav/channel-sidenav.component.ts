import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../services/user/state/user.model';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import { UserQuery } from '../../services/user/state/user.query';

type ChannelSideNavActiveType = 'videos' | 'channels';

@Component({
  selector: 'app-channel-sidenav',
  templateUrl: './channel-sidenav.component.html',
  styleUrls: ['./channel-sidenav.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({ width: '250px' })),
      state('close', style({ width: '30px' })),
      transition('* => *', [animate('200ms ease-in')]),
    ]),
  ],
})
export class ChannelSidenavComponent implements OnInit {
  @Input() user: User;
  @Input() me: User;
  @Output() visibleState: EventEmitter<boolean> = new EventEmitter<boolean>();

  visible: boolean = true;
  active: ChannelSideNavActiveType = 'videos';

  constructor() {}

  ngOnInit(): void {}

  toggleChannelSidenav(): void {
    this.visible = !this.visible;
    this.visibleState.emit(this.visible);
  }

  get showFollowButton(): boolean {
    return !this.me ? true : this.me.id !== this.user.id ? true : false;
  }
}
