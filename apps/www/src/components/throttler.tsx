import { useState } from "react";
import { useThrottler } from "react-ratelimit";

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

const THROTTLER_DURATIONS = [1000, 2000, 3000, 4000, 5000, 10000];

export function Throttler() {
  const [success, setSuccess] = useState<boolean>();
  const [count, setCount] = useState(1);
  const { duration, consume, reset } = useThrottler({
    durations: THROTTLER_DURATIONS,
  });

  return (
    <div className="flex w-full flex-col gap-4 rounded border p-4">
      <div className="flex-1 space-y-2">
        <h2 className="text-lg font-semibold">Throttler</h2>
        <p className="text-sm">
          Temporarily blocks or slows down requests that exceed a defined limit,
          preventing them from overwhelming the server.
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Timeout Duration (ms)</TableHead>
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
            <TableCell>{duration}</TableCell>
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
