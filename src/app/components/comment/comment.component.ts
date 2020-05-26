import { IpServiceService } from './../../services/ip-service.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { List } from 'immutable';
import { AuthService } from '../../services/auth.service';
import {
  Comment,
  makeComment,
} from '../../services/comment/state/comment.model';
import { CommentQuery } from '../../services/comment/state/comment.query';
import { CommentService } from '../../services/comment/state/comment.service';
import { ComponentWithSubscription } from '../../abstract-components/component-with-subscription';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent extends ComponentWithSubscription
  implements OnInit {
  @ViewChild('commentInput') commentInput: ElementRef;

  private content: string = '';
  comments: List<Comment>;

  constructor(
    private commentService: CommentService,
    private commentQuery: CommentQuery
  ) {
    super();
  }

  ngOnInit(): void {
    this.autoUnsubscribe(this.commentQuery.selectComments()).subscribe(
      (data) => (this.comments = data)
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
    this.clearComment();
  }

  clearComment(): void {
    this.content = '';
    (this.commentInput.nativeElement as HTMLTextAreaElement).value = '';
  }

  get disabled(): boolean {
    return this.content ? false : true;
  }
}
