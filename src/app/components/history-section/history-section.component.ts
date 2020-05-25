import { VideoHistory } from './../../services/video-history/state/video-history.model';
import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { List } from 'immutable';

@Component({
  selector: 'app-history-section',
  templateUrl: './history-section.component.html',
  styleUrls: ['./history-section.component.scss'],
})
export class HistorySectionComponent implements OnInit {
  @Input() section: List<any>;
  sectionTitle: string;
  sectionContent: List<VideoHistory>;

  constructor() {}

  ngOnInit(): void {
    this.sectionTitle = this.section[0];
    // Sort video list by watchedAt property from newest to oldest
    this.sectionContent = List(
      this.section[1].sort((a, b) => {
        return a.watchedAt < b.watchedAt
          ? 1
          : a.watchedAt > b.watchedAt
          ? -1
          : 0;
      })
    );
  }

  formatDate(date: string): string {
    return moment(date).format('DD MMMM YYYY');
  }
}
