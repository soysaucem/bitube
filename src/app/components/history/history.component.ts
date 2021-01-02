import { tap, switchMap } from 'rxjs/operators';
import { ComponentWithSubscription } from './../../abstract-components/component-with-subscription';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { List, Map } from 'immutable';
import * as moment from 'moment';
import { UserQuery } from '../../state/user/user.query';
import { VideoHistoryQuery } from '../../state/video-history/video-history.query';
import { VideoHistoryService } from '../../state/video-history/video-history.service';
import { User, VideoHistory } from '../../models';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent
  extends ComponentWithSubscription
  implements OnInit {
  sortedSections: Array<[string, VideoHistory[]]>;
  me: User;

  constructor(
    private titleService: Title,
    private videoHistoryQuery: VideoHistoryQuery,
    private videoHistoryService: VideoHistoryService,
    private userQuery: UserQuery
  ) {
    super();
  }

  ngOnInit(): void {
    this.titleService.setTitle('History');

    this.setupVideoHistories();
  }

  setupVideoHistories(): void {
    this.autoUnsubscribe(
      this.userQuery.selectMyAccount().pipe(
        tap((me) => (this.me = me)),
        switchMap((me) =>
          this.videoHistoryService.syncCollection((ref) =>
            ref.where('ownerRef', '==', me.id)
          )
        )
      )
    ).subscribe();

    this.autoUnsubscribe(this.videoHistoryQuery.selectAll()).subscribe(
      (histories) => {
        let historySectionMap: Map<string, VideoHistory[]> = Map();

        histories.forEach((history) => {
          const historyDate = moment(history.watchedAt).format('YYYY-MM-DD');

          if (!historySectionMap.has(historyDate)) {
            historySectionMap = historySectionMap.set(historyDate, [history]);
          } else {
            historySectionMap = historySectionMap.update(
              historyDate,
              (value) => [...value, history]
            );
          }
        });

        this.sortedSections = historySectionMap
          .sortBy((_, key) => key)
          .reverse()
          .toArray();
      }
    );
  }
}
