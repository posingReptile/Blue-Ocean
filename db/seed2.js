import dotenv from 'dotenv';
dotenv.config();
import pkg from 'pg';
const { Pool, Client } = pkg;
import fs from 'fs';
import util from 'util';
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const readFileAsync = util.promisify(fs.readFile);
const filePath = path.join(__dirname, 'models', 'seedData.sql');

const dbConfig = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
};

function seedDatabase() {
  let client;
  return new Promise((resolve, reject) => {
    client = new Client(dbConfig);
    console.log('connected...');

    readFileAsync(filePath, 'utf8')
      .then((sql) => {
        console.log('read sql file');

        client
          .connect()
          .then(() => client.query(sql))
          .then(() => {
            console.log('users, workouts, exercises, and quotes added!');
            client.end();
            resolve();
          })
          .catch((err) => {
            client.end();
            reject(err);
          });
      })
      .catch((err) => reject(err));
  });
}

seedDatabase().catch((err) => console.error(err));
