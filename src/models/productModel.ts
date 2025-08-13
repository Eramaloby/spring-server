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

  static get = async (searchTerm?: string) => {
    let query = 'SELECT * FROM products';
    let queryValues: string[] = [];

    if (searchTerm) {
      const searchPattern = `%${searchTerm}%`;
      query += ' WHERE name ILIKE $1 OR description ILIKE $1';
      queryValues = [searchPattern];
    }

    const { rows }: QueryResult<ProductData> = await pool.query(query, queryValues);

    return rows.map((row) => new Product(row));
  };
}
