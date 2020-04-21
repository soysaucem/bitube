import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../../services/comment/state/comment.model';
import {
  User,
  fromUserJS,
  UserJSON,
} from '../../../services/user/state/user.model';
import * as moment from 'moment';
import { UserQuery } from '../../../services/user/state/user.query';

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
    this.owner = await this.userQuery.getUser(this.comment.ownerRef);
  }

  get createdDuration() {
    return moment(this.comment.createdAt).fromNow();
  }
}
