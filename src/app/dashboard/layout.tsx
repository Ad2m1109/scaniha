import { redirect } from "next/navigation";
import { auth } from "@/../auth";
import { getOwnerMappingByBusinessId } from "@/lib/server/db";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
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
  );
}
