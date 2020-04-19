import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { List } from 'immutable';
import { Video } from '../../services/video/state/video.model';
import { VideoQuery } from '../../services/video/state/video.query';
import { ComponentWithSubscription } from '../../helper-components/component-with-subscription/component-with-subscription';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { UserQuery } from '../../services/user/state/user.query';
import { User } from '../../services/user/state/user.model';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';

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
  user: User;
  me: User;
  visible: boolean = true;

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
        tap(async ({ id }) => {
          this.user = await this.userQuery.getUser(id);
          this.me = await this.userQuery.getMyAccount();
        }),
        switchMap(({ id }) => this.videoQuery.selectVideosForUser(id))
      )
    );
  }

  setVisible(state: boolean): void {
    this.visible = state;
  }
}
