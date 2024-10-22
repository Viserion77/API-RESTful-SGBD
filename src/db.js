// @ts-check

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

export function runSeed(movies) {
  database.exec(`DROP TABLE IF EXISTS movies`);
  database.exec(`DROP TABLE IF EXISTS producers`);

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
        ) STRICT
      `);

  insert({
    table: 'movies',
    items: movies,
  });

  const producers = movies.reduce((acc, movie) => {
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

  insert({
    table: 'producers',
    items: Object.values(producers).map((producer) => {
      const rewardYears = producer.rewardYears.sort((a, b) => a - b);

      const min = {
        interval: null,
        previousWin: null,
        followingWin: null,
      }
      const max = {
        interval: null,
        previousWin: null,
        followingWin: null,
      }

      for (let i = 0; i < rewardYears.length; i++) {
        const interval = rewardYears[i + 1] - rewardYears[i];
        if (Number.isNaN(interval)) {
          continue;
        }

        if (interval < min.interval || i === 0) {
          min.interval = interval;
          min.previousWin = rewardYears[i];
          min.followingWin = rewardYears[i + 1];
        }

        if (interval > max.interval) {
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
    })
  });
}
