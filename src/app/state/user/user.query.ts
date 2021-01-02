import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { QueryEntity } from '@datorama/akita';
import { Observable, of } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { User } from '../../models';
import { UserService } from './user.service';
import { UserState, UserStore } from './user.store';

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

  getMyFirebaseAccount(): Promise<firebase.User> {
    return this.firebaseAuth.authState.pipe(take(1)).toPromise();
  }

  selectMyFirebaseAccount(): Observable<firebase.User> {
    return this.firebaseAuth.authState;
  }

  async getMyAccount(): Promise<User> {
    const firebaseUser = await this.getMyFirebaseAccount();
    return firebaseUser ? this.getUser(firebaseUser.uid) : null;
  }

  async getUser(id: string): Promise<User> {
    if (!this.hasEntity(id)) {
      const doc = await this.collection.doc(id).ref.get();

      this.store.add(doc.data() as User);
    }

    return this.getEntity(id);
  }

  async isUserExisted(email: string): Promise<boolean> {
    const refs = await this.collection.ref.where('email', '==', email).get();

    return refs.docs[0]?.data() ? true : false;
  }

  selectMyAccount(): Observable<User> {
    return this.selectMyFirebaseAccount().pipe(
      switchMap((firebaseUser) =>
        firebaseUser
          ? this.selectUser(firebaseUser.uid)
          : (of(null) as Observable<User>)
      )
    );
  }

  selectUser(id: string): Observable<User> {
    return this.userService
      .syncDoc({ id })
      .pipe(filter((user) => user !== null && user !== undefined));
  }
}
