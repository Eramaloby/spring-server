import { PRODUCTS_BlOCK_CONTENT } from '../constants/productsBlockContent';

export const searchProducts = (search: string) => {
  const searchTerm = search.toLowerCase();

  const resultProducts = PRODUCTS_BlOCK_CONTENT.filter(
    (product) =>
      product.description.toLowerCase().includes(searchTerm) ||
      product.name.toLowerCase().includes(searchTerm)
  );

  return resultProducts;
};
