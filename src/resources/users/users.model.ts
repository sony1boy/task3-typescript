import { v4 as uuid } from 'uuid';

export interface ClientProps {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  salt?: string;
  posts?: string;
  comments?: string;
}

export default class Client {
  id: string;

  name: string;

  email: string;

  password: string;

  salt: string;

  posts: string;

  comments: string;

  constructor({
    id = uuid(),
    email = 'sadasdas',
    name = 'CLIENT', 
    password = 'asdasdasd',
    salt = 'salt',
    posts = 'posts',
    comments = 'comments'
  }: ClientProps = {}) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.password = password;
    this.salt = salt;
    this.posts = posts;
    this.comments = comments;
  }

  static toResponse(client: Client) {
    const { id, email, name, password, salt, posts, comments } = client;
    return { id, email, name, password, salt, posts, comments };
  }
}
