// @ts-check

import fs from 'node:fs/promises'
import { TO_SCAN_DIRECTORY } from './constants.js'

/**
 * Get CSV files from the directory
 * @returns {Promise<string[]>}
 * @example
 * getCsvFiles()
 */
export default async function getCsvFiles() {
  const files = await fs.readdir(TO_SCAN_DIRECTORY)
  const csvFiles = files.filter(file => file.endsWith('.csv'))
  return csvFiles
}
