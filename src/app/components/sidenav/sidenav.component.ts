import { UserQuery } from './../../services/user/state/user.query';
import { PlaylistQuery } from './../../services/playlist/state/playlist.query';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { User } from 'firebase';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidenavComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  watchLaterURL: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private playlistQuery: PlaylistQuery,
    private userQuery: UserQuery
  ) {}

  async ngOnInit(): Promise<void> {
    const me = await this.userQuery.getMyAccount();
    const watchLaterPlaylist = me
      ? await this.playlistQuery.getDefaultPlaylistForUser(me.id)
      : null;

    if (watchLaterPlaylist) {
      this.watchLaterURL = `/playlist/${watchLaterPlaylist.id}`;
    } else {
      this.watchLaterURL = '/login';
    }
  }
}
