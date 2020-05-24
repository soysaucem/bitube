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
import { FollowService } from '../../../services/follow.service';
import { Title } from '@angular/platform-browser';
import { ComponentWithFollowButton } from '../../../abstract-components/component-with-follow-button';

export type ChannelSideNavActiveType = 'videos' | 'channels';

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
  @Output() activeState: EventEmitter<
    ChannelSideNavActiveType
  > = new EventEmitter<ChannelSideNavActiveType>();

  visible: boolean = true;
  active: ChannelSideNavActiveType;

  constructor(
    readonly followService: FollowService,
    readonly router: Router,
    private titleService: Title
  ) {
    super(followService, router);
  }

  ngOnInit(): void {
    this.setActiveState('videos');
    this.visibleState.emit(this.visible);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user && changes.user.currentValue) {
      this.titleService.setTitle(changes.user.currentValue.name);
    }
  }

  toggleChannelSidenav(): void {
    this.visible = !this.visible;
    this.visibleState.emit(this.visible);
  }

  setActiveState(state: ChannelSideNavActiveType): void {
    this.active = state;
    this.activeState.emit(this.active);
  }

  get followButtonText(): string {
    return this.isFollowed ? 'Unfollow this channel' : 'Follow this channel';
  }
}
