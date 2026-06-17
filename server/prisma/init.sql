-- Run this once against your database BEFORE `npx prisma migrate dev`.
-- On Neon: open the SQL editor in your project and paste this in.
-- Locally via docker-compose: psql postgresql://notemind:notemind@localhost:5432/notemind -f prisma/init.sql

CREATE EXTENSION IF NOT EXISTS vector;
