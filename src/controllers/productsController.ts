import { Request, Response, NextFunction } from 'express';

import { type Product, PRODUCTS_BlOCK_CONTENT } from '../constants/productsBlockContent';
import { productService } from '../services/productsService';

import AppError from '../utils/AppError';

export const getProducts = (
  req: Request<object, object, object, { search?: string }>,
  res: Response<Product[] | { message: string }>,
  next: NextFunction
) => {
  const search = req.query.search;

  let resultProducts: Product[] = PRODUCTS_BlOCK_CONTENT;

  if (search) {
    resultProducts = productService.searchProducts(search);
  }

  if (resultProducts.length === 0) {
    return next(new AppError('No products matching search terms', 404));
  }

  return res.status(200).json(resultProducts);
};
