import { useCallback, useState } from "react";

export type UseTokenBucketOptions = {
  /**
   * The maximum number of tokens that can be stored by the token bucket.
   */
  size: number;
  /**
   * The number of milliseconds until the bucket regenerates one token.
   */
  interval: number;
};

export type UseTokenBucketHelpers = {
  /**
   * Attempt to consume a specified number of tokens from the bucket.
   * @param cost The number of tokens to consume.
   * @returns Boolean indicating whether the consumption was successful.
   */
  consume: (cost: number) => boolean;
  /**
   * Reset the bucket to its initial state.
   */
  reset: () => void;
};

/**
 * A custom hook implementing a token bucket rate limiter.
 *
 * A token bucket rate limiter works by maintaining a count of tokens in a
 * bucket. Each request is expected to consume a certain number of tokens. If
 * there are not enough tokens, the request should be denied. Tokens are
 * replenished at a fixed rate.
 *
 * Pros:
 * - Allows for initial bursts in traffic (short periods of high request volume).
 *
 * Cons:
 * - May not be ideal for scenarios requiring strict rate control.
 */
export function useTokenBucket({
  size,
  interval,
}: UseTokenBucketOptions): UseTokenBucketHelpers {
  const [tokens, setTokens] = useState(size);
  const [refilledAt, setRefilledAt] = useState(Date.now());

  const consume = useCallback(
    (cost: number) => {
      const now = Date.now();
      const refill = Math.floor((now - refilledAt) / interval);

      if (refill > 0) {
        setRefilledAt(now);
      }

      const available = Math.min(tokens + refill, size);
      if (available < cost) {
        return false;
      }

      setTokens(available - cost);
      return true;
    },
    [interval, refilledAt, size, tokens]
  );

  const reset = useCallback(() => {
    setTokens(size);
    setRefilledAt(Date.now());
  }, [size]);

  return { consume, reset };
}
