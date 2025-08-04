import { Request, Response } from 'express';

import { type Product, PRODUCTS_BlOCK_CONTENT } from '../constants/productsBlockContent';
import { productService } from '../services/productsService';

export const getProducts = (
  req: Request<object, object, object, { search?: string }>,
  res: Response<Product[] | { message: string }>
) => {
  const search = req.query.search;

  let resultProducts: Product[] = PRODUCTS_BlOCK_CONTENT;

  if (search) {
    resultProducts = productService.searchProducts(search);
  }

  return res.status(200).json(resultProducts);
};
