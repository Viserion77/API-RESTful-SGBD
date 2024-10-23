// @ts-check

import { CSV_SEPARATOR } from "./constants.js"
import validateMovieData from "./validateMovieData.js"
import validateCsvHeaders from "./validateCsvHeaders.js"

/**
 * Parse the movie data from the CSV content
 * @param {string} content 
 * @returns {Object[]}
 * @example
 * parseMovieData('year;title;studios;producers;winner\n200;Movie Title;Studio;Producer;yes')
 */
export default function parseMovieData(content) {
  const lines = content.split('\n')

  const headers = lines.shift()?.split(CSV_SEPARATOR) ?? []
  validateCsvHeaders(headers)

  /** @type {Object[]} */
  const init = []

  return lines.reduce((acc, line) => {
    const [year, title, studios, producers, winner] = line.split(CSV_SEPARATOR)
    const invalidLine = validateMovieData(year, title, studios, producers, winner)
    if (invalidLine) {
      console.error(`Invalid line: ${invalidLine}`)
      return acc
    }

    acc.push({
      year: parseInt(year),
      title,
      studios,
      producers,
      winner: winner === 'yes' ? 1 : 0
    })

    return acc
  }, init)
}
