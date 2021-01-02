import { UserQuery } from '../../state/user/user.query';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { User } from '../../models';

@Component({
  selector: 'app-following-videos',
  templateUrl: './following-videos.component.html',
  styleUrls: ['./following-videos.component.scss'],
})
export class FollowingVideosComponent implements OnInit {
  me: User;

  constructor(private titleService: Title, private userQuery: UserQuery) {}

  async ngOnInit(): Promise<void> {
    this.titleService.setTitle('Following');
    this.me = await this.userQuery.getMyAccount();
  }
}
