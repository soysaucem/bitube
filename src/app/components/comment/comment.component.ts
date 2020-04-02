import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { List } from 'immutable';
import { ComponentWithSubscription } from '../../helper-components/component-with-subscription/component-with-subscription';
import { AuthService } from '../../services/auth.service';
import {
  Comment,
  makeComment,
} from '../../services/comment/state/comment.model';
import { CommentQuery } from '../../services/comment/state/comment.query';
import { CommentService } from '../../services/comment/state/comment.service';

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
    private auth: AuthService,
    private commentService: CommentService,
    private commentQuery: CommentQuery,
    private router: Router
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

  async redirect(): Promise<void> {
    if (!(await this.auth.isAuthenticated())) {
      this.router.navigate(['login']);
      return;
    }
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
