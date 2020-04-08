import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private router: Router,
    private auth: AuthService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {}

  handleEmail(event: string) {
    this.email = event;
  }

  handlePassword(event: string) {
    this.password = event;
  }

  async login() {
    if (!this.email || !this.password) {
      return;
    }

    try {
      await this.auth.login(this.email, this.password);

      this.router.navigate(['']);
    } catch (error) {
      this.snackbar.open(
        'Unable to login. Please check your email and password',
        'Dismiss',
        { duration: 3000, horizontalPosition: 'left' }
      );
    }
  }
}
