import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Title } from '@angular/platform-browser';
import * as firebase from 'firebase';

declare const recaptchaVerifier: any;

declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  rememberMe: boolean = false;

  recaptchaVerified: boolean = false;
  recaptchaToken: string;

  constructor(
    private router: Router,
    private auth: AuthService,
    private snackbar: MatSnackBar,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Login');
    this.renderCaptcha();
  }

  handleEmail(event: string) {
    this.email = event;
  }

  handlePassword(event: string) {
    this.password = event;
  }

  async login() {
    if (!this.email || !this.password) {
      this.showSnackBarWith('Please enter your email and password!');
      return;
    }

    if (!this.recaptchaVerified) {
      this.showSnackBarWith('Please verify the recaptcha!');
      return;
    }

    try {
      await this.auth.login(this.email, this.password, this.rememberMe);

      this.router.navigate(['']);
    } catch (error) {
      this.showSnackBarWith(
        'Unable to login. Please check your email and password!'
      );
    }
  }

  renderCaptcha() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha',
      {
        'callback': (response: any) => {
          this.recaptchaToken = response;
          this.recaptchaVerified = true;
        },
        'expired-callback': () => {
          this.recaptchaVerified = false;
        },
      }
    );
    window.recaptchaVerifier.render();
  }

  showSnackBarWith(message: string) {
    this.snackbar.open(message, 'Dismiss', {
      duration: 3000,
      horizontalPosition: 'left',
    });
  }
}
