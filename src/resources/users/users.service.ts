import { removeClientById } from '../comment/comment.memory.repository';
import { createClient as createClientInRepo, deleteById as deleteClientById, getAll as getClientAll, getById as getClientById, updateById as updateClientById } from './users.memory.repository';
import { ClientProps } from './users.model';

const getAll = () => getClientAll();
const getById = (id: string) => getClientById(id);
const createClient = ({ email, name, password, salt, posts, comments }: ClientProps) => {
  if (!name || !email || !password || !salt || !posts || !comments) {
    throw Error('All fields are required and must be strings.');
  }
  return createClientInRepo({ email, name, password, salt, posts, comments });
};

const deleteById = async (id: string) => {
  const clientDeletable = await getById(id);
  if (!clientDeletable) return null;
  await deleteClientById(id);
  await removeClientById(id); // Use removeClientById from OrderRepository
  return clientDeletable;
};

const updateById = ({ id, email, name, password, salt, posts, comments }: ClientProps) => {
  if (!id || !name || !email || !password || !salt || !posts || !comments) {
    throw new Error('All fields are required and must be strings.');
  }
  return updateClientById({ id, email, name, password, salt, posts, comments });
};

export { createClient, deleteById, getAll, getById, updateById };

