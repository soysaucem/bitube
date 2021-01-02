import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { VideoHistory } from '../../models';

@Component({
  selector: 'app-history-section',
  templateUrl: './history-section.component.html',
  styleUrls: ['./history-section.component.scss'],
})
export class HistorySectionComponent implements OnInit {
  @Input() section: [string, VideoHistory[]];
  sectionTitle: string;
  sectionContent: VideoHistory[];

  constructor() {}

  ngOnInit(): void {
    this.sectionTitle = this.section[0];
    this.sectionContent = this.section[1];
  }

  formatDate(date: string): string {
    return moment(date).format('DD MMMM YYYY');
  }
}
