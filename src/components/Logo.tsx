"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function Logo({ className, size = "default" }: { className?: string; size?: "sm" | "default" | "lg" }) {
  const { theme } = useTheme();
  const mounted = useMounted();

  const isDark = mounted ? theme === "dark" : false;

  const sizeClasses = {
    sm: "h-3.5 w-3.5",
    default: "h-full w-full",
    lg: "h-full w-full",
  };

  return (
    <img
      src={isDark ? "/scaniha-icon-dark.png" : "/scaniha-icon.png"}
      alt="Scaniha"
      className={cn("object-cover", sizeClasses[size], className)}
    />
  );
}
