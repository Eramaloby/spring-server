import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import type { SignUpRequestBody } from '../types/signup.types';

export const validateUserRegistration = [
  body('username').isLength({ min: 3 }).withMessage('Username must have 3+ symbols.'),

  body('firstName').isLength({ min: 3 }).withMessage('First name must have 3+ symbols.'),
  body('lastName').isLength({ min: 3 }).withMessage('Last name must have 3+ symbols.'),

  body('password')
    .isLength({ min: 4 })
    .withMessage('Password must have 4+ symbols.')
    .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])/)
    .withMessage('Password must include at least 1 letter and 1 digit.'),

  body('repeatPassword').custom((value, { req }) => {
    if (value !== (req.body as SignUpRequestBody).password) {
      throw new Error(`Passwords don't match.`);
    }
    return true;
  }),

  body('age').isInt({ gt: 0 }).withMessage('Must be non-negative number.'),
];

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
