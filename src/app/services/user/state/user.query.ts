import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { UserStore, UserState } from './user.store';
import { take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { fromJS, UserJSON, User } from './user.model';

@Injectable({ providedIn: 'root' })
export class UserQuery extends QueryEntity<UserState> {
  private collection = this.firestore.collection('users');

  constructor(
    protected store: UserStore,
    private firebaseAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    super(store);
  }

  async getMyAccount(): Promise<User> {
    const googleAuthAccount = this.firebaseAuth.auth.currentUser;
    return googleAuthAccount ? this.getUser(googleAuthAccount.uid) : null;
  }

  async getUser(id: string): Promise<User> {
    if (!this.hasEntity(id)) {
      const doc = await this.collection.doc(id).ref.get();

      this.store.add(fromJS(doc.data() as UserJSON));
    }

    return this.getEntity(id) as User;
  }
}
