import { Request, Response } from 'express';

import type { ProductData } from '../models/productModel';
import { productService } from '../services/productsService';

class ProductsController {
  getProducts = async (
    req: Request<object, object, object, { search?: string }>,
    res: Response<ProductData[] | { message: string }>
  ) => {
    const search = req.query.search;

    let resultProducts: ProductData[] = [];

    if (search) {
      resultProducts = await productService.search(search);
    } else {
      resultProducts = await productService.getAll();
    }

    return res.status(200).json(resultProducts);
  };
}

export const productsController = new ProductsController();
