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

  async isUserExisted(email: string): Promise<boolean> {
    const refs = await this.collection.ref.where('email', '==', email).get();

    return refs.docs[0]?.data() ? true : false;
  }

  selectMyAccount(): Observable<User> {
    return this.selectMyFirebaseAccount().pipe(
      switchMap((firebaseUser) =>
        firebaseUser
          ? this.userService.syncUser(firebaseUser.uid)
          : (of(null) as Observable<User>)
      )
    );
  }
}
