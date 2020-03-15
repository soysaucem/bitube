import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;

  constructor(private router: Router, private auth: AuthService) {}

  async ngOnInit() {
    this.isAuthenticated = await this.auth.isAuthenticated();
  }
}
