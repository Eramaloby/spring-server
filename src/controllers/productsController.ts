import { type Product, PRODUCTS_BlOCK_CONTENT } from '../constants/productsBlockContent';
import { Request, Response } from 'express';

export const getProducts = (
  req: Request<object, object, object, { search?: string }>,
  res: Response<Product[] | { message: string }>
) => {
  const search = req.query.search;

  let resultProducts: Product[] = PRODUCTS_BlOCK_CONTENT;

  if (search) {
    const searchTerm = search.toLowerCase();

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
};
