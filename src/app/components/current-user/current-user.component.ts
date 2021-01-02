import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserQuery } from '../../state/user/user.query';
import { Observable } from 'rxjs';
import { User } from '../../models';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss'],
})
export class CurrentUserComponent implements OnInit {
  me$: Observable<User>;

  constructor(private auth: AuthService, private userQuery: UserQuery) {}

  ngOnInit(): void {
    this.me$ = this.userQuery.selectMyAccount();
  }

  async logout(): Promise<void> {
    await this.auth.logout();
  }
}
