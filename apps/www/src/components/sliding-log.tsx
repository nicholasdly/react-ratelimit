import { useState } from "react";
import { useSlidingLog } from "react-ratelimit";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const SLIDING_LOG_TOKENS = 10;
const SLIDING_LOG_DURATION = 10_000;

export function SlidingLog() {
  const [success, setSuccess] = useState<boolean>();
  const [count, setCount] = useState(1);
  const { consume, reset } = useSlidingLog({
    tokens: SLIDING_LOG_TOKENS,
    duration: SLIDING_LOG_DURATION,
  });

  return (
    <div className="flex w-full flex-col gap-4 rounded border p-4">
      <div className="flex-1 space-y-2">
        <h2 className="text-lg font-semibold">Sliding Log</h2>
        <p className="text-sm">
          Tracks requests within a moving timeframe, allowing new requests only
          if the total requests within that log (including the new one) are
          within the limit.
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Success</TableHead>
            <TableHead>Maximum</TableHead>
            <TableHead>Log Duration (ms)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="font-mono font-semibold">
            <TableCell
              className={cn(
                "inline-flex min-w-26 items-baseline gap-1",
                success === true && "text-green-400",
                success === false && "text-red-400",
              )}
            >
              <span>
                {success != null ? (success ? "allowed" : "denied") : "-"}
              </span>
              {count > 1 && (
                <span className="font-sans text-xs">x {count}</span>
              )}
            </TableCell>
            <TableCell>{SLIDING_LOG_TOKENS}</TableCell>
            <TableCell>{SLIDING_LOG_DURATION}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="secondary"
          className="w-full font-semibold transition-transform active:scale-95"
          onClick={() => {
            const result = consume();
            if (success === result) {
              setCount((previous) => previous + 1);
            } else {
              setCount(1);
            }
            setSuccess(result);
          }}
        >
          Check rate limit
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="w-full font-semibold transition-transform active:scale-95"
          onClick={() => {
            reset();
            setSuccess(undefined);
            setCount(1);
          }}
        >
          Reset rate limit
        </Button>
      </div>
    </div>
  );
}
