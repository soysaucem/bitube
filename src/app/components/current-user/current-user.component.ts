import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../services/user/state/user.model';
import { UserQuery } from '../../services/user/state/user.query';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss'],
})
export class CurrentUserComponent implements OnInit {
  me: User;

  constructor(
    private auth: AuthService,
    private router: Router,
    private userQuery: UserQuery
  ) {}

  async ngOnInit() {
    this.me = await this.userQuery.getMyAccount();
  }

  async logout() {
    await this.auth.logout();
    this.router.navigate(['login']);
  }
}
