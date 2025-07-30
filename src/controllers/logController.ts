import { Request, Response } from 'express';

import { LogRequestBody } from '../types/log.types';
import { logToFile } from '../services/logService';

export const acceptLog = (req: Request<object, object, LogRequestBody>, res: Response) => {
  const { level, message, details } = req.body;

  const requestBody: LogRequestBody = { level, message, details };

  logToFile(requestBody);

  res.status(200).send('Log received');
};
