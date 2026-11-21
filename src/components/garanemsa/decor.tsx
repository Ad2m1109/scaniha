import { cn } from "@/lib/utils";

/**
 * Small olive-branch line drawing used as a botanical accent.
 * Purely decorative — never announced to assistive technology.
 */
export function LeafBranch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 200"
      fill="none"
      className={cn("gr-leaf-branch", className)}
      aria-hidden="true"
    >
      <path
        d="M62 194C59 145 65 96 96 28"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M74 138C88 124 103 121 113 126C106 140 90 146 74 138Z"
        fill="currentColor"
        opacity=".62"
      />
      <path
        d="M67 116C54 103 39 101 29 106C36 120 52 124 67 116Z"
        fill="currentColor"
        opacity=".48"
      />
      <path
        d="M81 94C94 81 108 78 118 83C111 97 95 102 81 94Z"
        fill="currentColor"
        opacity=".62"
      />
      <path
        d="M73 72C61 59 47 57 37 62C44 76 59 80 73 72Z"
        fill="currentColor"
        opacity=".48"
      />
      <path
        d="M88 51C99 40 111 38 120 42C114 54 101 59 88 51Z"
        fill="currentColor"
        opacity=".58"
      />
      <path
        d="M86 33C79 22 67 19 58 23C63 35 75 40 86 33Z"
        fill="currentColor"
        opacity=".4"
      />
      <circle cx="70" cy="127" r="2.4" fill="currentColor" opacity=".7" />
      <circle cx="77" cy="84" r="2.1" fill="currentColor" opacity=".55" />
      <circle cx="82" cy="45" r="1.8" fill="currentColor" opacity=".45" />
    </svg>
  );
}

export function LeafMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("gr-leaf-mark", className)}
      aria-hidden="true"
    >
      <path
        d="M20.5 3.5C12 3.5 5.5 7.2 5.5 14.2c0 2.3 1.2 4.1 3.3 4.9 5.9 2.2 11.7-3.7 11.7-15.6Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 21c1.4-5.6 4.2-9.4 8.7-12.4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function InstagramMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("gr-instagram", className)}
      aria-hidden="true"
    >
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function FacebookMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn("gr-facebook", className)}
      aria-hidden="true"
    >
      <path
        d="M13.5 21v-7h2.4l.4-3h-2.8V9.2c0-.9.3-1.5 1.6-1.5h1.4V5.1c-.3 0-1.1-.1-2.1-.1-2.1 0-3.5 1.3-3.5 3.6V11H8.5v3h2.4v7h2.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Divider({ className }: { className?: string }) {  return (
    <div className={cn("gr-divider", className)} aria-hidden="true">
      <span />
      <LeafMark />
      <span />
    </div>
  );
}

/**
 * Large, low-opacity composition of rings and branches used behind dark
 * sections. Purely decorative.
 */
export function BotanicalPattern({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 600"
      fill="none"
      className={cn("gr-botanical", className)}
      aria-hidden="true"
    >
      <circle cx="300" cy="300" r="248" stroke="currentColor" strokeWidth="1" />
      <circle
        cx="300"
        cy="300"
        r="206"
        stroke="currentColor"
        strokeWidth="1"
        opacity=".6"
      />
      <circle
        cx="300"
        cy="300"
        r="160"
        stroke="currentColor"
        strokeWidth="1"
        opacity=".35"
      />
      <path
        d="M300 552C300 420 330 300 432 148"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M352 372C394 330 444 320 482 338C456 382 404 400 352 372Z"
        fill="currentColor"
        opacity=".5"
      />
      <path
        d="M330 314C286 274 232 268 198 288C226 330 280 344 330 314Z"
        fill="currentColor"
        opacity=".38"
      />
      <path
        d="M368 246C406 208 452 200 486 216C462 254 416 268 368 246Z"
        fill="currentColor"
        opacity=".44"
      />
      <path
        d="M394 196C424 166 462 160 488 172C470 202 434 212 394 196Z"
        fill="currentColor"
        opacity=".3"
      />
      <circle cx="344" cy="342" r="3.2" fill="currentColor" opacity=".6" />
      <circle cx="382" cy="226" r="2.8" fill="currentColor" opacity=".45" />
    </svg>
  );
}
