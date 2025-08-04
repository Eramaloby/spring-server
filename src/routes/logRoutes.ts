import express from 'express';

import { logController } from '../controllers/logController';

const logRouter = express.Router();

logRouter.post('/log', logController.acceptLog);

export { logRouter };
