import express from 'express';

import { userRouter } from './userRoutes';
import { logRouter } from './logRoutes';
import { productsRouter } from './productsRoutes';

const apiRouter = express.Router();

apiRouter.use('/', userRouter);
apiRouter.use('/', logRouter);
apiRouter.use('/', productsRouter);

export { apiRouter };
