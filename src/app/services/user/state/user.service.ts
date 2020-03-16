import { Injectable } from '@angular/core';
import { UserStore, UserState } from './user.store';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'users' })
export class UserService extends CollectionService<UserState> {

  constructor(store: UserStore) {
    super(store);
  }

}
