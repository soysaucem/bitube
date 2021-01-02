import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { User, Comment, createUser } from '../../../models';
import { UserQuery } from '../../../state/user/user.query';
import { generateImageUrlFromPath } from '../../../util/generate-image-url';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit {
  @Input() comment: Comment;
  owner: User;

  constructor(private userQuery: UserQuery) {}

  async ngOnInit(): Promise<void> {
    if (this.comment.ownerRef) {
      this.owner = await this.userQuery.getUser(this.comment.ownerRef);
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

  get createdDuration() {
    return moment(this.comment.createdAt).fromNow();
  }
}
