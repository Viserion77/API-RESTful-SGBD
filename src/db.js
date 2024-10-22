import { DatabaseSync } from 'node:sqlite';
import sqlBricks from 'sql-bricks';
const database = new DatabaseSync(':memory:');

export function insert({ table, items = [] }) {
  const { text, values } = sqlBricks
    .insertInto(table, items)
    .toParams({ placeholder: '?' });

  const insertStatement = database.prepare(text);
  insertStatement.run(...values);
}

export function select(query) {
  return database.prepare(query).all();
}

export function runSeed(items) {
  database.exec(`DROP TABLE IF EXISTS movies`);

  database.exec(`
        CREATE TABLE movies(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          year INTEGER NOT NULL CHECK(year >= 1900),
          title TEXT NOT NULL,
          studios TEXT NOT NULL,
          producers TEXT NOT NULL,
          winner INTEGER NOT NULL CHECK(winner IN (0, 1))
        ) STRICT
      `);

  insert({
    table: 'movies',
    items
  });
}
