// @ts-check

import getProducersOrderedByDirection from "../../dao/producers.js"

/**
 * @typedef {Object} ProducerIntervalData
 * @property {string} producer
 * @property {number | null} interval
 * @property {number | null} previousWin
 * @property {number | null} followingWin
 */
/**
 * @typedef {Object} Producer
 * @property {string} name
 * @property {number | null} min_interval
 * @property {number | null} min_previousWin
 * @property {number | null} min_followingWin
 * @property {number | null} max_interval
 * @property {number | null} max_previousWin
 * @property {number | null} max_followingWin
 */
/**
 * Get the interval awards for the producers
 * @returns {{min: ProducerIntervalData[], max: ProducerIntervalData[]}}
 */
export default function getProducersIntervalAwards() {
  const producersInMinOrdered = getProducersOrderedByDirection('min')
  const producersInMaxOrdered = getProducersOrderedByDirection('max', 'DESC')

  return {
    min: retrieveProducersByInterval(producersInMinOrdered, 'min'),
    max: retrieveProducersByInterval(producersInMaxOrdered, 'max')
  }
}

/**
 * Get the producers with the same interval
 * @param {Producer[]} producersMinOrdered
 * @param {'min' | 'max'} key
 * @returns {ProducerIntervalData[]}
 * @example
 * getIntervalProducers([{ name: 'Producer', min_interval: 1, min_previousWin: 1990, min_followingWin: 1991 }], 'min')
 */
function retrieveProducersByInterval(producersMinOrdered, key) {
  const firstInterval = producersMinOrdered[0]?.[`${key}_interval`]
  const intervalProducers = producersMinOrdered.filter(producer => producer[`${key}_interval`] === firstInterval)
  return intervalProducers.map(producer => ({
    producer: producer.name,
    interval: producer[`${key}_interval`],
    previousWin: producer[`${key}_previousWin`],
    followingWin: producer[`${key}_followingWin`]
  }))
}
