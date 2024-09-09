import Client from './users.model';

const Clients: Client[] = [
  new Client({ email: 'sadasdad', name: 'User', password: 'awdad', salt: 'salt', posts: 'posts', comments: 'comments' }),
];

const getAll = async (): Promise<Client[]> => Clients;

const getById = async (id: string): Promise<Client | null> => {
  const foundClient = Clients.find((client) => client.id === id);
  return foundClient || null;
};

const createClient = async ({ email, name, password, salt, posts, comments }: Omit<Client, 'id'>): Promise<Client> => {
  const newClient = new Client({ email, name, password, salt, posts, comments });
  Clients.push(newClient);
  return newClient;
};

const deleteById = async (id: string): Promise<Client | undefined> => {
  const clientPosition = Clients.findIndex((client) => client.id === id);

  if (clientPosition === -1) return undefined;

  const clientDeletable = Clients[clientPosition];
  Clients.splice(clientPosition, 1);
  return clientDeletable;
};

const updateById = async ({ id, email, name, password, salt, posts, comments }: Client): Promise<Client | null> => {
  const clientPosition = Clients.findIndex((client) => client.id === id);

  if (clientPosition === -1) return null;

  const oldClient = Clients[clientPosition];
  const updatedClient = { ...oldClient, email, name, password, salt, posts, comments};

  Clients.splice(clientPosition, 1, updatedClient as Client);
  return updatedClient as Client;
};

export {
  Clients, createClient,
  deleteById, getAll,
  getById, updateById
};

