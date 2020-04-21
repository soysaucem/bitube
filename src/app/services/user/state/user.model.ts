import { List } from 'immutable';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  followers: number;
  followings: List<string>;
  videos: List<string>;
}

export interface UserJSON {
  id: string;
  email: string;
  name: string;
  avatar: string;
  followers: number;
  followings: string[];
  videos: string[];
}

export function createDefault(): User {
  return Object.freeze({
    id: null,
    email: null,
    name: null,
    avatar: null,
    followers: 0,
    followings: List(),
    videos: List(),
  });
}

export function makeUser(props: Partial<User>): User {
  return Object.freeze({
    ...createDefault(),
    ...props,
  });
}

export function fromUserJS(input: UserJSON): User {
  return Object.freeze({
    ...input,
    followings: List(input.followings),
    videos: List(input.videos),
  });
}

export function toUserJS(input: User): UserJSON {
  return Object.freeze({
    ...input,
    followings: input.followings.toArray(),
    videos: input.videos.toArray(),
  });
}
