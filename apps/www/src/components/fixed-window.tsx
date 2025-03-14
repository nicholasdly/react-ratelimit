import { useState } from "react";
import { useFixedWindow } from "react-ratelimit";

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

const FIXED_WINDOW_TOKENS = 10;
const FIXED_WINDOW_DURATION = 10_000;

export function FixedWindow() {
  const [success, setSuccess] = useState<boolean>();
  const [count, setCount] = useState(1);
  const { consume, reset } = useFixedWindow({
    tokens: FIXED_WINDOW_TOKENS,
    duration: FIXED_WINDOW_DURATION,
  });

  return (
    <div className="flex w-full flex-col gap-4 rounded border p-4">
      <div className="flex-1 space-y-2">
        <h2 className="text-lg font-semibold">Fixed Window</h2>
        <p className="text-sm">
          Maintains a count of requests within a fixed time window. Once the
          counter reaches the maximum allowed number, all further requests are
          denied until the window resets.
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Maximum</TableHead>
            <TableHead>Window Duration (ms)</TableHead>
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
            <TableCell>{FIXED_WINDOW_TOKENS}</TableCell>
            <TableCell>{FIXED_WINDOW_DURATION}</TableCell>
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
