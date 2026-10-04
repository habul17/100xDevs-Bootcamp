-- Run once against your database before starting the server:
--   psql "$DATABASE_URL" -f schema.sql

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL -- bcrypt hash, never the plain password
);
