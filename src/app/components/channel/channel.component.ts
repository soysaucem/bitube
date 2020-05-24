import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List } from 'immutable';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { User } from '../../services/user/state/user.model';
import { UserQuery } from '../../services/user/state/user.query';
import { Video } from '../../services/video/state/video.model';
import { VideoQuery } from '../../services/video/state/video.query';
import { ComponentWithSubscription } from '../../abstract-components/component-with-subscription';
import { ChannelSideNavActiveType } from './channel-sidenav/channel-sidenav.component';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('padLeft', [
      state('pad', style({ 'padding-left': '250px' })),
      state('unpad', style({ 'padding-left': '0' })),
      transition('* => *', [animate('200ms ease-in')]),
    ]),
  ],
})
export class ChannelComponent extends ComponentWithSubscription
  implements OnInit {
  videos$: Observable<List<Video>>;
  user$: Observable<User>;
  me$: Observable<User>;
  visible: boolean;
  activeState: ChannelSideNavActiveType;

  constructor(
    private videoQuery: VideoQuery,
    private route: ActivatedRoute,
    private userQuery: UserQuery
  ) {
    super();
  }

  ngOnInit(): void {
    this.videos$ = this.autoUnsubscribe(
      this.route.params.pipe(
        tap(({ id }) => {
          this.user$ = this.userQuery.selectUser(id);
          this.me$ = this.userQuery.selectMyAccount();
        }),
        switchMap(({ id }) => this.videoQuery.selectVideosForUser(id))
      )
    );
  }

  setVisible(state: boolean): void {
    this.visible = state;
  }

  setActiveState(state: ChannelSideNavActiveType): void {
    this.activeState = state;
  }
}
