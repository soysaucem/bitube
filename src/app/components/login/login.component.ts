import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  emailControl = new FormControl('', [Validators.required, Validators.email]);

  hide = true;

  email: string;
  password: string;

  constructor(
    private router: Router,
    private auth: AuthService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {}

  getErrorMessage() {
    return this.emailControl.hasError('required')
      ? 'You must enter a value'
      : this.emailControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  handleEmail(event: any) {
    this.email = event.target.value;
  }

  handlePassword(event: any) {
    this.password = event.target.value;
  }

  async login() {
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
