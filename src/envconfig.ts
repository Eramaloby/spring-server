import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const ENVSchema = z.object({
  PORT: z.string(),
  ORIGIN: z.string(),
  DB_USER: z.string(),
  DB_HOST: z.string(),
  DB_NAME: z.string(),
  DB_PASSWORD: z.string(),
  DB_PORT: z.string(),
});

export const config = ENVSchema.parse(process.env);
