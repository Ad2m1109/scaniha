"use server";

import { redirect } from "next/navigation";
import { auth } from "@/../auth";
import { getOwnerMapping, saveOwnerMapping } from "@/lib/server/db";
import { writeSnapshot } from "@/lib/server/snapshots";

interface OnboardingInput {
  businessName: string;
  tagline: string;
  phone: string;
  address: string;
  description: string;
  logo: string;
  facebook: string;
  instagram: string;
  whatsapp: string;
  loyaltyEnabled: boolean;
  pointsPerVisit: number;
  welcomeBonus: number;
}

export async function completeOnboarding(data: OnboardingInput) {
  const session = await auth();
  if (!session?.user?.businessId) {
    redirect("/auth/login");
  }

  const sub = session.user.businessId;
  const mapping = getOwnerMapping(sub);

  if (mapping) {
    mapping.onboardingComplete = true;
    saveOwnerMapping(mapping);
  }

  const business = {
    id: session.user.businessId,
    name: data.businessName,
    tagline: data.tagline,
    location: data.address,
    ownerName: session.user.name || "",
    memberCount: 0,
    activeMembers: 0,
    memberGoal: 2000,
    createdAt: new Date().toISOString().slice(0, 10),
    phone: data.phone,
    address: data.address,
    description: data.description,
    logo: data.logo,
    facebook: data.facebook,
    instagram: data.instagram,
    whatsapp: data.whatsapp,
    menuPdfUrl: "",
  };

  const settings = {
    template: "lavender" as const,
    currency: "DA",
    heroImage: "",
    tagline: data.tagline,
  };

  try {
    writeSnapshot(session.user.businessId, business, settings, [], []);
  } catch (e) {
    console.error("Failed to write snapshot:", e);
  }

  redirect("/dashboard");
}
