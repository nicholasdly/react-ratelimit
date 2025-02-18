import { useState } from "react";
import { useSlidingLog } from "react-ratelimit";

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
            <TableCell>{success != null ? success.toString() : "-"}</TableCell>
            <TableCell>{SLIDING_LOG_TOKENS}</TableCell>
            <TableCell>{SLIDING_LOG_DURATION}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="secondary"
          className="w-full font-semibold"
          onClick={() => setSuccess(consume())}
        >
          Check rate limit
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="w-full font-semibold"
          onClick={() => {
            reset();
            setSuccess(undefined);
          }}
        >
          Reset rate limit
        </Button>
      </div>
    </div>
  );
}
