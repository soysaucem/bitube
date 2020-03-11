import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { take } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { fromJS, UserJSON } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private firebaseAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  async getMyAccount() {
    const googleAuthAccount = await this.firebaseAuth.authState
      .pipe(take(1))
      .toPromise();
    const docs = await this.firestore
      .collection<UserJSON>('users')
      .ref.where('email', '==', googleAuthAccount.email)
      .get();
    const me = docs.docs[0].data();
    return fromJS(me as any);
  }
}
