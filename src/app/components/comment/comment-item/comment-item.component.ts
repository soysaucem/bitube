import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../../services/comment/state/comment.model';
import {
  User,
  fromUserJS,
  UserJSON,
  makeUser,
} from '../../../services/user/state/user.model';
import * as moment from 'moment';
import { UserQuery } from '../../../services/user/state/user.query';
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
      this.owner = makeUser({
        name: this.comment.ip,
        avatar: defaultAvatar as string,
      });
    }
  }

  get createdDuration() {
    return moment(this.comment.createdAt).fromNow();
  }
}
