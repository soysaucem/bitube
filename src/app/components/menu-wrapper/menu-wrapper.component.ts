import { Component, OnInit, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-menu-wrapper',
  templateUrl: './menu-wrapper.component.html',
  styleUrls: ['./menu-wrapper.component.scss'],
})
export class MenuWrapperComponent implements OnInit {
  @Input() hidden: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:mouseup', ['$event'])
  onMouseUp() {
    this.hidden = true;
  }
}
