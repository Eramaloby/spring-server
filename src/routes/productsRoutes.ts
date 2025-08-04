import express from 'express';

import { productsController } from '../controllers/productsController';

const productsRouter = express.Router();

productsRouter.get('/products', productsController.getProducts);

export { productsRouter };
