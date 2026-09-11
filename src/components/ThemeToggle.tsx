"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" type="button" className={className} disabled>
        <span className="h-[17px] w-[17px]" />
      </Button>
    );
  }

  const isDark = theme === "dark";

  return (
    <Button
      variant="outline"
      size="icon"
      type="button"
      className={className}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun aria-hidden="true" className="h-[17px] w-[17px] text-gold" strokeWidth={1.8} />
      ) : (
        <Moon aria-hidden="true" className="h-[17px] w-[17px] text-muted" strokeWidth={1.8} />
      )}
    </Button>
  );
}
