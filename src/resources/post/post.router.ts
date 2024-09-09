import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchErrors from '../../common/catchErrors';
import Product from './post.model';
import {createProduct,deleteById,getAll,getById,updateById} from './post.service';

const router = Router({ mergeParams: true });

router.route('/').get(
  catchErrors(async (_req: Request, res: Response) => {
    const products = await getAll();
    res.json(products.map(Product.toResponse));
  })
);

router.route('/').post(
  catchErrors(async (req: Request, res: Response) => {
    const {  id, title, text, createdAt, sers, comments } = req.body as Product;
    const product = await createProduct({
      id,
      title,
      text,
      comments,
      createdAt: createdAt!,
      sers: sers!,
    });

    if (product) {
      res.status(StatusCodes.CREATED).json(Product.toResponse(product));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: 'BAD_REQUEST', msg: 'Bad request' });
    }
  })
);

router.route('/:id').get(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await getById(id as string); // Assert id is a string
    if (product) {
      res.json(Product.toResponse(product));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'PRODUCT_NOT_FOUND', msg: 'Product not found' });
    }
  })
);

router.route('/:id').put(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, text, createdAt, sers, comments } = req.body as Product;
    const product = await updateById({
      id: id as string, // Assert id is a string
      title,
      text,
      comments,
      createdAt,
      sers,
    });
    if (product) {
      res.status(StatusCodes.OK).json(Product.toResponse(product));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'PRODUCT_NOT_FOUND', msg: 'Product not found' });
    }
  })
);

router.route('/:id').delete(
  catchErrors(async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await deleteById(id as string); // Assert id is a string
    if (product) {
      res
        .status(StatusCodes.NO_CONTENT)
        .json({ code: 'PRODUCT_DELETED', msg: 'The product has been deleted' });
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'PRODUCT_NOT_FOUND', msg: 'Product not found' });
    }
  })
);

export default router;
