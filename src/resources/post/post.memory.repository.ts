import Product from './post.model';

const Products: Product[] = [new Product()];

const getAll = async (): Promise<Product[]> => Products;

const getById = async (id: string): Promise<Product | undefined> =>
  Products.find((product) => product.id === id);

const createProduct = async ({id, title, text, createdAt, sers, comments}: Product): Promise<Product> => 
  {const product = new Product({ id, title, text, createdAt, sers, comments });
  Products.push(product);
  return product;
};

const deleteById = async (id: string): Promise<Product | undefined> => {
  const productPosition = Products.findIndex((product) => product.id === id);

  if (productPosition === -1) return undefined;

  const productDeletable = Products[productPosition];

  Products.splice(productPosition, 1);
  return productDeletable;
};

const updateById = async ({id, title, text, createdAt, sers, comments}: Product): Promise<Product | null> => 
  { const productPosition = Products.findIndex((product) => product.id === id);

  if (productPosition === -1) return null;

  const oldProduct = Products[productPosition];
  const newProduct = new Product({
    ...oldProduct, title, text, createdAt, sers, comments
  });

  Products.splice(productPosition, 1, newProduct);
  return newProduct;
};

export { Products, createProduct, deleteById, getAll, getById, updateById };

