import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemType } from '../video-item/video-item.component';
import { User, Video } from '../../models';

@Component({
  selector: 'app-video-grid',
  templateUrl: './video-grid.component.html',
  styleUrls: ['./video-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VideoGridComponent implements OnInit {
  @Input() title?: string;
  @Input() videos$: Observable<Video[]>;
  @Input() type: ItemType;
  @Input() me: User;

  constructor() {}

  ngOnInit(): void {}
}
