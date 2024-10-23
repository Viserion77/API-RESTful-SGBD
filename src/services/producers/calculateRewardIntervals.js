// @ts-check

/**
 * Calculate the reward intervals for a producer
 * @param {import('./interval-awards').Producer & { rewardYears: number[]}} producer
 * @returns {import('./interval-awards').Producer}
 * @example
 * calculateRewardIntervals({ name: 'Producer', rewardYears: [2000, 2002, 2005] })
 */
export default function calculateRewardIntervals(producer) {
  const rewardYears = producer.rewardYears.sort((a, b) => a - b);

  /** @type {{ interval: number | null, previousWin: number | null, followingWin: number | null }} */
  const min = {
    interval: null,
    previousWin: null,
    followingWin: null,
  };
  /** @type {{ interval: number | null, previousWin: number | null, followingWin: number | null }} */
  const max = {
    interval: null,
    previousWin: null,
    followingWin: null,
  };

  for (let i = 0; i < rewardYears.length; i++) {
    const interval = rewardYears[i + 1] - rewardYears[i];
    if (Number.isNaN(interval)) {
      continue;
    }

    if (interval < (min.interval ?? 0) || i === 0) {
      min.interval = interval;
      min.previousWin = rewardYears[i];
      min.followingWin = rewardYears[i + 1];
    }

    if (interval > (max.interval ?? 0)) {
      max.interval = interval;
      max.previousWin = rewardYears[i];
      max.followingWin = rewardYears[i + 1];
    }
  }

  return {
    name: producer.name,
    min_interval: min.interval,
    min_previousWin: min.previousWin,
    min_followingWin: min.followingWin,
    max_interval: max.interval,
    max_previousWin: max.previousWin,
    max_followingWin: max.followingWin,
  };
}