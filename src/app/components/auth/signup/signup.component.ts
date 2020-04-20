import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from '../../../services/signup.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserQuery } from '../../../services/user/state/user.query';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  hide = true;
  password: string;

  private email: string;
  private name: string;

  private emailValid = false;
  private passwordValid = false;
  private passwordConfirmValid = false;
  private nameValid = false;

  constructor(
    private router: Router,
    private signupService: SignupService,
    private snackbar: MatSnackBar,
    private userQuery: UserQuery,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Sign up');
  }

  handleEmail(event: string) {
    this.email = event;
  }

  handlePassword(event: string) {
    this.password = event;
  }

  handleName(event: string) {
    this.name = event;
  }

  handleEmailValid(event: boolean) {
    this.emailValid = event;
  }

  handlePasswordValid(event: boolean) {
    this.passwordValid = event;
  }

  handleNameValid(event: boolean) {
    this.nameValid = event;
  }

  handlePasswordConfirmValid(event: boolean) {
    this.passwordConfirmValid = event;
  }

  async sigup() {
    const isEmailExisted = await this.userQuery.isUserExisted(this.email);

    if (isEmailExisted) {
      this.snackbar.open(
        'Email is existed. Please choose another email!',
        'Dismiss',
        { duration: 3000, horizontalPosition: 'left' }
      );
      return;
    }

    await this.signupService.signup(this.email, this.password, this.name);
    this.router.navigate(['']);
  }

  get disabled() {
    return !(
      this.emailValid &&
      this.passwordValid &&
      this.passwordConfirmValid &&
      this.nameValid
    );
  }
}
