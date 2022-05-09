DROP TABLE IF EXISTS movieStore;

CREATE TABLE IF NOT EXISTS movieStore (
   id SERIAL PRIMARY KEY,
   name varchar(255),
   Geners varchar(255),
    Duration varchar(255),
    Rating varchar(255),
    comments VARCHAR(225)
);