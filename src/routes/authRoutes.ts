import express from 'express';

import { authUser } from '../controllers/authController';

const authRouter = express.Router();

authRouter.post('/login', authUser);

export { authRouter };
