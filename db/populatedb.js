#! /usr/bin/env node

import { Client } from "pg";
import 'dotenv/config'

const SQL = `
CREATE TABLE IF NOT EXISTS programmers (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR ( 255 )
);

INSERT INTO programmers (name) 
VALUES
    ('tourist'),
    ('jiangly');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.user}:${process.env.password}@${process.env.host}:${process.env.port}/${process.env.database}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();