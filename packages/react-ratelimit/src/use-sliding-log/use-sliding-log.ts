import { useCallback, useRef } from "react";

export type UseSlidingLogOptions = {
  /**
   * The maximum number of requests allowed within the log duration.
   */
  tokens: number;
  /**
   * The sliding timeframe, in milliseconds, in which requests are allowed.
   */
  duration: number;
};

export type UseSlidingLogHelpers = {
  /**
   * Attempt to consume a specified number of requests from the sliding log.
   * @param cost The number of requests to consume.
   * @returns Boolean indicating whether the consumption was successful.
   */
  consume: (cost?: number) => boolean;
  /**
   * Reset the sliding log to its initial state.
   */
  reset: () => void;
};

/**
 * A custom hook implementing a sliding log rate limiter.
 *
 * A sliding log rate limiter tracks requests within a moving timeframe,
 * allowing new requests only if the total requests within that log (including
 * the new one) are within the limit. As time progresses, the log "slides"
 * forward, discarding older requests and making room for new ones.
 *
 * Pros:
 * - Effectively limits bursts by keeping a history of recent requests.
 * - Adapts to different request rates.
 *
 * Cons:
 * - Storing timestamps for a potentially large number of requests can be memory intensive.
 * - Due to the time cost of filtering outdated timestamps, precision may be lost when the timeframe is extremely large.
 */
export function useSlidingLog({
  tokens,
  duration,
}: UseSlidingLogOptions): UseSlidingLogHelpers {
  const timestamps = useRef<number[]>([]);
  const count = useRef(0);

  const consume = useCallback(
    (cost: number = 1) => {
      const now = Date.now();

      timestamps.current = timestamps.current.filter(
        (ts) => now - ts < duration,
      );

      count.current = timestamps.current.length;

      if (count.current + cost <= tokens) {
        timestamps.current.push(...new Array(cost).fill(now));
        count.current += cost;
        return true;
      }

      return false;
    },
    [duration, tokens],
  );

  const reset = useCallback(() => {
    timestamps.current = [];
    count.current = 0;
  }, []);

  return { consume, reset };
}
