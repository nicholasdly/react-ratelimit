import { describe, expect, it } from "vitest";

import { act, renderHook } from "@testing-library/react";

import { useSlidingLog } from "./use-sliding-log";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("useSlidingLog", () => {
  it("should use correct types", () => {
    const { result } = renderHook(() =>
      useSlidingLog({ tokens: 10, duration: 10_000 }),
    );

    expect(typeof result.current.consume).toBe("function");
    expect(typeof result.current.reset).toBe("function");
  });

  it("should allow request (1)", async () => {
    const { result } = renderHook(() =>
      useSlidingLog({ tokens: 10, duration: 10_000 }),
    );

    const allow = await act(() => result.current.consume());

    expect(allow).toBe(true);
  });

  it("should allow request (2)", async () => {
    const { result } = renderHook(() =>
      useSlidingLog({ tokens: 10, duration: 10_000 }),
    );

    const allow = await act(() => result.current.consume(10));

    expect(allow).toBe(true);
  });

  it("should allow request (3)", async () => {
    const { result } = renderHook(() =>
      useSlidingLog({ tokens: 10, duration: 10_000 }),
    );

    act(() => result.current.consume(2));
    const allow = await act(() => result.current.consume(2));

    expect(allow).toBe(true);
  });

  it("should allow request (4)", async () => {
    const { result } = renderHook(() =>
      useSlidingLog({ tokens: 5, duration: 1_000 }),
    );

    act(() => result.current.consume(5));
    await wait(1_000);
    const allow = await act(() => result.current.consume(5));

    expect(allow).toBe(true);
  });

  it("should deny request (1)", async () => {
    const { result } = renderHook(() =>
      useSlidingLog({ tokens: 10, duration: 10_000 }),
    );

    const allow = await act(() => result.current.consume(11));

    expect(allow).toBe(false);
  });

  it("should deny request (2)", async () => {
    const { result } = renderHook(() =>
      useSlidingLog({ tokens: 10, duration: 10_000 }),
    );

    act(() => result.current.consume(10));
    const allow = await act(() => result.current.consume());

    expect(allow).toBe(false);
  });
});
