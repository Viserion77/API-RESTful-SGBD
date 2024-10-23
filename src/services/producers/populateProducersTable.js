// @ts-check

import { insert } from "../../db";
import aggregateProducers from "./aggregateProducers";
import calculateRewardIntervals from "./calculateRewardIntervals";

export default function populateProducersTable(movies) {
  const producers = aggregateProducers(movies);

  insert({
    table: 'producers',
    items: Object.values(producers).map(calculateRewardIntervals)
  });
}
