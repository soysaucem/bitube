import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { take } from 'rxjs/operators';
import { makeUser, toJS } from './user/state/user.model';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  path = '/users';

  constructor(
    private firebaseStore: AngularFirestore,
    private firebaseAuth: AngularFireAuth
  ) {}

  private async createUser(id: string, email: string, name: string) {
    const userJS = toJS(makeUser({ id, email, name }));
    return await this.firebaseStore.collection('users').add(userJS);
  }

  async signup(email: string, password: string, name: string) {
    // Create user in user pool
    const res = await this.firebaseAuth.auth.createUserWithEmailAndPassword(
      email,
      password
    );

    // Send verification link to user email
    const user = await this.firebaseAuth.user.pipe(take(1)).toPromise();
    user.sendEmailVerification();

    // Create user entity in database
    return await this.createUser(res.user.uid, res.user.email, name);
  }
}
