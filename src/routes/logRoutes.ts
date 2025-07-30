import express from 'express';

import { acceptLog } from '../controllers/logController';

const logRouter = express.Router();

logRouter.post('/log', acceptLog);

export { logRouter };
