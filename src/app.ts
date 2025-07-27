import express, { Request, Response } from 'express';
import {
  Product,
  PRODUCTS_BlOCK_CONTENT,
} from './constants/productsBlockContent';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get(
  '/products',
  (
    req: Request<{}, {}, {}, { nameOrDescription?: string }>,
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
        return res
          .status(404)
          .json({ message: 'No products matching search terms' });
      }
    }
    return res.json(resultProducts);
  }
);

app.listen(PORT, () => {
  console.log(`Live on: http://localhost:${PORT}`);
});
