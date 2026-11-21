import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
<<<<<<< HEAD
import type { Customer } from "@/types"
=======
>>>>>>> origin/main

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
<<<<<<< HEAD

export function generateId(prefix: string) {
  const suffix = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${prefix}-${suffix}`;
}

export function customerTier(points: number): Customer["tier"] {
  if (points >= 1000) return "Gold";
  if (points >= 500) return "Silver";
  return "Bronze";
}

export function driveImage(url: string | undefined | null): string {
  if (!url) return "";
  if (url.startsWith("data:") || url.startsWith("/")) return url;
  if (!url.startsWith("http://") && !url.startsWith("https://")) return "";
  return `/api/image?url=${encodeURIComponent(url)}`;
}
=======
>>>>>>> origin/main
