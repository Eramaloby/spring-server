import { Product } from '../models/productModel';

class ProductService {
  get = async (search?: string) => {
    const products = await Product.get(search);

    return products;
  };
}

export const productService = new ProductService();
