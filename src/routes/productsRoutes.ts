import express from 'express';

import { productsController } from '../controllers/productsController';
import accessTokenValidator from '../middlewares/accessTokenValidator';

const productsRouter = express.Router();

productsRouter.get('/products', accessTokenValidator, productsController.getProducts);

export { productsRouter };
