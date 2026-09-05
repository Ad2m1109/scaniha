"use client";

import { RewardForm } from "@/components/rewards/RewardForm";
import { RewardsList } from "@/components/rewards/RewardsList";
import { PageIntro } from "@/components/shared/PageIntro";

export default function RewardsPage() {
  return <div className="mx-auto max-w-[1280px] space-y-6"><PageIntro eyebrow="Rewards catalog" title="Rewards worth coming back for." description="Create, pause, and manage the perks members can redeem." action={<RewardForm />} /><RewardsList /></div>;
}
