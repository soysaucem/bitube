import { Router } from '@angular/router';
import { FollowService } from './../../services/follow.service';
import { ComponentWithFollowButton } from './../../abstract-components/component-with-follow-button';
import { UserQuery } from '../../state/user/user.query';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-following-channels-item',
  templateUrl: './following-channels-item.component.html',
  styleUrls: ['./following-channels-item.component.scss'],
})
export class FollowingChannelsItemComponent
  extends ComponentWithFollowButton
  implements OnInit {
  @Input() channelId: string;

  constructor(
    private userQuery: UserQuery,
    readonly followService: FollowService,
    readonly router: Router
  ) {
    super(followService, router);
  }

  async ngOnInit(): Promise<void> {
    this.user = await this.userQuery.getUser(this.channelId);
  }

  get followButtonText(): string {
    return this.isFollowed ? 'Unfollow' : 'Follow';
  }
}
