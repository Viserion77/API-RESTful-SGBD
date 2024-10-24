// @ts-check

import { insert } from "../../db.js";
import aggregateProducers from "./aggregateProducers.js";
import calculateRewardIntervals from "./calculateRewardIntervals.js";

export default function populateProducersTable(movies) {
  const producers = aggregateProducers(movies);

  insert({
    table: 'producers',
    items: Object.values(producers).map(calculateRewardIntervals)
  });
}
