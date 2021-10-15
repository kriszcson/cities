import dotenv from 'dotenv';
import pg from 'pg';
const { Pool } = pg;

dotenv.config();

let localPoolConfig = {
    user: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    host: 'localhost',
    port: process.env.PG_PORT,
    database: 'citiesineurope'
};

const poolConfig = process.env.DATABASE_URL ? {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
} : localPoolConfig;

const pool = new Pool(poolConfig);

export default pool;