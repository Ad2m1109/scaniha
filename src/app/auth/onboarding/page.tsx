import { redirect } from "next/navigation";
import { auth } from "@/../auth";
import { getOwnerMappingByBusinessId } from "@/lib/server/db";
import { OnboardingWizard } from "@/components/auth/OnboardingWizard";

export default async function OnboardingPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const mapping = await getOwnerMappingByBusinessId(session.user.businessId);
  if (mapping?.onboardingComplete) {
    redirect("/dashboard");
  }

  return <OnboardingWizard />;
}
