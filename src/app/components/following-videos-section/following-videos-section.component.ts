import { ComponentWithSubscription } from './../../abstract-components/component-with-subscription';
import { UserQuery } from './../../services/user/state/user.query';
import { VideoQuery } from './../../services/video/state/video.query';
import { Component, OnInit, Input } from '@angular/core';
import { List } from 'immutable';
import { Video } from '../../services/video/state/video.model';
import { User } from '../../services/user/state/user.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-following-videos-section',
  templateUrl: './following-videos-section.component.html',
  styleUrls: ['./following-videos-section.component.scss'],
})
export class FollowingVideosSectionComponent extends ComponentWithSubscription
  implements OnInit {
  private NUMBER_OF_ROW_ITEMS: number = 6;

  @Input() userId: string;
  videos: List<Video>;
  user: User;
  me: User;

  constructor(private videoQuery: VideoQuery, private userQuery: UserQuery) {
    super();
  }

  ngOnInit(): void {
    this.autoUnsubscribe(
      this.videoQuery.selectVideosForUserWithLimit(
        this.userId,
        this.NUMBER_OF_ROW_ITEMS
      )
    ).subscribe((videos) => (this.videos = videos));

    this.autoUnsubscribe(
      this.userQuery
        .selectUser(this.userId)
        .pipe(filter((user) => user !== null && user !== undefined))
    ).subscribe((user) => (this.user = user));

    this.autoUnsubscribe(this.userQuery.selectMyAccount()).subscribe(
      (me) => (this.me = me)
    );
  }
}
