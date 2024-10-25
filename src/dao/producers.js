// @ts-check

import SqlBricks from "sql-bricks";
import { select } from "../db.js";

/**
 * Get the producers ordered by the direction
 * @param {'min' | 'max'} direction
 * @param {'ASC' | 'DESC'} [order='ASC']
 * @returns {import("../services/producers/interval-awards").Producer[]}
 * @example
 * getProducersOrderedByDirection('min')
 */
export default function getProducersOrderedByDirection(direction, order = 'ASC') {
  return select(
    SqlBricks
      .select('*')
      .from('producers')
      .where(SqlBricks.isNotNull(`${direction}_interval`))
      .orderBy(`${direction}_interval ${order}`)
      .toString()
  )
}
