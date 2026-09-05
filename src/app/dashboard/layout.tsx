import { redirect } from "next/navigation";
import { auth } from "@/../auth";
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

  return (
    <AppDataProvider>
      <DashboardShell>{children}</DashboardShell>
    </AppDataProvider>
  );
}
