# react-ratelimit

> A ready-to-use library of React hooks for client-side rate limiting, written in TypeScript.

```bash
npm i react-ratelimit
```

## Introduction

**react-ratelimit** is a ready-to-use library of React hooks with the sole purpose of client-side rate limiting. It provides a set of hooks that enables you to apply common rate limiting techniques to React components.

```tsx
import { useTokenBucket } from "react-ratelimit";

function Component() {
  const { consume, reset } = useTokenBucket({
    size: 10,
    interval: 1_000,
  });

  /* ... */
}
```

## Documentation

### `useTokenBucket`

A token bucket rate limiter works by maintaining a count of tokens in a bucket. Each request is expected to consume a certain number of tokens. If there are not enough tokens, the request should be denied. Tokens are replenished at a fixed rate.

**Pros:**

- Allows for initial bursts in traffic (short periods of high request volume).

**Cons:**

- May not be ideal for scenarios requiring strict rate control.

#### Usage

```tsx
import { useTokenBucket } from "react-ratelimit";

export default function Component() {
  // A token bucket rate limiter that allows a maximum burst of 10 requests.
  // The token bucket regenerates a token every 1 second.
  const { consume, reset } = useTokenBucket({
    size: 10,
    interval: 1_000,
  });

  const submit = () => {
    const allow = consume(1);
    if (!allow) {
      alert("Slow down, you're going too fast!");
    } else {
      // Do something...
    }
  };

  return <form onSubmit={() => submit()}>{/* ... */}</form>;
}
```

### `useThrottler`

A throttling rate limiter works by only allowing requests to be made at a certain rate. The throttling rate can be static, or it can be dynamic, allowing for a changing rate based on consecutive requests.

**Pros:**

- Strict protection against large bursts of requests.
- A dynamic rate can be used for further protection against abuse (ex. lengthening timeouts for consecutive failed requests).

**Cons:**

- May limit legitimate requests.

#### Usage

```tsx
import { useThrottler } from "react-ratelimit";

export default function Component() {
  // A throttling rate limiter allowing a request every 1 second.
  // If a request is sent faster than that, the timeout period is increased
  // to 2 seconds, then 3 seconds, then 4 seconds, etc.
  const { duration, consume, reset } = useThrottler({
    durations: [1000, 2000, 3000, 4000, 5000, 10000],
  });

  const submit = () => {
    const allow = consume();
    if (!allow) {
      alert("Slow down, you're going too fast!");
    } else {
      // Do something...
    }
  };

  return <form onSubmit={() => submit()}>{/* ... */}</form>;
}
```

### `useFixedWindow`

A fixed window rate limiter works by maintaining a count of requests within a fixed time window. Once the counter reaches the maximum allowed number, all further requests are denied until the window resets.

**Pros:**

- Extremely predictable and customizable intervals.

**Cons:**

- Susceptible to bursts of requests near window boundaries.

#### Usage

```tsx
import { useFixedWindow } from "react-ratelimit";

export default function Component() {
  // A fixed window rate limiter allowing 10 requests every 10 seconds.
  const { consume, reset } = useFixedWindow({
    tokens: 10,
    duration: 10_000,
  });

  const submit = () => {
    const allow = consume();
    if (!allow) {
      alert("Slow down, you're going too fast!");
    } else {
      // Do something...
    }
  };

  return <form onSubmit={() => submit()}>{/* ... */}</form>;
}
```

### `useSlidingLog`

A sliding log rate limiter tracks requests within a moving timeframe, allowing new requests only if the total requests within that log (including the new one) are within the limit. As time progresses, the log "slides" forward, discarding older requests and making room for new ones.

**Pros:**

- Effectively limits bursts by keeping a history of recent requests.
- Adapts to different request rates.

**Cons:**

- Storing timestamps for a potentially large number of requests can be memory intensive.
- Due to the time cost of filtering outdated timestamps, precision may be lost when the timeframe is extremely large.

#### Usage

```tsx
import { useSlidingLog } from "react-ratelimit";

export default function Component() {
  // A sliding log rate limiter allowing 10 requests every 10 second window.
  const { consume, reset } = useSlidingLog({
    tokens: 10,
    duration: 10_000,
  });

  const submit = () => {
    const allow = consume();
    if (!allow) {
      alert("Slow down, you're going too fast!");
    } else {
      // Do something...
    }
  };

  return <form onSubmit={() => submit()}>{/* ... */}</form>;
}
```

## License

Licensed under the [MIT License](LICENSE), Copyright © 2024
