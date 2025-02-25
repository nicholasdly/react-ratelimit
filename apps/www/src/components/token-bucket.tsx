import { useState } from "react";
import { useTokenBucket } from "react-ratelimit";

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

const TOKEN_BUCKET_SIZE = 10;
const TOKEN_BUCKET_INTERVAL = 1000;

export function TokenBucket() {
  const [success, setSuccess] = useState<boolean>();
  const [count, setCount] = useState(1);
  const { consume, reset } = useTokenBucket({
    size: TOKEN_BUCKET_SIZE,
    interval: TOKEN_BUCKET_INTERVAL,
  });

  return (
    <div className="flex w-full flex-col gap-4 rounded border p-4">
      <div className="flex-1 space-y-2">
        <h2 className="text-lg font-semibold">Token Bucket</h2>
        <p className="text-sm">
          Uses a bucket that holds tokens, which are required for requests, that
          refill at a set rate allowing bursts up to the bucket&apos;s capacity.
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Bucket Size</TableHead>
            <TableHead>Refill Interval (ms)</TableHead>
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
            <TableCell>{TOKEN_BUCKET_SIZE}</TableCell>
            <TableCell>{TOKEN_BUCKET_INTERVAL}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="secondary"
          className="w-full font-semibold transition-transform active:scale-95"
          onClick={() => {
            const result = consume(1);
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
