#! /usr/bin/env node

import { Client } from "pg";
import 'dotenv/config'

const SQL = `
CREATE TABLE IF NOT EXISTS Programmers (
    programmer_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    programmer VARCHAR ( 255 ) 
);

INSERT INTO Programmers (programmer) 
VALUES
    ('tourist'),
    ('jiangly'),
    ('orzdevinwang');

CREATE TABLE IF NOT EXISTS Contribution (
  contribution_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  contribution VARCHAR ( 255 )
);

INSERT INTO Contribution (contribution) 
VALUES 
  ('10-'),
  ('30+'),
  ('50+');

CREATE TABLE IF NOT EXISTS MaxRating (
  maxRating_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  maxRating VARCHAR ( 255 )
);

INSERT INTO MaxRating (maxRating) 
VALUES
  ('tourist'),
  ('jiangly'),
  ('Legendary Grand Master');

CREATE TABLE IF NOT EXISTS ProgrammersContribution (
  programmer_id INT,
  contribution_id INT,
  PRIMARY KEY (programmer_id, contribution_id),
  FOREIGN KEY (programmer_id) REFERENCES Programmers(programmer_id),
  FOREIGN KEY (contribution_id) REFERENCES Contribution(contribution_id)
);

CREATE TABLE IF NOT EXISTS ProgrammersMaxRating (
  programmer_id INT,
  maxRating_id INT,
  PRIMARY KEY (programmer_id, maxRating_id),
  FOREIGN KEY (programmer_id) REFERENCES Programmers(programmer_id),
  FOREIGN KEY (maxRating_id) REFERENCES MaxRating(maxRating_id)
);

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