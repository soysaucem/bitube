import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-following-channels',
  templateUrl: './following-channels.component.html',
  styleUrls: ['./following-channels.component.scss'],
})
export class FollowingChannelsComponent implements OnInit {
  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Following channels');
  }
}
