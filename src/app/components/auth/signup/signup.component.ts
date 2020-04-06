import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../../../services/signup.service';
import { checkPassword } from '../../../util/password-validation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  hide = true;

  email: string;
  password: string;
  name: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private signupService: SignupService
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group(
      {
        nameControl: ['', [Validators.required]],
        emailControl: ['', [Validators.required, Validators.email]],
        passwordControl: ['', [Validators.required]],
        passwordConfirmationControl: ['', [Validators.required]],
      },
      { validator: checkPassword }
    );
  }

  handleEmail(event: any) {
    this.email = event.target.value;
  }

  handlePassword(event: any) {
    this.password = event.target.value;
  }

  handleName(event: any) {
    this.name = event.target.value;
  }

  async sigup() {
    await this.signupService.signup(this.email, this.password, this.name);
    this.router.navigate(['']);
  }

  get nameControl() {
    return this.signupForm.get('nameControl');
  }

  get emailControl() {
    return this.signupForm.get('emailControl');
  }

  get passwordControl() {
    return this.signupForm.get('passwordControl');
  }

  get passwordConfirmationControl() {
    return this.signupForm.get('passwordConfirmationControl');
  }

  getEmailErrorMessage() {
    return this.emailControl.errors.required
      ? 'You must enter an email'
      : this.emailControl.errors.email
      ? 'Not a valid email'
      : '';
  }

  get disabled() {
    return this.signupForm.invalid ? true : false;
  }
}
