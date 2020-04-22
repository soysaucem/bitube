import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../services/user/state/user.model';

@Component({
  selector: 'app-channel-header',
  templateUrl: './channel-header.component.html',
  styleUrls: ['./channel-header.component.scss'],
})
export class ChannelHeaderComponent implements OnInit {
  @Input() user: User;

  constructor() {}

  ngOnInit(): void {}
}
