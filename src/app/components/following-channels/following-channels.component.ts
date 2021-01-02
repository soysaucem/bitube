import { Component, OnInit, Input } from '@angular/core';
import { List } from 'immutable';
import { User } from '../../models';

@Component({
  selector: 'app-following-channels',
  templateUrl: './following-channels.component.html',
  styleUrls: ['./following-channels.component.scss'],
})
export class FollowingChannelsComponent implements OnInit {
  @Input() followingChannels: Array<string>;
  @Input() me: User;

  constructor() {}

  ngOnInit(): void {}
}
