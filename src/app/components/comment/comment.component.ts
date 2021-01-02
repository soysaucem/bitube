import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ComponentWithSubscription } from '../../abstract-components/component-with-subscription';
import { Comment, User } from '../../models';
import { CommentQuery } from '../../state/comment/comment.query';
import { CommentService } from '../../state/comment/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent
  extends ComponentWithSubscription
  implements OnInit {
  @ViewChild('commentInput') commentInput: ElementRef;

  @Input() user: User;

  private content: string = '';
  comments: Comment[];

  constructor(
    private commentService: CommentService,
    private commentQuery: CommentQuery
  ) {
    super();
  }

  ngOnInit(): void {
    this.autoUnsubscribe(this.commentService.syncCollection()).subscribe();
    this.autoUnsubscribe(this.commentQuery.selectAll()).subscribe(
      (data) => (this.comments = data)
    );
  }

  handleInput(event: any): void {
    this.content = event.target.value;
  }

  async post(): Promise<void> {
    await this.commentService.addComment({
      content: this.content,
      ownerRef: this.user.id,
    });
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
