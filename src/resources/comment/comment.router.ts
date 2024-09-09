import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchErrors from '../../common/catchErrors';
import Order from './comment.model';
import { createOrder, deleteById, getAll, getById, updateById } from './comment.service';
import { OrderDTO } from './comment.types';

const router = Router();

router.route('/').get(
  catchErrors(async (_req: Request, res: Response) => {
    const orders = await getAll();
    res.json(orders.map(Order.toResponse));
  })
);

router.route('/').post(
  catchErrors(async (req: Request, res: Response) => {
    const {  createdAt } = req.body;
    const { id, text, user, post }: OrderDTO = req.body;

    if (!text) {
      res.status(StatusCodes.BAD_REQUEST).json({ code: 'BAD_REQUEST', msg: 'Invalid request data' });
      return;
    }

    const order = await createOrder({id, text, createdAt, user, post});

    if (order) {
      res.status(StatusCodes.CREATED).json(Order.toResponse(order));
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ code: 'INTERNAL_SERVER_ERROR', msg: 'Failed to create order' });
    }
  })
);

router.route('/:id').get(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      res.status(StatusCodes.BAD_REQUEST).json({ code: 'BAD_REQUEST', msg: 'Invalid ID' });
      return;
    }
    const order = await getById(id);

    if (order) {
      res.json(Order.toResponse(order));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'ORDER_NOT_FOUND', msg: 'Order not found' });
    }
  })
);

router.route('/:id').put(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      res.status(StatusCodes.BAD_REQUEST).json({ code: 'BAD_REQUEST', msg: 'Invalid ID' });
      return;
    }
    const { text, createdAt, user, post }: OrderDTO = req.body;

    if (!text || !createdAt || !post) {
      res.status(StatusCodes.BAD_REQUEST).json({ code: 'BAD_REQUEST', msg: 'Invalid request data' });
      return;
    }

    const order = await updateById({id, text, createdAt, user, post});

    if (order) {
      res.status(StatusCodes.OK).json(Order.toResponse(order));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'ORDER_NOT_FOUND', msg: 'Order not found' });
    }
  })
);

router.route('/:id').delete(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      res.status(StatusCodes.BAD_REQUEST).json({ code: 'BAD_REQUEST', msg: 'Invalid ID' });
      return;
    }
    const order = await deleteById(id);

    if (order) {
      res
        .status(StatusCodes.NO_CONTENT)
        .json({ code: 'ORDER_DELETED', msg: 'The order has been deleted' });
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'ORDER_NOT_FOUND', msg: 'Order not found' });
    }
  })
);

export default router;

