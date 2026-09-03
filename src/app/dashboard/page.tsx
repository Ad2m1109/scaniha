"use client";

import { CalendarDays, ChevronDown, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LoyaltyCardPreview } from "@/components/dashboard/LoyaltyCardPreview";
import { MemberActivityChart } from "@/components/dashboard/MemberActivityChart";
import { ProgramHealthHero } from "@/components/dashboard/ProgramHealthHero";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { TodaySnapshot } from "@/components/dashboard/TodaySnapshot";
import { TopRewards } from "@/components/dashboard/TopRewards";
import { business } from "@/lib/data/business";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-[1280px]">
      <section className="reveal flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">Program overview</p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h2 className="page-title">Your customer love, at a glance.</h2>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-soft px-3 py-1.5 text-[11px] font-semibold text-muted">
              <span className="grid h-5 w-5 place-items-center rounded-md bg-gold-soft text-amber-700">
                <Sparkles aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.8} />
              </span>
              {business.name}
            </span>
          </div>
          <p className="body-copy mt-2 max-w-xl">Turn everyday visits into lasting habits with a loyalty program your regulars actually want to use.</p>
        </div>
        <Button variant="outline" type="button" className="soft-glass h-10 shrink-0 gap-2 rounded-xl px-3.5 text-xs font-semibold text-muted shadow-[0_4px_12px_#4B31810A] hover:border-purple-300 hover:text-ink" aria-label="Choose date range">
          <CalendarDays aria-hidden="true" className="h-4 w-4 text-purple" strokeWidth={1.8} />
          Jul 01 — Jul 07, 2026
          <ChevronDown aria-hidden="true" className="h-3.5 w-3.5 text-faint" strokeWidth={1.8} />
        </Button>
      </section>

      <ProgramHealthHero />
      <StatsCards />

      <section aria-label="Program activity" className="reveal reveal-delay-2 mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.12fr)_minmax(0,.88fr)]">
        <MemberActivityChart />
        <TodaySnapshot />
      </section>

      <section aria-label="Retention tools" className="reveal reveal-delay-3 mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.12fr)_minmax(0,.88fr)]">
        <LoyaltyCardPreview />
        <TopRewards />
      </section>

      <footer className="mt-7 flex flex-col gap-2 border-t border-line pt-4 text-[11px] font-semibold text-faint sm:flex-row sm:items-center sm:justify-between">
        <span>Perkly for {business.name}</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
          Last synced 2 min ago
        </span>
      </footer>
    </div>
  );
}
