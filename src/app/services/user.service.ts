import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { fromJS, UserJSON, User } from './user/state/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private firebaseAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  async getMyAccount(): Promise<User> {
    const googleAuthAccount = await this.firebaseAuth.authState
      .pipe(take(1))
      .toPromise();
    return googleAuthAccount ? this.getUser(googleAuthAccount.uid) : null;
  }

  async getUser(id: String): Promise<User> {
    const docs = await this.firestore
      .collection<UserJSON>('users')
      .ref.where('id', '==', id)
      .get();
    const user = docs?.docs[0]?.data();
    return user ? fromJS(user as any) : null;
  }
}
