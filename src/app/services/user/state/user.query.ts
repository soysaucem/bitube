import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { UserStore, UserState } from './user.store';
import { map, filter, take, switchMap, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { fromUserJS, UserJSON, User } from './user.model';
import { UserService } from './user.service';
import { Observable, combineLatest } from 'rxjs';

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

      this.store.add(doc.data() as UserJSON);
    }

    return fromUserJS(this.getEntity(id) as UserJSON);
  }

  async isUserExisted(email: string) {
    const refs = await this.collection.ref.where('email', '==', email).get();

    return refs.docs[0]?.data()
      ? fromUserJS(refs.docs[0].data() as UserJSON)
      : null;
  }

  selectMyAccount(): Observable<User> {
    return this.selectMyFirebaseAccount().pipe(
      switchMap((firebaseUser) => this.selectUser(firebaseUser.uid))
    );
  }

  selectUser(id: string): Observable<User> {
    return this.userService.syncDoc({ id }).pipe(
      filter((user) => user !== null && user !== undefined),
      map((user) => fromUserJS(user as UserJSON))
    );
  }
}
