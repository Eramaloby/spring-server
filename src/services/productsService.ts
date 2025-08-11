import { Product } from '../models/productModel';

class ProductService {
  search = async (search: string) => {
    const searchTerm = search.toLowerCase();

    const products = await Product.search(searchTerm);

    return products;
  };

  getAll = async () => {
    const products = await Product.getAll();

    return products;
  };
}

export const productService = new ProductService();
