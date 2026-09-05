"use client";

import { CakeSlice, ExternalLink, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppData } from "@/context/AppDataContext";
import { formatNumber } from "@/lib/formatters";

function StampRow() {
  return (
    <div className="flex gap-1.5" aria-label="8 of 10 stamps collected">
      {Array.from({ length: 10 }, (_, index) => {
        const isFilled = index < 8;
        return (
          <span key={index} className={`stamp ${isFilled ? "is-filled" : "is-empty"}`}>
            {isFilled ? <span aria-hidden="true" className="text-[10px] font-bold text-white">✓</span> : null}
          </span>
        );
      })}
    </div>
  );
}

export function LoyaltyCardPreview() {
  const { business, customers } = useAppData();
  const selectedMember = customers[0];
  if (!selectedMember) return null;
  return (
    <Card className="glass-card min-w-0 border-0 p-0 ring-0">
      <CardHeader className="flex flex-row items-start justify-between gap-3 p-5 pb-0 sm:p-6 sm:pb-0">
        <div>
          <p className="eyebrow">Digital loyalty card</p>
          <CardTitle className="mt-1.5">A little progress goes a long way.</CardTitle>
        </div>
        <Button variant="outline" size="icon" type="button" className="icon-button h-9 w-9 rounded-xl bg-surface-soft" aria-label="Open loyalty card" title="Open loyalty card">
          <ExternalLink aria-hidden="true" className="h-4 w-4 text-muted" strokeWidth={1.8} />
        </Button>
      </CardHeader>
      <CardContent className="p-5 pt-4 sm:p-6 sm:pt-5">
        <div className="loyalty-card rounded-2xl p-5 sm:p-6">
          <div className="relative z-10 flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-[10px] border border-line bg-white">
                <Sparkles aria-hidden="true" className="h-4 w-4 text-gold" strokeWidth={1.8} />
              </span>
              <span className="text-[13px] font-bold tracking-[-.02em] text-white">{business.name}</span>
            </div>
            <Badge className="h-auto rounded-full border border-line bg-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.15em] text-accent-foreground">Gold tier</Badge>
          </div>
          <div className="relative z-10 mt-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-white/80">{selectedMember.name}</p>
              <p className="mt-1 text-[11px] text-white/60">Member since Jan 2024</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[.13em] text-white/80">Balance</p>
              <p className="numeric mt-1 text-xl font-bold tracking-[-.04em] text-white">
                {formatNumber(selectedMember.points)} <span className="text-[10px] font-semibold text-white/70">pts</span>
              </p>
            </div>
          </div>
          <div className="relative z-10 mt-6 flex items-center justify-between gap-3">
            <StampRow />
            <span className="whitespace-nowrap text-[11px] font-bold text-gold">8 / 10 stamps</span>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-[11px] font-semibold text-muted">
          <CakeSlice aria-hidden="true" className="h-3.5 w-3.5 text-gold" strokeWidth={1.8} />
          <span>2 visits to your free pastry</span>
          <Badge className="ml-auto h-auto rounded-full border-0 bg-gold-soft px-2 py-1 text-[10px] font-bold text-accent-foreground">Almost there</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
