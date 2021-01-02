import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ComponentWithSubscription } from '../../abstract-components/component-with-subscription';
import { Comment } from '../../models';
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
    await this.commentService.addComment(this.content);
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
