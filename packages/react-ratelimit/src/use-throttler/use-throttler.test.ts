import { describe, expect, it } from "vitest";

import { act, renderHook } from "@testing-library/react";

import { useThrottler } from "./use-throttler";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("useThrottler", () => {
  it("should use correct types", () => {
    const { result } = renderHook(() => useThrottler({ durations: [1000] }));

    expect(typeof result.current.duration).toBe("number");
    expect(typeof result.current.consume).toBe("function");
    expect(typeof result.current.reset).toBe("function");
  });

  it("should use specified duration (1)", () => {
    const { result } = renderHook(() => useThrottler({ durations: [1_000] }));

    expect(result.current.duration).toBe(1_000);
  });

  it("should use specified duration (2)", () => {
    const { result } = renderHook(() => useThrottler({ durations: [10_000] }));

    expect(result.current.duration).toBe(10_000);
  });

  it("should allow request (1)", async () => {
    const { result } = renderHook(() => useThrottler({ durations: [1_000] }));

    const allow = await act(() => result.current.consume());

    expect(allow).toBe(true);
    expect(result.current.duration).toBe(1_000);
  });

  it("should allow request (2)", async () => {
    const { result } = renderHook(() =>
      useThrottler({ durations: [1_000, 2_000] }),
    );

    const allow = await act(() => result.current.consume());

    expect(allow).toBe(true);
    expect(result.current.duration).toBe(1_000);
  });

  it("should allow request (3)", async () => {
    const { result } = renderHook(() =>
      useThrottler({ durations: [1_000, 2_000] }),
    );

    act(() => result.current.consume());
    await wait(1_000);
    const allow = await act(() => result.current.consume());

    expect(allow).toBe(true);
    expect(result.current.duration).toBe(1_000);
  });

  it("should deny request (1)", async () => {
    const { result } = renderHook(() => useThrottler({ durations: [1_000] }));

    act(() => result.current.consume());
    const allow = await act(() => result.current.consume());

    expect(allow).toBe(false);
    expect(result.current.duration).toBe(1_000);
  });

  it("should deny request (2)", async () => {
    const { result } = renderHook(() =>
      useThrottler({ durations: [1_000, 2_000] }),
    );

    act(() => result.current.consume());
    const allow = await act(() => result.current.consume());

    expect(allow).toBe(false);
    expect(result.current.duration).toBe(2_000);
  });

  it("should reset", async () => {
    const { result } = renderHook(() =>
      useThrottler({ durations: [1_000, 5_000, 30_000] }),
    );

    act(() => result.current.consume());
    act(() => result.current.consume());
    act(() => result.current.consume());
    act(() => result.current.reset());

    expect(result.current.duration).toBe(1_000);
  });
});
