import { useCallback, useRef } from "react";

export type UseFixedWindowOptions = {
  /**
   * The maximum number of requests allowed within the window duration.
   */
  tokens: number;
  /**
   * The fixed timeframe, in milliseconds, in which requests are allowed.
   */
  duration: number;
};

export type UseFixedWindowHelpers = {
  /**
   * Attempt to consume a specified number of requests from the fixed window.
   * @param cost The number of requests to consume.
   * @returns Boolean indicating whether the consumption was successful.
   */
  consume: (cost?: number) => boolean;
  /**
   * Reset the fixed window to its initial state.
   */
  reset: () => void;
};

/**
 * A custom hook implementing a fixed window rate limiter.
 *
 * A fixed window rate limiter works by maintaining a count of requests within
 * a fixed time window. Once the counter reaches the maximum allowed number,
 * all further requests are denied until the window resets.
 *
 * Pros:
 * - Extremely predictable and customizable intervals.
 *
 * Cons:
 * - Susceptible to bursts of requests near window boundaries.
 */
export function useFixedWindow({
  tokens,
  duration,
}: UseFixedWindowOptions): UseFixedWindowHelpers {
  const resetAt = useRef(Date.now());
  const count = useRef(0);

  const consume = useCallback(
    (cost: number = 1) => {
      const now = Date.now();

      const elapsedTime = now - resetAt.current;
      const windowsElapsed = Math.floor(elapsedTime / duration);

      if (windowsElapsed > 0) {
        resetAt.current = now;
        count.current = cost;
        return cost <= tokens;
      }

      if (count.current + cost <= tokens) {
        count.current += cost;
        return true;
      }

      return false;
    },
    [duration, tokens]
  );

  const reset = useCallback(() => {
    resetAt.current = Date.now();
    count.current = 0;
  }, []);

  return { consume, reset };
}
