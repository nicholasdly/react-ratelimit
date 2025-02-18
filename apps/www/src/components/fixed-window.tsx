import { useFixedWindow } from "react-ratelimit";
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

const FIXED_WINDOW_TOKENS = 10;
const FIXED_WINDOW_DURATION = 10_000;

export function FixedWindow() {
  const [success, setSuccess] = useState<boolean>();
  const { consume, reset } = useFixedWindow({
    tokens: FIXED_WINDOW_TOKENS,
    duration: FIXED_WINDOW_DURATION,
  });

  return (
    <div className="w-full space-y-4 rounded border p-4">
      <div className="space-y-2">
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
            <TableHead>Success</TableHead>
            <TableHead>Maximum</TableHead>
            <TableHead>Window Duration (ms)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="font-mono font-semibold">
            <TableCell>{success != null ? success.toString() : "-"}</TableCell>
            <TableCell>{FIXED_WINDOW_TOKENS}</TableCell>
            <TableCell>{FIXED_WINDOW_DURATION}</TableCell>
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
