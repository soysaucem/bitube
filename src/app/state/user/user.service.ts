import { Injectable } from '@angular/core';
import { UserStore, UserState } from './user.store';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { generateImageUrlFromPath } from '../../util/generate-image-url';
import { PlaylistService } from '../playlist/playlist.service';
import { createPlaylist, createUser, User } from '../../models';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'users', idKey: 'id' })
export class UserService extends CollectionService<UserState> {
  constructor(store: UserStore, private playlistService: PlaylistService) {
    super(store);
  }

  async addUser(id: string, email: string, name: string): Promise<string> {
    const defaultAvatar = await generateImageUrlFromPath('assets/account.png');
    const defaultPlaylist = await this.playlistService.addPlaylist(
      createPlaylist({
        ownerRef: id,
        name: 'Watch later',
      })
    );
    const user = createUser({
      id,
      email,
      name,
      avatar: defaultAvatar as string,
      defaultPlaylist: defaultPlaylist,
    });

    return this.add(user);
  }

  updateUser(id: string, props: Partial<User>): Promise<void> {
    return this.update(id, { ...props });
  }
}
