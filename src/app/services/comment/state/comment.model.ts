export interface Comment {
  id: string;
  owner: string;
  video: string;
  content: string;
}

export interface CommentJSON {
  id: string;
  owner: string;
  video: string;
  content: string;
}

export function createDefault(): Comment {
  return Object.freeze({
    id: null,
    owner: null,
    video: null,
    content: null,
  });
}

export function makeComment(props: Partial<Comment>): Comment {
  return Object.freeze({
    ...createDefault(),
    ...props,
  });
}

export function fromJS(input: CommentJSON) {
  return Object.freeze({
    ...input,
  });
}

export function toJS(input: Comment) {
  return Object.freeze({
    ...input,
  });
}
