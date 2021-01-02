import { Router } from '@angular/router';
import { FollowService } from './../../services/follow.service';
import { ComponentWithFollowButton } from './../../abstract-components/component-with-follow-button';
import { UserQuery } from '../../state/user/user.query';
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../state/user/user.service';

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
    private userService: UserService,
    readonly followService: FollowService,
    readonly router: Router
  ) {
    super(followService, router);
  }

  ngOnInit(): void {
    this.autoUnsubscribe(this.userService.syncUser(this.channelId)).subscribe();
    this.autoUnsubscribe(this.userQuery.selectEntity(this.channelId)).subscribe(
      (user) => (this.user = user)
    );
  }

  get followButtonText(): string {
    return this.isFollowed ? 'Unfollow' : 'Follow';
  }
}
