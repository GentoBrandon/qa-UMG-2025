import dotenv from 'dotenv';
dotenv.config();
import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function initializeDatabase() {
  const client = await pool.connect();
  try {
    console.log('Connection to PostgreSQL established correctly');
  } finally {
    client.release();
  }
}

export { pool, initializeDatabase };
