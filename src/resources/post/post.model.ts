import { v4 as uuid } from 'uuid';

interface ProductProps {
  id?: string;
  title?: string;
  text?: string;
  createdAt?: string;
  sers?: string;
  comments?: string;
}

class Product {
  id: string;

  title: string;

  text: string;

  createdAt: string;

  sers: string;

  comments: string;

  constructor({
    id = uuid(),
    title = 'title',
    text = 'text',
    createdAt = 'createdAt',
    sers = 'sers',
    comments = 'comments',
  }: ProductProps = {}) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.createdAt = createdAt;
    this.sers = sers;
    this.comments = comments;
  }

  static toResponse(product: Product): ProductProps {
    const { id, title, text, createdAt, sers, comments } = product;
    return { id, title, text, createdAt, sers, comments };
  }
}

export default Product;
