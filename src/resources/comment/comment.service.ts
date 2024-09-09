import {
    createOrder as createOrderInRepo,
    deleteById as deleteOrderById,
    getAll as getOrderAll,
    getById as getOrderById,
    updateById as updateOrderById,
  } from './comment.memory.repository';
  import Order from './comment.model';
  import { OrderDTO } from './comment.types';
  
  const getAll = (): Promise<Order[]> => getOrderAll();
  const getById = (id: string): Promise<Order | undefined> => getOrderById(id);
  const createOrder = ({id, text, createdAt, user, post}: OrderDTO): Promise<Order> =>
    createOrderInRepo({id, text, createdAt, user, post});
  const deleteById = async (id: string): Promise<Order | undefined > => {
    const orderDeletable = await getById(id);
    if (orderDeletable) await deleteOrderById(id);
    return orderDeletable;
  };
  const updateById = ({id, text, createdAt, user, post}: OrderDTO): Promise<Order | null> =>
    updateOrderById({id, text, createdAt, user, post});
  
  export { createOrder, deleteById, getAll, getById, updateById };
  
  