"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAppData } from "@/context/AppDataContext";
import { formatNumber, formatPercent } from "@/lib/formatters";

export function ProgramHealthHero() {
  const data = useAppData();
  const business = data.business;
  const memberProgress = Math.round((data.customers.length / business.memberGoal) * 100);

  return (
    <section
      aria-label="Loyalty program health summary"
      className="hero-card reveal reveal-delay-1 relative mt-7 overflow-hidden rounded-2xl px-6 py-7 sm:px-8 lg:px-9 lg:py-8"
      style={{ color: '#FFFFFF' }}
    >
      <div className="relative z-10 grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-center">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="inline-flex h-auto gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-[11px] font-bold text-purple-dark">
              <Sparkles aria-hidden="true" className="h-3.5 w-3.5 text-gold" strokeWidth={1.8} />
              Rewards unlocked
            </Badge>
            <Badge className="h-auto rounded-full border border-line bg-white px-3 py-1.5 text-[11px] font-semibold" style={{ color: 'var(--ink)' }}>
              This month
            </Badge>
          </div>
          <h2 className="mt-5 max-w-lg text-[25px] font-bold leading-[1.12] tracking-[-.045em] sm:text-[30px]">
            Your loyalty program is on a roll.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
            Members are visiting more often and redeeming rewards faster than last month. Keep the momentum going.
          </p>
          <div className="mt-7 max-w-xl">
            <div className="flex items-center justify-between gap-4 text-[11px] font-semibold" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
              <span>Member goal progress</span>
              <span className="numeric" style={{ color: '#FFFFFF' }}>
                {formatNumber(data.customers.length)} <span className="font-normal" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>/ {formatNumber(business.memberGoal)} members</span>
              </span>
            </div>
            <Progress
              value={memberProgress}
              aria-label="Member goal progress"
              className="mt-2 flex-1 gap-0 [&_[data-slot=progress-track]]:h-2 [&_[data-slot=progress-track]]:bg-white/20 [&_[data-slot=progress-indicator]]:bg-gold"
            />
            <div className="mt-2 flex items-center justify-between gap-4 text-[10px] font-semibold" style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
              <span>Keep inviting your regulars</span>
              <span className="numeric" style={{ color: '#FFFFFF' }}>{memberProgress}%</span>
            </div>
          </div>
        </div>

        <div className="soft-glass rounded-2xl border-line bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[.16em]" style={{ color: 'var(--ink)' }}>
            <span>Active members</span>
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-purple" strokeWidth={1.8} />
          </div>
          <div className="mt-3 flex items-end gap-3">
            <p className="numeric text-[42px] font-bold leading-none tracking-[-.06em]" style={{ color: 'var(--ink)' }}>{formatNumber(data.customers.length)}</p>
            <Badge className="mb-1 h-auto rounded-full border-0 bg-success-soft px-2 py-1 text-[10px] font-bold text-success">
              +{formatPercent(data.customers.length / Math.max(1, business.memberGoal))}
            </Badge>
          </div>
          <div className="mt-5 h-px bg-line" />
          <div className="mt-3 flex items-center justify-between text-[11px] font-semibold">
            <span style={{ color: 'var(--muted)' }}>vs. last month</span>
            <span className="numeric" style={{ color: 'var(--ink)' }}>+146 members</span>
          </div>
        </div>
      </div>
    </section>
  );
}
