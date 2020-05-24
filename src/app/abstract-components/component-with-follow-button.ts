import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FollowService } from '../services/follow.service';
import { User } from '../services/user/state/user.model';
import { ComponentWithSubscription } from './component-with-subscription';
import { Input } from '@angular/core';

export class ComponentWithFollowButton extends ComponentWithSubscription {
  @Input() user: User;
  @Input() me: User;

  constructor(readonly followService: FollowService, readonly router: Router) {
    super();
  }

  toggleFollow(event: any): void {
    event.preventDefault();
    event.stopPropagation();

    if (!this.me) {
      this.router.navigate(['login']);
      return;
    }

    this.followService.toggleFollow(this.user, this.me);
  }

  get showFollowButton(): boolean {
    return !this.me ? true : this.me.id !== this.user.id ? true : false;
  }

  get isFollowed(): boolean {
    return this.me ? this.followService.isFollowed(this.user, this.me) : false;
  }

  get followersText(): string {
    return this.user.followers <= 1
      ? this.user.followers + ' follower'
      : this.user.followers + 'followers';
  }
}
