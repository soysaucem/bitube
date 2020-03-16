import { Injectable } from '@angular/core';
import { User, UserJSON } from './user.model';
import {
  EntityState,
  ActiveState,
  EntityStore,
  StoreConfig,
} from '@datorama/akita';

export interface UserState
  extends EntityState<User | UserJSON, string>,
    ActiveState<string> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user' })
export class UserStore extends EntityStore<UserState> {
  constructor() {
    super();
  }
}
