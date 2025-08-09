import { QueryResult } from 'pg';
import pool from '../config/db';

export interface UserData {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
}

export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;

  private constructor(data: UserData) {
    this.id = data.id;
    this.username = data.username;
    this.password = data.password;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.age = data.age;
  }

  static create = async (data: UserData) => {
    const query =
      'INSERT INTO users (username, password, firstName, lastName, age) VALUES ($1, $2, $3, $4, $5) RETURNING *;';
    const { rows }: QueryResult<UserData> = await pool.query(query, [
      data.username,
      data.password,
      data.firstName,
      data.lastName,
      data.age,
    ]);

    return new User(rows[0]);
  };

  static getAll = async () => {
    const query = 'SELECT * FROM users';
    const { rows }: QueryResult<UserData> = await pool.query(query);

    return rows.map((row) => new User(row));
  };

  static findById = async (id: number) => {
    const query = 'SELECT * FROM users WHERE id = $1;';
    const { rows }: QueryResult<UserData> = await pool.query(query, [id]);
    if (rows.length === 0) {
      return null;
    }

    return new User(rows[0]);
  };

  static findByUsername = async (username: string) => {
    const query = 'SELECT * FROM users WHERE username = $1;';
    const { rows }: QueryResult<UserData> = await pool.query(query, [username]);
    if (rows.length === 0) {
      return null;
    }

    return new User(rows[0]);
  };
}
