import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

import { apiRouter } from './routes';

import errorHandler from './middlewares/errorHandler';

const app = express();

config();
const PORT = process.env.PORT || 3000;
const ORIGIN = process.env.ORIGIN;

app.use(
  cors({
    origin: ORIGIN,
  })
);

app.use(express.json());

app.use('/', apiRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server live on http://localhost:${PORT}`); // eslint-disable-line no-console
});
