"use client";

import { useState } from "react";
import { CalendarDays, ChevronDown, Sparkles } from "lucide-react";
import Link from "next/link";
import { QrCode, ScanLine, UserPlus, WandSparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LoyaltyCardPreview } from "@/components/dashboard/LoyaltyCardPreview";
import { MemberActivityChart } from "@/components/dashboard/MemberActivityChart";
import { ProgramHealthHero } from "@/components/dashboard/ProgramHealthHero";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { TopRewards } from "@/components/dashboard/TopRewards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppData } from "@/context/AppDataContext";

function DateRange() {
  const [now] = useState(() => Date.now());
  const start = new Date(now).toLocaleDateString("en", { month: "short", day: "numeric" });
  const end = new Date(now + 6 * 86_400_000).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" });
  return <>{start} — {end}</>;
}

export default function DashboardPage() {
  const { business } = useAppData();
  return (
    <div className="mx-auto max-w-[1280px]">
      <section className="reveal flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">Program overview</p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h2 className="page-title">Your customer love, at a glance.</h2>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-soft px-3 py-1.5 text-[11px] font-semibold text-muted">
              <span className="grid h-5 w-5 place-items-center rounded-md bg-gold-soft text-accent-foreground">
                <Sparkles aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.8} />
              </span>
              {business.name}
            </span>
          </div>
          <p className="body-copy mt-2 max-w-xl">Turn everyday visits into lasting habits with a loyalty program your regulars actually want to use.</p>
        </div>
        <Button variant="outline" type="button" className="soft-glass h-10 shrink-0 gap-2 rounded-xl px-3.5 text-xs font-semibold text-muted shadow-sm hover:border-line-strong hover:text-ink" aria-label="Choose date range">
          <CalendarDays aria-hidden="true" className="h-4 w-4 text-purple" strokeWidth={1.8} />
          <DateRange />
          <ChevronDown aria-hidden="true" className="h-3.5 w-3.5 text-faint" strokeWidth={1.8} />
        </Button>
      </section>

      <ProgramHealthHero />
      <StatsCards />

      <section aria-label="Program activity" className="reveal reveal-delay-2 mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.12fr)_minmax(0,.88fr)]">
        <MemberActivityChart />
        <RecentActivity />
      </section>

      <section aria-label="Retention tools" className="reveal reveal-delay-3 mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.12fr)_minmax(0,.88fr)]">
        <LoyaltyCardPreview />
        <Card className="glass-card border-0 ring-0"><CardHeader><CardTitle className="card-title">Quick actions</CardTitle><p className="text-xs text-muted">Common counter tasks, one click away.</p></CardHeader><CardContent className="grid grid-cols-2 gap-3">{[
          { href: "/dashboard/scanner", label: "Scan customer", icon: ScanLine },
          { href: "/dashboard/customers", label: "Add customer", icon: UserPlus },
          { href: "/dashboard/menu-generator", label: "Create menu", icon: WandSparkles },
          { href: "/dashboard/qr-codes", label: "Menu QR", icon: QrCode },
        ].map((action) => <Link key={action.href} href={action.href} className="rounded-xl border border-line bg-surface-soft p-4 transition hover:border-purple/30 hover:bg-purple-wash"><action.icon className="h-5 w-5 text-purple" /><p className="mt-3 text-xs font-bold text-ink">{action.label}</p></Link>)}</CardContent></Card>
      </section>

      <section className="reveal reveal-delay-4 mt-5"><TopRewards /></section>

      <footer className="mt-7 flex flex-col gap-2 border-t border-line pt-4 text-[11px] font-semibold text-faint sm:flex-row sm:items-center sm:justify-between">
        <span>Perkly for {business.name}</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
          Last synced 2 min ago
        </span>
      </footer>
    </div>
  );
}
