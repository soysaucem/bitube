import { List } from 'immutable';

export interface User {
  id: string;
  email: string;
  name: string;
  followers: List<string>;
  videos: List<string>;
}

export interface UserJSON {
  id: string;
  email: string;
  name: string;
  followers: string[];
  videos: string[];
}

export function createDefault(): User {
  return Object.freeze({
    id: null,
    email: null,
    name: null,
    followers: List(),
    videos: List(),
  });
}

export function makeUser(props: Partial<User>): User {
  return Object.freeze({
    ...createDefault(),
    ...props,
  });
}

export function fromJS(input: UserJSON): User {
  return Object.freeze({
    ...input,
    followers: List(input.followers),
    videos: List(input.videos),
  });
}

export function toJS(input: User): UserJSON {
  return Object.freeze({
    ...input,
    followers: input.followers.toArray(),
    videos: input.videos.toArray(),
  });
}
