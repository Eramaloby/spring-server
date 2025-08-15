import express from 'express';

import { userRouter } from './userRoutes';
import { logRouter } from './logRoutes';
import { productsRouter } from './productsRoutes';
import accessTokenValidator from '../middlewares/accessTokenValidator';

const apiRouter = express.Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/log', logRouter);
apiRouter.use('/products', accessTokenValidator, productsRouter);

export { apiRouter };
