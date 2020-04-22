import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from 'immutable';
import { Video } from '../../services/video/state/video.model';
import { ItemType } from '../video-item/video-item.component';
import { User } from '../../services/user/state/user.model';

@Component({
  selector: 'app-video-grid',
  templateUrl: './video-grid.component.html',
  styleUrls: ['./video-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VideoGridComponent implements OnInit {
  @Input() title?: string;
  @Input() videos$: Observable<List<Video>>;
  @Input() type: ItemType;
  @Input() me: User;

  constructor() {}

  ngOnInit(): void {}
}
