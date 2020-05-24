import { Component, OnInit, Input } from '@angular/core';
import { List } from 'immutable';
import { User } from '../../services/user/state/user.model';

@Component({
  selector: 'app-following-channels',
  templateUrl: './following-channels.component.html',
  styleUrls: ['./following-channels.component.scss'],
})
export class FollowingChannelsComponent implements OnInit {
  @Input() followingChannels: List<string>;
  @Input() me: User;

  constructor() {}

  ngOnInit(): void {}
}
