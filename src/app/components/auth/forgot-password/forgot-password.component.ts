import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  email: string;

  constructor(
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  handleEmail(event: any) {
    this.email = event;
  }

  async reset() {
    if (!this.email) {
      return;
    }

    await this.authService.resetPassword(this.email);
    this.snackbar.open(
      'A reset password link has been sent to your email',
      'Dismiss',
      { duration: 3000, horizontalPosition: 'left' }
    );
  }
}
