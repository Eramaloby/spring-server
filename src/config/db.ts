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

export const showDatabaseState = () => {
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Error connecting to the database', err.stack);
    } else {
      console.info('Connected to the database:', res.rows);
    }
  });
};

export default pool;
