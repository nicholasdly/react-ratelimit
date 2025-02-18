import { useThrottler } from "react-ratelimit";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useState } from "react";

const THROTTLER_DURATIONS = [1000, 2000, 3000, 4000, 5000, 10000];

export function Throttler() {
  const [success, setSuccess] = useState<boolean>();
  const { duration, consume, reset } = useThrottler({
    durations: THROTTLER_DURATIONS,
  });

  return (
    <div className="w-full flex flex-col gap-4 rounded border p-4">
      <div className="space-y-2 flex-1">
        <h2 className="text-lg font-semibold">Throttler</h2>
        <p className="text-sm">
          Temporarily blocks or slows down requests that exceed a defined limit,
          preventing them from overwhelming the server.
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Success</TableHead>
            <TableHead>Timeout Duration (ms)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="font-mono font-semibold">
            <TableCell>{success != null ? success.toString() : "-"}</TableCell>
            <TableCell>{duration}</TableCell>
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
