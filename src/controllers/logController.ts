import { Request, Response } from 'express';

import { LogRequestBody } from '../types/log.types';
import { logService } from '../services/logService';
import AppError from '../utils/AppError';

export const acceptLog = (req: Request<object, object, LogRequestBody>, res: Response) => {
  const { level, message, details } = req.body;

  const requestBody: LogRequestBody = { level, message, details };

  try {
    logService.logToFile(requestBody);
    res.status(200).send('Log received');
  } catch (error) {
    if (error instanceof AppError) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};
