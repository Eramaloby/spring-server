import { Pool, type PoolConfig } from 'pg';
import { config } from '../envconfig';

const dbConfig: PoolConfig = {
  user: config.DB_USER,
  host: config.DB_HOST,
  database: config.DB_NAME,
  password: config.DB_PASSWORD,
  port: parseInt(config.DB_PORT),
};

const pool = new Pool(dbConfig);

export default pool;
