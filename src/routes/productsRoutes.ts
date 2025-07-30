import express from 'express';

import { getProducts } from '../controllers/productsController';

const productsRouter = express.Router();

productsRouter.get('/products', getProducts);

export { productsRouter };
