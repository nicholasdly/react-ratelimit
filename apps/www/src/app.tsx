import { FixedWindow } from "./components/fixed-window";
import { SlidingLog } from "./components/sliding-log";
import { Throttler } from "./components/throttler";
import { TokenBucket } from "./components/token-bucket";
import { Button } from "./components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./components/ui/tooltip";

function Header() {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold underline-offset-4">
        react-ratelimit
      </h1>
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full [&_svg]:size-6"
          asChild
        >
          <a
            href="https://www.npmjs.com/package/react-ratelimit"
            target="_blank"
            rel="noreferrer"
          >
            <span className="sr-only">npm</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path
                fill="currentColor"
                d="M288 288h-32v-64h32v64zm288-128v192H288v32H160v-32H0V160h576zm-416 32H32v128h64v-96h32v96h32V192zm160 0H192v160h64v-32h64V192zm224 0H352v128h64v-96h32v96h32v-96h32v96h32V192z"
              />
            </svg>
          </a>
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full [&_svg]:size-6"
          asChild
        >
          <a
            href="https://github.com/nicholasdly/react-ratelimit"
            target="_blank"
            rel="noreferrer"
          >
            <span className="sr-only">GitHub</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
              <path
                fill="currentColor"
                d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
              ></path>
            </svg>
          </a>
        </Button>
      </div>
    </header>
  );
}

function Definition({
  definition,
  children,
}: Readonly<{ definition: string; children: string }>) {
  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger>
        <span className="underline decoration-dashed underline-offset-6">
          {children}
        </span>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs py-2" side="bottom">
        <p>{definition}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default function App() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-6">
      <Header />
      <main className="space-y-6">
        <blockquote className="border-l-2 py-1 pl-4 font-medium">
          A ready-to-use TypeScript library of React hooks for client-side{" "}
          <Definition definition="A rate limiter is a technique that controls how often a user can access a resource, such as a function or API endpoint, preventing abuse.">
            rate limiting
          </Definition>
          , by Nicholas Ly.
        </blockquote>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <TokenBucket />
          <Throttler />
          <FixedWindow />
          <SlidingLog />
        </div>
      </main>
    </div>
  );
}
