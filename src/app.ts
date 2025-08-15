import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { config } from './envconfig';

import { apiRouter } from './routes';

import { showDatabaseState } from './config/db';

import errorHandler from './middlewares/errorHandler';

const app = express();

const PORT = config.PORT || 3000;
const ORIGIN = config.ORIGIN;

app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use('/api', apiRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  showDatabaseState();
  console.info(`Server live on http://localhost:${PORT}`);
});
