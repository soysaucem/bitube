import { Injectable } from '@angular/core';
import { User } from './user/state/user.model';
import { UserService } from './user/state/user.service';

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
        followings: follower.followings
          .filter((ref) => ref !== followedUser.id)
          .toArray(),
      });
    } else {
      this.userService.updateUser(followedUser.id, {
        followers: followedUser.followers + 1,
      });

      this.userService.updateUser(follower.id, {
        followings: follower.followings.push(followedUser.id).toArray(),
      });
    }
  }

  isFollowed(followedUser: User, follower: User): boolean {
    return follower.followings.includes(followedUser.id) ? true : false;
  }
}
