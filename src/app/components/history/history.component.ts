import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { List, Map } from 'immutable';
import * as moment from 'moment';
import { User } from '../../services/user/state/user.model';
import { VideoHistory } from '../../services/video-history/state/video-history.model';
import { UserQuery } from './../../services/user/state/user.query';
import { VideoHistoryQuery } from './../../services/video-history/state/video-history.query';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  sortedVideoHistories: List<any>;
  me: User;

  constructor(
    private titleService: Title,
    private videoHistoryQuery: VideoHistoryQuery,
    private userQuery: UserQuery
  ) {}

  async ngOnInit(): Promise<void> {
    this.titleService.setTitle('History');
    this.me = await this.userQuery.getMyAccount();
    this.setupVideoHistories();
  }

  setupVideoHistories(): void {
    this.videoHistoryQuery
      .selectVideoHistoriesForUser(this.me.id)
      .subscribe((videoHistories) => {
        let videoHistoriesMap: Map<string, List<VideoHistory>> = Map();

        videoHistories.forEach((history) => {
          const historyDate = moment(history.watchedAt).format('YYYY-MM-DD');

          if (!videoHistoriesMap.has(historyDate)) {
            videoHistoriesMap = videoHistoriesMap.set(
              historyDate,
              List([history])
            );
          } else {
            videoHistoriesMap = videoHistoriesMap.update(historyDate, (value) =>
              value.push(history)
            );
          }
        });

        this.sortedVideoHistories = List(
          videoHistoriesMap
            .sortBy((value, key) => key)
            .reverse()
            .toArray()
        );
      });
  }
}
