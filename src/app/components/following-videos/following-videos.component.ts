import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-following-videos',
  templateUrl: './following-videos.component.html',
  styleUrls: ['./following-videos.component.scss'],
})
export class FollowingVideosComponent implements OnInit {
  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Following');
  }
}
