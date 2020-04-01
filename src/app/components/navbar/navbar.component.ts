import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;

  constructor(private auth: AuthService) {}

  async ngOnInit(): Promise<void> {
    this.isAuthenticated = await this.auth.isAuthenticated();
  }
}
