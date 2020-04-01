import { Injectable } from '@angular/core';
import { UserStore, UserState } from './user.store';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { toJS, makeUser } from './user.model';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'users', idKey: 'id' })
export class UserService extends CollectionService<UserState> {
  constructor(store: UserStore) {
    super(store);
  }

  addUser(id: string, email: string, name: string): Promise<any> {
    const userJS = toJS(makeUser({ id, email, name }));
    return this.add(userJS);
  }
}
