import fs from 'fs';
import type { LogRequestBody } from '../types/log.types';
import AppError from '../utils/AppError';

class LogService {
  logToFile = ({ level, message, details }: LogRequestBody) => {
    const logEntry = `${new Date().toISOString()} [${level.toUpperCase()}] ${message} ${JSON.stringify(details)}\n`;
    fs.appendFile('application.log', logEntry, (err: NodeJS.ErrnoException | null) => {
      if (err) throw new AppError('Failed to write log to file', 500);
    });
  };
}

export const logService = new LogService();
