//database connection here

// const Pool = require('pg').Pool;
import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.PGDATABASE);
import pkg from 'pg';
const { Pool } = pkg;
import pgtools from 'pgtools';

// database connection pool
const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});

// database creation options
const dbConfig = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
};

// const sqlFilePath = './schema.sql';

async function createDatabase() {
  // Create the new database
  await pgtools.createdb(dbConfig, process.env.PGDATABASE);

  // Connect to the new database
  const client = new Pool({
    dbConfig,
    // database: process.env.PGDATABASE,
  });

  client.connect().then(() => {
    console.log('connected');
  });

  try {
    // Read the contents of the SQL file
    const sql = await fs.promises.readFile(sqlFilePath, 'utf8');
    await client.query(sql);
    console.log('Database created!');
  } finally {
    client.release();
  }
}

createDatabase();

// Export the pool
export { pool, createDatabase };
