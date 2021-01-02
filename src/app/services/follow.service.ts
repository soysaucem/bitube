import { Injectable } from '@angular/core';
import { User } from '../models';
import { UserService } from '../state/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class FollowService {
  constructor(private userService: UserService) {}

  toggleFollow(followedUser: User, follower: User): void {
    if (this.isFollowed(followedUser, follower)) {
      this.userService.updateUser(followedUser.id, {
        followers: followedUser.followers - 1,
      });

      this.userService.updateUser(follower.id, {
        followings: follower.followings.filter(
          (ref) => ref !== followedUser.id
        ),
      });
    } else {
      this.userService.updateUser(followedUser.id, {
        followers: followedUser.followers + 1,
      });

      this.userService.updateUser(follower.id, {
        followings: [...follower.followings, followedUser.id],
      });
    }
  }

  isFollowed(followedUser: User, follower: User): boolean {
    return follower.followings.includes(followedUser.id) ? true : false;
  }
}
