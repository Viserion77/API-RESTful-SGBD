// @ts-check

import SqlBricks from "sql-bricks"
import { select } from "../../db.js"

/**
 * Get the interval awards for the producers
 * @returns {{min: {producer: string, interval: number, previousWin: number, followingWin: number}[], max: {producer: string, interval: number, previousWin: number, followingWin: number}[]}}
 */
export default function getProducersIntervalAwards() {
  const producers = select(
    SqlBricks
      .select('*')
      .from('producers')
      .where(SqlBricks.isNotNull('max_previousWin'))
      .toString()
  )

  const min = []
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