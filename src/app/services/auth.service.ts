import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { take } from 'rxjs/operators';
import { UserQuery } from './user/state/user.query';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private firebaseAuth: AngularFireAuth,
    private userQuery: UserQuery,
    private router: Router
  ) {}

  login(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  async logout(): Promise<boolean> {
    await this.firebaseAuth.auth.signOut();
    return this.router.navigate(['login']);
  }

  async isAuthenticated(): Promise<boolean> {
    const state = await this.firebaseAuth.authState.pipe(take(1)).toPromise();

    return state ? true : false;
  }

  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    const currentUser = this.userQuery.getMyFirebaseAccount();
    const credential = firebase.auth.EmailAuthProvider.credential(
      currentUser.email,
      currentPassword
    );

    try {
      await currentUser.reauthenticateWithCredential(credential);
      await currentUser.updatePassword(newPassword);
      await this.logout();
    } catch (err) {
      console.error('Failed to change user password!');
      console.error(err);
    }
  }

  resetPassword(email: string): Promise<void> {
    return this.firebaseAuth.auth.sendPasswordResetEmail(email);
  }
}
