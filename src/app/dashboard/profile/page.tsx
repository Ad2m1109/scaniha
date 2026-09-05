"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { BusinessInfoForm } from "@/components/profile/BusinessInfoForm";
import { PageIntro } from "@/components/shared/PageIntro";
import { Button } from "@/components/ui/button";
import { useAppData } from "@/context/AppDataContext";

export default function ProfilePage() {
  const { business } = useAppData();
  return <div className="mx-auto max-w-[1280px] space-y-6"><PageIntro eyebrow="Business profile" title="Make your cafe easy to find." description="These details power your public menu, QR codes, and member experience." action={<Button variant="outline" render={<Link href={`/public/menu/${business.id}`} target="_blank" />} className="gap-2"><ExternalLink className="h-4 w-4" /> View public menu</Button>} /><BusinessInfoForm /></div>;
}
