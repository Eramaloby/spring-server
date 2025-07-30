import fs from 'fs';
import type { LogRequestBody } from '../types/log.types';

export const logToFile = ({ level, message, details }: LogRequestBody) => {
  const logEntry = `${new Date().toISOString()} [${level.toUpperCase()}] ${message} ${JSON.stringify(details)}\n`;
  fs.appendFile('application.log', logEntry, (err: NodeJS.ErrnoException | null) => {
    if (err) console.error('Failed to write log to file:', err); // eslint-disable-line no-console
  });
};
