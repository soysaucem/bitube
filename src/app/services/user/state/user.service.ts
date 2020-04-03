import { Injectable } from '@angular/core';
import { UserStore, UserState } from './user.store';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { toJS, makeUser } from './user.model';
import { generateImageUrlFromPath } from '../../../util/generate-image-url';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'users', idKey: 'id' })
export class UserService extends CollectionService<UserState> {
  constructor(store: UserStore) {
    super(store);
  }

  async addUser(id: string, email: string, name: string): Promise<any> {
    const defaultAvatar = await generateImageUrlFromPath('assets/account.png');
    const userJS = toJS(
      makeUser({ id, email, name, avatar: defaultAvatar as string })
    );
    return this.add(userJS);
  }
}
