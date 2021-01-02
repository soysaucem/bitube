import { VideoService } from './../../state/video/video.service';
import { ComponentWithSubscription } from './../../abstract-components/component-with-subscription';
import { UserQuery } from '../../state/user/user.query';
import { VideoQuery } from '../../state/video/video.query';
import { Component, OnInit, Input } from '@angular/core';
import { List } from 'immutable';
import { filter, map } from 'rxjs/operators';
import { User, Video } from '../../models';
import { UserService } from '../../state/user/user.service';

@Component({
  selector: 'app-following-videos-section',
  templateUrl: './following-videos-section.component.html',
  styleUrls: ['./following-videos-section.component.scss'],
})
export class FollowingVideosSectionComponent
  extends ComponentWithSubscription
  implements OnInit {
  private NUMBER_OF_ROW_ITEMS: number = 6;

  @Input() userId: string;
  videos: Video[];
  user: User;
  me: User;

  constructor(
    private videoService: VideoService,
    private videoQuery: VideoQuery,
    private userQuery: UserQuery,
    private userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
    this.autoUnsubscribe(
      this.videoService.syncVideosForUserWithLimit(
        this.userId,
        this.NUMBER_OF_ROW_ITEMS
      )
    ).subscribe();

    this.autoUnsubscribe(this.videoQuery.selectAll())
      .pipe(
        map((videos) =>
          videos.filter((video) => video.ownerRef === this.userId)
        )
      )
      .subscribe((videos) => (this.videos = videos));

    this.autoUnsubscribe(
      this.userService
        .syncUser(this.userId)
        .pipe(filter((user) => user !== null && user !== undefined))
    ).subscribe();

    this.autoUnsubscribe(this.userQuery.selectEntity(this.userId)).subscribe(
      (user) => (this.user = user)
    );

    this.autoUnsubscribe(this.userQuery.selectMyAccount()).subscribe(
      (me) => (this.me = me)
    );
  }
}
