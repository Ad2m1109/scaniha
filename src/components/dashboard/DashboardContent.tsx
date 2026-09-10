"use client";

import { useAppData } from "@/context/AppDataContext";
import { DashboardShell } from "./DashboardShell";

export function DashboardContent({ children }: { children: React.ReactNode }) {
  const { ready } = useAppData();

  return (
    <DashboardShell ready={ready}>{children}</DashboardShell>
  );
}
