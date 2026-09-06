import { redirect } from "next/navigation";
import { auth } from "@/../auth";
import { getOwnerMapping } from "@/lib/server/db";
import { Providers } from "@/components/Providers";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AppDataProvider } from "@/context/AppDataContext";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const mapping = getOwnerMapping(session.user.businessId);
  if (mapping && !mapping.onboardingComplete) {
    redirect("/auth/onboarding");
  }

  return (
    <Providers>
      <AppDataProvider>
        <DashboardShell>{children}</DashboardShell>
      </AppDataProvider>
    </Providers>
  );
}
