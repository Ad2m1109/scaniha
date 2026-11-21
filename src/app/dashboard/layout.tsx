<<<<<<< HEAD
import { redirect } from "next/navigation";
import { auth } from "@/../auth";
import { getOwnerMappingByBusinessId } from "@/lib/server/db";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { AppDataProvider } from "@/context/AppDataContext";

export default async function DashboardLayout({
=======
"use client";

import { useState } from "react";

import { Header } from "@/components/dashboard/Header";
import { MobileNavigation, Sidebar } from "@/components/dashboard/Sidebar";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
>>>>>>> origin/main
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
<<<<<<< HEAD
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const mapping = await getOwnerMappingByBusinessId(session.user.businessId);
  
  // Verify ownership: the authenticated user must own this businessId
  if (mapping && mapping.sub !== session.user.googleSub) {
    redirect("/auth/login");
  }

  if (mapping && !mapping.onboardingComplete) {
    redirect("/auth/onboarding");
  }

  return (
    <AppDataProvider>
      <DashboardContent>{children}</DashboardContent>
    </AppDataProvider>
=======
  const [isDark, setIsDark] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  return (
    <div
      className={cn("dashboard-app", isDark && "dark")}
      data-theme={isDark ? "dark" : "light"}
      data-mobile-open={mobileOpen}
    >
      <div className="mx-auto grid min-h-screen max-w-[1540px] lg:grid-cols-[246px_minmax(0,1fr)]">
        <Sidebar />
        <main className="relative min-w-0 px-4 pb-10 sm:px-6 lg:px-12 lg:pb-12">
          <Header
            isDark={isDark}
            mobileOpen={mobileOpen}
            hasUnread={hasUnread}
            onMobileToggle={() => setMobileOpen((open) => !open)}
            onNotificationClick={() => setHasUnread(false)}
            onThemeToggle={() => setIsDark((dark) => !dark)}
          />
          <div id="mobile-navigation">
            <MobileNavigation onNavigate={() => setMobileOpen(false)} />
          </div>
          <div className="pt-6 lg:pt-8">{children}</div>
        </main>
      </div>
    </div>
>>>>>>> origin/main
  );
}
