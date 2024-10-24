// @ts-check

import { DatabaseSync } from 'node:sqlite';
import sqlBricks from 'sql-bricks';
import populateProducersTable from './services/producers/populateProducersTable.js';
const database = new DatabaseSync(':memory:');

/**
 * Initialize the producers table
 */
function initializeProducersTable() {
  database.exec('DROP TABLE IF EXISTS producers');
  database.exec(`
    CREATE TABLE producers(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      min_interval INTEGER,
      min_previousWin INTEGER,
      min_followingWin INTEGER,
      max_interval INTEGER,
      max_previousWin INTEGER,
      max_followingWin INTEGER
    ) STRICT`);
}

/**
 * Run the seed to populate the producers table
 * @param {object[]} movies list of movies
 * @example
 * runSeed([{ title: 'Movie', year: 2000, studios: 'Studio', producers: 'Producer', winner: true }])
 */
export function runSeed(movies) {
  initializeProducersTable();

  if (movies.length) populateProducersTable(movies);
}

/**
 * Insert data into the database
 * @param {object} options
 * @param {string} options.table
 * @param {object[]} options.items
 * @example
 * insert({ table: 'producers', items: [{ name: 'Producer' }] })
 */
export function insert({ table, items = [] }) {
  const { text, values } = sqlBricks
    .insertInto(table, items)
    .toParams({ placeholder: '?' });

  const insertStatement = database.prepare(text);
  insertStatement.run(...values);
}

/**
 * Select data from the database
 * @param {string} query
 * @returns {any[]}
 * @example
 * select('SELECT * FROM producers')
 */
export function select(query) {
  return database.prepare(query).all();
}
