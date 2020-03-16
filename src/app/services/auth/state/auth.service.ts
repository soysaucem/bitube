import { Injectable } from '@angular/core';
import { AuthStore, AuthState } from './auth.store';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'auths' })
export class AuthService extends CollectionService<AuthState> {

  constructor(store: AuthStore) {
    super(store);
  }

}
