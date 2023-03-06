import dotenv from 'dotenv';
dotenv.config();
import pkg from 'pg';
const { Pool, Client } = pkg;
import pgtools from 'pgtools';
import fs from 'fs';
import util from 'util';
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, 'models', 'schema.sql');
const readFileAsync = util.promisify(fs.readFile);

// database creation options
const dbConfig = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
};

// create temporary client for database check
const tempClient = new Client({
  user: dbConfig.user,
  password: dbConfig.password,
  host: dbConfig.host,
  port: dbConfig.port,
});

async function checkDatabaseExists() {
  try {
    await tempClient.connect();
    const result = await tempClient.query(`
      SELECT datname FROM pg_database WHERE datistemplate = false AND datname = '${process.env.PGDATABASE}'
    `);
    return result.rowCount > 0;
  } catch (error) {
    console.log('database does not exist, creating database...');
  } finally {
    await tempClient.end();
  }
}

async function createDatabase() {
  const exists = await checkDatabaseExists();

  if (!exists) {
    // Create the new database
    await pgtools.createdb(dbConfig, process.env.PGDATABASE);

    // Connect to the new database
    const client = new Client(dbConfig);

    client.connect().then(() => {
      console.log('connected...');
    });

    readFileAsync(filePath, 'utf8')
      .then((sql) => {
        return client.query(sql);
      })
      .then(() => {
        console.log('database created!');
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        client.end();
      });
  }
  return;
}

createDatabase();

// initialize connection pool
const pool = new Pool({
  user: dbConfig.user,
  password: dbConfig.password,
  host: dbConfig.host,
  port: dbConfig.port,
  database: dbConfig.database,
});

export { pool };
