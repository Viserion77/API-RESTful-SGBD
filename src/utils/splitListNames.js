// @ts-check

/**
 * Extract names from a list of names in string format
 * @param {string} nameList
 * @returns {string[]}
 * @example
 * extractProducers('Producer 1, Producer 2 and Producer 3')
 */
export default function splitListNames(nameList) {
  const names = nameList.split(', ')
  const lastName = names.pop() ?? ''

  return names.concat(lastName.split(' and '))
}
