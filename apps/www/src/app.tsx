import { ExternalLinkIcon } from "lucide-react";
import { TokenBucket } from "./components/token-bucket";
import { Button } from "./components/ui/button";

export default function App() {
  return (
    <main className="mx-auto flex w-full max-w-lg flex-col gap-6 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold underline-offset-4">
          ratelimiters
        </h1>
        <Button size="sm" variant="outline" className="[&_svg]:size-3" asChild>
          <a href="https://github.com/nicholasdly/ratelimiters" target="_blank">
            <span>GitHub</span>
            <ExternalLinkIcon />
          </a>
        </Button>
      </header>
      <blockquote className="border-l-2 py-1 pl-4 font-medium">
        A rate limiter is a technique that controls how often a user can access
        a resource, such as an API endpoint, preventing abuse.
      </blockquote>
      <TokenBucket />
    </main>
  );
}
