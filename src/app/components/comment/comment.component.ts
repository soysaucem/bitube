import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { CommentService } from '../../services/comment/state/comment.service';
import { User } from '../../services/user/state/user.model';
import {
  makeComment,
  Comment,
} from '../../services/comment/state/comment.model';
import { CommentQuery } from '../../services/comment/state/comment.query';
import { ComponentWithSubscription } from '../../helper-components/component-with-subscription/component-with-subscription';
import { List } from 'immutable';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent extends ComponentWithSubscription
  implements OnInit {
  @ViewChild('commentInput') commentInput: ElementRef;

  content = '';
  comments: List<Comment>;

  constructor(
    private commentService: CommentService,
    private commentQuery: CommentQuery
  ) {
    super();
  }

  ngOnInit(): void {
    this.autoUnsubscribe(this.commentQuery.selectComments()).subscribe(
      data => (this.comments = data)
    );
  }

  handleInput(event: any): void {
    this.content = event.target.value;
  }

  async post(): Promise<void> {
    const comment = makeComment({
      content: this.content,
    });
    await this.commentService.addComment(comment);
    this.cancel();
  }

  cancel(): void {
    this.content = '';
    (this.commentInput.nativeElement as HTMLTextAreaElement).value = '';
  }

  get disabled(): boolean {
    return this.content ? false : true;
  }

  async getOwner(comment: Comment) {
    const owner = await comment.ownerRef.get();
    return owner.data();
  }
}
