import express from 'express';
import {
  validateUserRegistration,
  handleValidationErrors,
} from '../validation/userRegistrationValidation';

import { userController } from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/login', userController.authUser);
userRouter.post(
  '/signup',
  validateUserRegistration,
  handleValidationErrors,
  userController.signUpUser
);
userRouter.get('/refresh', userController.refresh);

export { userRouter };
