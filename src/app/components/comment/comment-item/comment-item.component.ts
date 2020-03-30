import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../../../services/comment/state/comment.model';
import {
  User,
  fromJS,
  UserJSON,
} from '../../../services/user/state/user.model';
import * as moment from 'moment';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit {
  @Input() comment: Comment;
  owner: User;

  constructor() {}

  async ngOnInit(): Promise<void> {
    this.owner = fromJS((await this.comment.ownerRef.get()).data() as UserJSON);
  }

  get createdDuration() {
    return moment(this.comment.createdAt).fromNow();
  }
}
