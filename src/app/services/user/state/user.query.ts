import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { UserStore, UserState } from './user.store';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { fromJS, UserJSON, User } from './user.model';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class UserQuery extends QueryEntity<UserState> {
  private collection = this.firestore.collection('users');

  constructor(
    protected store: UserStore,
    private firebaseAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private userService: UserService
  ) {
    super(store);
  }

  getMyFirebaseAccount(): firebase.User {
    return this.firebaseAuth.auth.currentUser;
  }

  async getMyAccount(): Promise<User> {
    const googleAuthAccount = this.getMyFirebaseAccount();
    return googleAuthAccount ? this.getUser(googleAuthAccount.uid) : null;
  }

  async getUser(id: string): Promise<User> {
    if (!this.hasEntity(id)) {
      const doc = await this.collection.doc(id).ref.get();

      this.store.add(fromJS(doc.data() as UserJSON));
    }

    return this.getEntity(id) as User;
  }

  selectMyAccount() {
    const googleAuthAccount = this.firebaseAuth.auth.currentUser;

    return this.userService
      .syncDoc({ id: googleAuthAccount.uid })
      .pipe(map((me) => fromJS(me as UserJSON)));
  }
}
