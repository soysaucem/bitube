import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from '../../../services/signup.service';

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

  constructor(private router: Router, private signupService: SignupService) {}

  ngOnInit() {}

  handleEmail(event: string) {
    this.email = event;
  }

  handlePassword(event: string) {
    this.password = event;
  }

  handleName(event: string) {
    console.log(event);
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
