# react-ratelimit

> A tiny library of React hooks for client-side rate limiting, written in TypeScript.

```bash
npm i react-ratelimit
```

## Introduction

**react-ratelimit** is a lightweight library of React hooks with the sole purpose of client-side rate limiting. It provides a set of hooks that enables you to apply common rate limiting techniques to React components.

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

## License

Licensed under the [MIT License](LICENSE), Copyright © 2024
