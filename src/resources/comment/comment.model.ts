import { v4 as uuid } from 'uuid';
import { OrderDTO, OrderResponse } from './comment.types';

export default class Order {
  id: string;

  post: string;

  createdAt: string;

  text: string;

  user: string;

  constructor({
    id = uuid(),
    text = 'text',
    createdAt = 'createdAt',
    user = 'user',
    post = 'post'
  }: Partial<OrderDTO> = {}) {
    this.id = id;
    this.text = text;
    this.createdAt = createdAt;
    this.user = user;
    this.post = post;
  }

  static toResponse(order: Order): OrderResponse {
    const { id, text, createdAt, user, post } = order;
    return { id, text, createdAt, user, post };
  }
}
