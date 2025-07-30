import express from 'express';

import { authRouter } from './authRoutes';
import { logRouter } from './logRoutes';
import { productsRouter } from './productsRoutes';

const apiRouter = express.Router();

apiRouter.use('/api', authRouter);
apiRouter.use('/api', logRouter);
apiRouter.use('/api', productsRouter);

export { apiRouter };
