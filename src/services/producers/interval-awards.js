// @ts-check

import SqlBricks from "sql-bricks"
import { select } from "../../db.js"

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
  /** @type {Producer[]} */
  const producers = select(
    SqlBricks
      .select('*')
      .from('producers')
      .where(SqlBricks.isNotNull('max_previousWin'))
      .toString()
  )

  /** @type {ProducerIntervalData[]} */
  const min = []
  /** @type {ProducerIntervalData[]} */
  const max = []

  for (const producer of producers) {
    min.push({
      producer: producer.name,
      interval: producer.min_interval,
      previousWin: producer.min_previousWin,
      followingWin: producer.min_followingWin
    })
    max.push({
      producer: producer.name,
      interval: producer.max_interval,
      previousWin: producer.max_previousWin,
      followingWin: producer.max_followingWin
    })
  }

  return {
    min,
    max
  }
}