#! /usr/bin/env node

import { Client } from "pg";
import 'dotenv/config'

const SQL = `
CREATE TABLE IF NOT EXISTS Programmers (
    programmer_id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    programmer VARCHAR ( 255 ),
    imageurl VARCHAR ( 255 )
);

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
  ('legendary Grand Master');

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
  // const connectionString = process.argv[2];
  const connectionString = "postgresql://cpers_7nep_user:isJbLXJYkQCsBxIRLIU3Cba63QzKqHXo@dpg-d1eil4h5pdvs73c4dltg-a.oregon-postgres.render.com/cpers_7nep";
  if (!connectionString) {
    console.error("Error: No database connection string provided");
    process.exit(1);
  }
  const client = new Client({
    // connectionString: `postgresql://${process.env.user}:${process.env.password}@${process.env.host}:${process.env.port}/${process.env.database}`,
    connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });

/*   const client = new Client({
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    ssl: false,
  }); */

  try {
    await client.connect();
    console.log("Connected to database");
    
    await client.query(SQL);
    console.log("Database schema created and populated");
  } catch (err) {
    console.error("Error during database population:", err);
    process.exit(1);
  } finally {
    await client.end();
    console.log("Database connection closed");
  }
}

main();