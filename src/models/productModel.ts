import { QueryResult } from 'pg';
import pool from '../config/db';

export interface ProductData {
  id: number;
  name: string;
  description: string;
  currentVersion: string;
  versionsCount: number;
  src: string;
}

export class Product {
  id: number;
  name: string;
  description: string;
  currentVersion: string;
  versionsCount: number;
  src: string;

  private constructor(data: ProductData) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.currentVersion = data.currentVersion;
    this.versionsCount = data.versionsCount;
    this.src = data.src;
  }

  static getAll = async () => {
    const query = 'SELECT * FROM products';
    const { rows }: QueryResult<ProductData> = await pool.query(query);

    return rows.map((row) => new Product(row));
  };

  static search = async (searchTerm: string) => {
    const query = 'SELECT * FROM products WHERE name ILIKE $1 OR description ILIKE $1;';

    const searchPattern = `%${searchTerm}%`;

    const { rows }: QueryResult<ProductData> = await pool.query(query, [searchPattern]);

    return rows.map((row) => new Product(row));
  };
}
