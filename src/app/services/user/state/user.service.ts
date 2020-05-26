import { Injectable } from '@angular/core';
import { UserStore, UserState } from './user.store';
import { CollectionConfig, CollectionService } from 'akita-ng-fire';
import { toUserJS, makeUser, UserJSON } from './user.model';
import { generateImageUrlFromPath } from '../../../util/generate-image-url';
import { PlaylistService } from '../../playlist/state/playlist.service';
import { makePlaylist } from '../../playlist/state/playlist.model';

@Injectable({ providedIn: 'root' })
@CollectionConfig({ path: 'users', idKey: 'id' })
export class UserService extends CollectionService<UserState> {
  constructor(store: UserStore, private playlistService: PlaylistService) {
    super(store);
  }

  async addUser(id: string, email: string, name: string): Promise<any> {
    const defaultAvatar = await generateImageUrlFromPath('assets/account.png');
    const defaultPlaylist = await this.playlistService.addPlaylist(
      makePlaylist({
        ownerRef: id,
        name: 'Watch later',
      })
    );
    const userJS = toUserJS(
      makeUser({
        id,
        email,
        name,
        avatar: defaultAvatar as string,
        defaultPlaylist: defaultPlaylist.id,
      })
    );
    return this.add(userJS);
  }

  updateUser(id: string, props: Partial<UserJSON>): any {
    this.store.update(id, props);
    return this.update({ ...props, id: id });
  }
}
