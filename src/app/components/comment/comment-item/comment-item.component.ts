import { ComponentWithSubscription } from './../../../abstract-components/component-with-subscription';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { User, Comment, createUser } from '../../../models';
import { UserQuery } from '../../../state/user/user.query';
import { generateImageUrlFromPath } from '../../../util/generate-image-url';
import { UserService } from '../../../state/user/user.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent
  extends ComponentWithSubscription
  implements OnInit {
  @Input() comment: Comment;
  owner: User;

  constructor(private userQuery: UserQuery, private userService: UserService) {
    super();
  }

  async ngOnInit(): Promise<void> {
    if (this.comment.ownerRef) {
      this.observeUser();
    } else {
      const defaultAvatar = await generateImageUrlFromPath(
        'assets/account.png'
      );

      this.owner = createUser({
        name: this.comment.ip,
        avatar: defaultAvatar as string,
      });
    }
  }

  observeUser(): void {
    this.autoUnsubscribe(
      this.userService.syncUser(this.comment.ownerRef)
    ).subscribe();

    this.autoUnsubscribe(
      this.userQuery.selectEntity(this.comment.ownerRef)
    ).subscribe((user) => (this.owner = user));
  }

  get createdDuration() {
    return moment(this.comment.createdAt).fromNow();
  }
}
