import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { User, makeUser, toJS } from '../models/user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';

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
