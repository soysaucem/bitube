import { ComponentWithSubscription } from './../../abstract-components/component-with-subscription';
import { UserQuery } from '../../state/user/user.query';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { User } from '../../models';

@Component({
  selector: 'app-following-videos',
  templateUrl: './following-videos.component.html',
  styleUrls: ['./following-videos.component.scss'],
})
export class FollowingVideosComponent
  extends ComponentWithSubscription
  implements OnInit {
  me: User;

  constructor(private titleService: Title, private userQuery: UserQuery) {
    super();
  }

  ngOnInit(): void {
    this.titleService.setTitle('Following');

    this.autoUnsubscribe(this.userQuery.selectMyAccount()).subscribe(
      (me) => (this.me = me)
    );
  }
}
