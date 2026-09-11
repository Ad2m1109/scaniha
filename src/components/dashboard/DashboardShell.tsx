"use client";

import { useState } from "react";
import { useTheme } from "next-themes";

import { Header } from "@/components/dashboard/Header";
import { MobileNavigation, Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardSkeleton } from "@/components/shared/LoadingSpinner";
import { cn } from "@/lib/utils";

export function DashboardShell({
  children,
  ready = true,
}: Readonly<{
  children: React.ReactNode;
  ready?: boolean;
}>) {
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const isDark = theme === "dark";

  if (!ready) {
    return <DashboardSkeleton />;
  }

  return (
    <div
      className={cn("dashboard-app", isDark && "dark")}
      data-theme={theme}
      data-mobile-open={mobileOpen}
    >
      <div className="mx-auto grid h-screen max-w-[1540px] lg:grid-cols-[246px_minmax(0,1fr)]">
        <Sidebar />
        <main className="relative min-w-0 overflow-y-auto px-4 pb-10 sm:px-6 lg:px-12 lg:pb-12">
          <Header
            isDark={isDark}
            mobileOpen={mobileOpen}
            hasUnread={hasUnread}
            onMobileToggle={() => setMobileOpen((open) => !open)}
            onNotificationClick={() => setHasUnread(false)}
            onThemeToggle={() => setTheme(isDark ? "light" : "dark")}
          />
          <div id="mobile-navigation">
            <MobileNavigation onNavigate={() => setMobileOpen(false)} />
          </div>
          <div className="pt-6 lg:pt-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
