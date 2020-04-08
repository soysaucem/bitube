import { Component, OnInit, Input } from '@angular/core';
import { Video } from '../../services/video/state/video.model';

export type ItemType = 'list' | 'card';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
})
export class VideoItemComponent implements OnInit {
  @Input() type: ItemType;
  @Input() video: Video;

  constructor() {}

  ngOnInit(): void {}
}
