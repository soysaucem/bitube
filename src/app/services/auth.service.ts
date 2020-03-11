import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private firebaseAuth: AngularFireAuth) {}

  async login(email: string, password: string) {
    return await this.firebaseAuth.auth.signInWithEmailAndPassword(
      email,
      password
    );
  }

  async logout() {
    return await this.firebaseAuth.auth.signOut();
  }

  async isAuthenticated() {
    const state = await this.firebaseAuth.authState.pipe(take(1)).toPromise();

    return state ? true : false;
  }
}
