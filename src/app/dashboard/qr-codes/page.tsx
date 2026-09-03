"use client";

import { Download, QrCode } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageIntro } from "@/components/shared/PageIntro";

export default function QRCodesPage() {
  return (
    <div className="mx-auto max-w-[1280px] space-y-6">
      <PageIntro
        eyebrow="Menu & member codes"
        title="One scan, every visit."
        description="Print these QR codes for the counter, tables, and takeaway bags."
      />

      <section aria-label="QR codes" className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Card className="glass-card border-0 ring-0">
          <CardHeader className="p-6 pb-0">
            <CardTitle className="card-title">Menu QR code</CardTitle>
            <p className="mt-1 text-xs text-muted">Scans open the digital menu instantly.</p>
          </CardHeader>
          <CardContent className="flex flex-col items-center p-6">
            <div className="mb-5 grid h-44 w-44 place-items-center rounded-2xl border border-line bg-surface-soft">
              <QrCode aria-hidden="true" className="h-28 w-28 text-ink" strokeWidth={1.4} />
            </div>
            <Button
              type="button"
              className="h-10 gap-2 rounded-xl bg-purple px-4 text-xs font-bold text-white shadow-[0_8px_18px_#7C3AED2E] hover:bg-purple-dark"
            >
              <Download aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
              Download QR
            </Button>
          </CardContent>
        </Card>

        <Card className="glass-card border-0 ring-0">
          <CardHeader className="p-6 pb-0">
            <CardTitle className="card-title">Member QR codes</CardTitle>
            <p className="mt-1 text-xs text-muted">Assign a code to each card you hand out.</p>
          </CardHeader>
          <CardContent className="space-y-3 p-6">
            {[
              { name: "Ahmed Benali", code: "CUST-001" },
              { name: "Sarah Khelil", code: "CUST-002" },
            ].map((customer) => (
              <div
                key={customer.code}
                className="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface-soft px-4 py-3"
              >
                <div>
                  <p className="text-xs font-bold text-ink">{customer.name}</p>
                  <p className="mt-0.5 text-[11px] text-muted">{customer.code}</p>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  className="icon-button h-9 w-9 rounded-xl border-line bg-surface-solid"
                  aria-label={`Download QR code for ${customer.name}`}
                >
                  <Download aria-hidden="true" className="h-4 w-4 text-muted" strokeWidth={1.8} />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
