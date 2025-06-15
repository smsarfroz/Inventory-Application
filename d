\password sarfroz
GRANT ALL PRIVILEGES ON DATABASE sarfroz TO sarfroz;
\q
?password
\h
\q
\l
CREATE DATABASE top_users;
\l
\c top_users
CREATE TABLE usernames (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   username VARCHAR ( 255 ) 
);
\d
INSERT INTO usernames (username)
VALUES ('Mao'), ('nevz'), ('Lofty');
\d
SELECT * FROM usernames;
\q
\c top_users
\l
\d
DROP TABLE usernames;
\d
\q
\c top_users
\d
\q
\l
\d
\c top_users
\d
\s
