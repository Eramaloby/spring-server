import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { SignUpRequestBody } from '../types/signup.types';
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

export { userRouter };
