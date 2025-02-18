import { useTokenBucket } from "react-ratelimit";
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

const TOKEN_BUCKET_SIZE = 10;
const TOKEN_BUCKET_INTERVAL = 1000;

export function TokenBucket() {
  const [success, setSuccess] = useState<boolean>();
  const { consume, reset } = useTokenBucket({
    size: TOKEN_BUCKET_SIZE,
    interval: TOKEN_BUCKET_INTERVAL,
  });

  return (
    <div className="w-full flex flex-col gap-4 rounded border p-4">
      <div className="space-y-2 flex-1">
        <h2 className="text-lg font-semibold">Token Bucket</h2>
        <p className="text-sm">
          Uses a bucket that holds tokens, which are required for requests, that
          refill at a set rate allowing bursts up to the bucket&apos;s capacity.
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Success</TableHead>
            <TableHead>Bucket Size</TableHead>
            <TableHead>Refill Interval (ms)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="font-mono font-semibold">
            <TableCell>{success != null ? success.toString() : "-"}</TableCell>
            <TableCell>{TOKEN_BUCKET_SIZE}</TableCell>
            <TableCell>{TOKEN_BUCKET_INTERVAL}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="secondary"
          className="w-full font-semibold"
          onClick={() => setSuccess(consume(1))}
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
