import { useCallback, useState } from "react";

export type UseThrottlerOptions = {
  /**
   * A list of timeout durations in milliseconds.
   */
  durations: number[];
};

export type UseThrottlerHelpers = {
  /**
   * The current timeout duration in milliseconds.
   */
  duration: number;
  /**
   * Attempt to call the throttler.
   * @returns Boolean indicating whether the request should be throttled.
   */
  consume: () => boolean;
  /**
   * Reset the throttler to its initial state.
   */
  reset: () => void;
};

/**
 * A custom hook implementing a throttling rate limiter.
 *
 * A throttling rate limiter works by only allowing requests to be made at a
 * certain rate. The throttling rate can be static, or it can be dynamic,
 * allowing for a changing rate based on consecutive requests.
 *
 * Pros:
 * - Strict protection against large bursts of requests.
 * - A dynamic rate can be used for further protection against abuse (ex.
 * lengthening timeouts for consecutive failed requests).
 *
 * Cons:
 * - May limit legitimate requests.
 */
export function useThrottler({
  durations,
}: UseThrottlerOptions): UseThrottlerHelpers {
  const [index, setIndex] = useState(0);
  const [requestedAt, setRequestedAt] = useState(0);

  const consume = useCallback(() => {
    const now = Date.now();

    if (now - requestedAt < durations[index]) {
      return false;
    }

    setIndex(Math.min(index + 1, durations.length - 1));
    setRequestedAt(now);

    return true;
  }, [durations, index, requestedAt]);

  const reset = useCallback(() => {
    setIndex(0);
    setRequestedAt(0);
  }, []);

  return { duration: durations[index], consume, reset };
}
