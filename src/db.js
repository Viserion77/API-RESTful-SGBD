// @ts-check

import { DatabaseSync } from 'node:sqlite';
import sqlBricks from 'sql-bricks';
const database = new DatabaseSync(':memory:');

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

export function runSeed(movies) {
  initializeProducersTable();

  if (movies.length) populateProducersTable(movies);
}

function populateProducersTable(movies) {
  const producers = aggregateProducers(movies);

  insert({
    table: 'producers',
    items: Object.values(producers).map(calculateRewardIntervals)
  });
}

/**
 * Calculate the reward intervals for a producer
 * @param {import('./services/producers/interval-awards').Producer & { rewardYears: number[]}} producer
 * @returns {import('./services/producers/interval-awards').Producer}
 * @example
 * calculateRewardIntervals({ name: 'Producer', rewardYears: [2000, 2002, 2005] })
 */
function calculateRewardIntervals(producer) {
  const rewardYears = producer.rewardYears.sort((a, b) => a - b);

  /** @type {{ interval: number | null, previousWin: number | null, followingWin: number | null }} */
  const min = {
    interval: null,
    previousWin: null,
    followingWin: null,
  };
  /** @type {{ interval: number | null, previousWin: number | null, followingWin: number | null }} */
  const max = {
    interval: null,
    previousWin: null,
    followingWin: null,
  };

  for (let i = 0; i < rewardYears.length; i++) {
    const interval = rewardYears[i + 1] - rewardYears[i];
    if (Number.isNaN(interval)) {
      continue;
    }

    if (interval < (min.interval ?? 0) || i === 0) {
      min.interval = interval;
      min.previousWin = rewardYears[i];
      min.followingWin = rewardYears[i + 1];
    }

    if (interval > (max.interval ?? 0)) {
      max.interval = interval;
      max.previousWin = rewardYears[i];
      max.followingWin = rewardYears[i + 1];
    }
  }

  return {
    name: producer.name,
    min_interval: min.interval,
    min_previousWin: min.previousWin,
    min_followingWin: min.followingWin,
    max_interval: max.interval,
    max_previousWin: max.previousWin,
    max_followingWin: max.followingWin,
  };
}

/**
 * Aggregate producers from movies
 * @param {object[]} movies
 * @returns {Object<string, import('./services/producers/interval-awards').Producer & { rewardYears: number[]}>}
 * @example
 * aggregateProducers([{ producers: 'Producer 1 and Producer 2', winner: true, year: 2000 }])
 */
function aggregateProducers(movies) {
  return movies.reduce((acc, movie) => {
    const producersNames = movie.producers.split(' and ');

    producersNames.forEach((producer) => {
      if (!acc[producer]) {
        acc[producer] = {
          name: producer,
          rewardYears: [],
        };
      }

      const producerData = acc[producer];

      if (movie.winner) {
        producerData.rewardYears.push(movie.year);
      }
    });

    return acc;
  }, {});
}

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

