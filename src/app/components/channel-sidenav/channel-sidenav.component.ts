import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { FollowService } from '../../services/follow.service';
import { User } from '../../services/user/state/user.model';
import { Title } from '@angular/platform-browser';
import { ComponentWithFollowButton } from '../../abstract-components/component-with-follow-button';

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
export class ChannelSidenavComponent extends ComponentWithFollowButton
  implements OnInit, OnChanges {
  @Output() visibleState: EventEmitter<boolean> = new EventEmitter<boolean>();

  visible: boolean = true;
  active: ChannelSideNavActiveType = 'videos';

  constructor(
    readonly followService: FollowService,
    readonly router: Router,
    private titleService: Title
  ) {
    super(followService, router);
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user && changes.user.currentValue) {
      this.titleService.setTitle(changes.user.currentValue.name);
    }
  }

  toggleChannelSidenav(): void {
    this.visible = !this.visible;
    this.visibleState.emit(this.visible);
  }

  get followButtonText(): string {
    return this.isFollowed ? 'Unfollow this channel' : 'Follow this channel';
  }
}
