import { v4 } from 'uuid';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  followers: number;
  followings: string[];
  defaultPlaylist: string;
}

function createDefault(): User {
  return Object.freeze({
    id: v4(),
    email: null,
    name: null,
    avatar: null,
    followers: 0,
    followings: [],
    defaultPlaylist: null,
  });
}

export function createUser(props: Partial<User>): User {
  return Object.freeze({
    ...createDefault(),
    ...props,
  });
}
