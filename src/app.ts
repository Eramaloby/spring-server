import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';

import { Product, PRODUCTS_BlOCK_CONTENT } from './constants/productsBlockContent';

import { LoginRequestBody, LoginSuccessResponse, LoginErrorResponse } from './types/loginTypes';

import { LogRequestBody } from './types/logTypes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);

app.use(express.json());

app.get(
  '/products',
  (
    req: Request<object, object, object, { nameOrDescription?: string }>,
    res: Response<Product[] | { message: string }>
  ) => {
    const nameOrDesc = req.query.nameOrDescription as string;

    let resultProducts: Product[] = PRODUCTS_BlOCK_CONTENT;

    if (nameOrDesc) {
      const searchTerm = nameOrDesc.toLowerCase();

      resultProducts = PRODUCTS_BlOCK_CONTENT.filter(
        (product) =>
          product.description.toLowerCase().includes(searchTerm) ||
          product.name.toLowerCase().includes(searchTerm)
      );

      if (resultProducts.length === 0) {
        return res.status(404).json({ message: 'No products matching search terms' });
      }
    }
    return res.status(200).json(resultProducts);
  }
);

app.post(
  '/login',
  (
    req: Request<object, object, LoginRequestBody>,
    res: Response<LoginSuccessResponse | LoginErrorResponse>
  ) => {
    const { login, password } = req.body;
    if (!login || !password) {
      return res.status(400).json({ message: 'Login and password are required.' });
    }

    const userLogin = 'admin';
    const userPassword = '1234';

    if (login === userLogin && password === userPassword) {
      return res.status(200).json({ message: 'Login successful.', user: { login, password } });
    } else {
      return res.status(400).json({ message: 'Wrong login or password!' });
    }
  }
);

app.post('/log', (req: Request<object, object, LogRequestBody>, res: Response) => {
  const { level, message, details } = req.body;

  console.log(`[${level.toUpperCase()}] Frontend Log: ${message}`, details || ''); // eslint-disable-line no-console

  const logEntry = `${new Date().toISOString()} [${level.toUpperCase()}] ${message} ${JSON.stringify(details)}\n`;
  fs.appendFile('application.log', logEntry, (err: NodeJS.ErrnoException | null) => {
    if (err) console.error('Failed to write log to file:', err); // eslint-disable-line no-console
  });

  res.status(200).send('Log received');
});

app.listen(PORT);
