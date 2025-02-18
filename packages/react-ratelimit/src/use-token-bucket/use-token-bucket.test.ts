import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTokenBucket } from "./use-token-bucket";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("useTokenBucket", () => {
  it("should use correct types", () => {
    const { result } = renderHook(() =>
      useTokenBucket({ size: 10, interval: 1_000 }),
    );

    expect(typeof result.current.size).toBe("number");
    expect(typeof result.current.interval).toBe("number");
    expect(typeof result.current.consume).toBe("function");
    expect(typeof result.current.reset).toBe("function");
  });

  it("should use specified size (1)", () => {
    const { result } = renderHook(() =>
      useTokenBucket({ size: 10, interval: 1_000 }),
    );

    expect(result.current.size).toBe(10);
  });

  it("should use specified size (2)", () => {
    const { result } = renderHook(() =>
      useTokenBucket({ size: 5, interval: 2000 }),
    );

    expect(result.current.size).toBe(5);
  });

  it("should use specified interval (1)", () => {
    const { result } = renderHook(() =>
      useTokenBucket({ size: 10, interval: 1_000 }),
    );

    expect(result.current.interval).toBe(1000);
  });

  it("should use specified interval (2)", () => {
    const { result } = renderHook(() =>
      useTokenBucket({ size: 5, interval: 2_000 }),
    );

    expect(result.current.interval).toBe(2_000);
  });

  it("should allow request (1)", async () => {
    const { result } = renderHook(() =>
      useTokenBucket({ size: 10, interval: 1_000 }),
    );

    const allow = await act(() => result.current.consume(1));

    expect(allow).toBe(true);
  });

  it("should allow request (2)", async () => {
    const { result } = renderHook(() =>
      useTokenBucket({ size: 10, interval: 1_000 }),
    );

    const allow = await act(() => result.current.consume(10));

    expect(allow).toBe(true);
  });

  it("should allow request (3)", async () => {
    const { result } = renderHook(() =>
      useTokenBucket({ size: 10, interval: 1_000 }),
    );

    act(() => result.current.consume(2));
    const allow = await act(() => result.current.consume(2));

    expect(allow).toBe(true);
  });

  it("should allow request (4)", async () => {
    const { result } = renderHook(() =>
      useTokenBucket({ size: 10, interval: 1_000 }),
    );

    act(() => result.current.consume(10));
    await wait(1_000);
    const allow = await act(() => result.current.consume(1));

    expect(allow).toBe(true);
  });

  it("should deny request (1)", async () => {
    const { result } = renderHook(() =>
      useTokenBucket({ size: 10, interval: 1_000 }),
    );

    const allow = await act(() => result.current.consume(11));

    expect(allow).toBe(false);
  });

  it("should deny request (2)", async () => {
    const { result } = renderHook(() =>
      useTokenBucket({ size: 10, interval: 1_000 }),
    );

    act(() => result.current.consume(10));
    const allow = await act(() => result.current.consume(1));

    expect(allow).toBe(false);
  });
});
