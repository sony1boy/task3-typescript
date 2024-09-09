import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchErrors from '../../common/catchErrors';
import Client, { ClientProps } from './users.model';
import { createClient, deleteById, getAll, getById, updateById } from './users.service';

const router = Router();

router.route('/').get(
  catchErrors(async (_req: Request, res: Response) => {
    const clients = await getAll();
    res.json(clients.map(Client.toResponse));
  })
);

router.route('/').post(
  catchErrors(async (req: Request, res: Response) => {
    const { id, email, name, password, salt, posts, comments }: ClientProps = req.body;
    const client = await createClient({ id, email, name, password, salt, posts, comments });

    if (client) {
      return res.status(StatusCodes.CREATED).json(Client.toResponse(client));
    } 
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: 'CLIENT_NOT_CREATE', msg: 'Client not create' });
    
  })
);

router.route('/:id').get(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: 'CLIENT_ID_REQUIRED', msg: 'Client ID is required' });
    }

    const client = await getById(id);

    if (client) {
      return res.json(Client.toResponse(client));
    } 
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'CLIENT_NOT_FOUND', msg: 'Client not found' });
    
  })
);

router.route('/:id').put(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, name, password, salt, posts, comments }: ClientProps = req.body;

    if (!id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: 'CLIENT_ID_REQUIRED', msg: 'Client ID is required' });
    }

    const client = await updateById({ id, email, name, password, salt, posts, comments });

    if (client) {
      return res.status(StatusCodes.OK).json(Client.toResponse(client));
    } 
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'CLIENT_NOT_FOUND', msg: 'Client not found' });
    
  })
);

router.route('/:id').delete(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: 'CLIENT_ID_REQUIRED', msg: 'Client ID is required' });
    }

    const client = await deleteById(id);

    if (!client) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'CLIENT_NOT_FOUND', msg: 'Client not found' });
    }

    return res
      .status(StatusCodes.NO_CONTENT)
      .json({ code: 'CLIENT_DELETED', msg: 'The client has been deleted' });
  })
);

export default router;
