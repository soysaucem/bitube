import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../../services/user/state/user.model';
import { UserService } from '../../services/user/state/user.service';
import { UserQuery } from '../../services/user/state/user.query';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SettingsComponent implements OnInit {
  me: User;
  message = 'Email cannot be changed since it is your primary login method';

  constructor(private userQuery: UserQuery) {}

  async ngOnInit(): Promise<void> {
    this.me = await this.userQuery.getMyAccount();
  }

  get disabled() {
    return true;
  }
}
