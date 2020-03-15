import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  email: string;

  constructor(
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {}

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

  async reset() {
    await this.authService.resetPassword(this.email);
    this.snackbar.open(
      'A reset password link has been sent to your email',
      'Dismiss',
      { duration: 3000, horizontalPosition: 'left' }
    );
  }
}
