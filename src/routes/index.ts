import express from 'express';

import { authRouter } from './authRoutes';
import { logRouter } from './logRoutes';
import { productsRouter } from './productsRoutes';

const apiRouter = express.Router();

apiRouter.use('/', authRouter);
apiRouter.use('/', logRouter);
apiRouter.use('/', productsRouter);

export { apiRouter };
