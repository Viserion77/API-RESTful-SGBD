// @ts-check

import splitListNames from '../../utils/splitListNames.js';

/**
 * Aggregate producers from movies
 * @param {object[]} movies
 * @returns {Object<string, import('./interval-awards').Producer & { rewardYears: number[]}>}
 * @example
 * aggregateProducers([{ producers: 'Producer 1 and Producer 2', winner: true, year: 2000 }])
 */
export default function aggregateProducers(movies) {
  return movies.reduce((acc, movie) => {
    const producersNames = splitListNames(movie.producers);

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
