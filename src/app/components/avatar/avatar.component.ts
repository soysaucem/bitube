import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  @Input() avatarBase64: string;
  @Input() size: number;

  constructor() {}

  ngOnInit(): void {}

  get style() {
    return `width: ${this.size}; height: ${this.size};`;
  }
}
