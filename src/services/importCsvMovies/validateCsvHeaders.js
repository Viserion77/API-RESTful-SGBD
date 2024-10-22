// @ts-check

import { INVALID_CSV_HEADERS, CSV_HEADERS } from "./constants.js"

/**
 * Validate if the CSV headers are correct or not
 * @param {string[]} headers 
 * @throws {Error} if the headers are invalid
 * @returns {void}
 * @example
 * validateCsvHeaders(['year', 'title', 'studios', 'producers', 'winner'])
 */
export default function validateCsvHeaders(headers) {
  if (!CSV_HEADERS.every((header, index) => header === headers[index])) {
    throw new Error('Invalid CSV file', { cause: INVALID_CSV_HEADERS })
  }
}

