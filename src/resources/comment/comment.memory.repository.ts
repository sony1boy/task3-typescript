import Order from './comment.model';
import { OrderDTO } from './comment.types';

const Orders: Order[] = [new Order()];

const getAll = async (): Promise<Order[]> => Orders;

const getById = async (id: string): Promise<Order | undefined> =>
  Orders.find((order) => order.id === id);

const createOrder = async ({id, text, createdAt, user, post}: OrderDTO): Promise<Order> => 
  {const order = new Order({id, text, createdAt, user, post});
  Orders.push(order);
  return order;
};

const deleteById = async (id: string): Promise<Order | undefined> => {
  const OrderPosition = Orders.findIndex((order) => order.id === id);

  if (OrderPosition === -1) return undefined;

  const orderDeletable = Orders[OrderPosition];

  Orders.splice(OrderPosition, 1);
  return orderDeletable;
};

const updateById = async ({id, text, createdAt, user, post}: OrderDTO): Promise<Order | null> => 
  {  const OrderPosition = Orders.findIndex((order) => order.id === id);

  if (OrderPosition === -1) return null;

  const oldOrder = Orders[OrderPosition];
  const newOrder = new Order({
    ...oldOrder, text, createdAt, user, post
  });

  Orders.splice(OrderPosition, 1, newOrder);
  return newOrder;
};

const removeClientById = async (id: string): Promise<void> => {
  const clientOrders = Orders.filter((order) => order.createdAt === id);
  
  await Promise.allSettled(
    clientOrders.map(async (order) =>
      updateById({ id: order.id, createdAt: null } as unknown as OrderDTO)
    )
  );
};

const deleteByProductId = async (productsId: string): Promise<void> => {
  const productOrders = Orders.filter((order) => order.post === productsId);
  
  await Promise.allSettled(productOrders.map(async (order) => deleteById(order.id)));
};

export {
  createOrder,
  deleteById,
  deleteByProductId,
  getAll,
  getById, Orders, removeClientById,
  updateById
};

