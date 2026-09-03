"use client";

import Link from "next/link";
import { ScanLine } from "lucide-react";
import { QRCodeGenerator } from "@/components/qr/QRCodeGenerator";
import { PageIntro } from "@/components/shared/PageIntro";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppData } from "@/context/AppDataContext";

export default function QRCodesPage() {
  const data = useAppData();
  const origin = typeof window === "undefined" ? "https://perkly.local" : window.location.origin;
  const menuUrl = `${origin}/public/menu/${data.business.id}?source=qr`;
  return <div className="mx-auto max-w-[1280px] space-y-6"><PageIntro eyebrow="Menu & member codes" title="One scan, every visit." description="Print these QR codes for the counter, tables, and customer cards." action={<Button render={<Link href="/dashboard/scanner" />} className="gap-2 bg-purple text-white"><ScanLine className="h-4 w-4" /> Open staff scanner</Button>} /><section className="grid gap-5 md:grid-cols-2"><Card className="glass-card border-0 ring-0"><CardHeader><CardTitle className="card-title">Menu QR code</CardTitle><p className="text-xs text-muted">Links directly to the live public menu.</p></CardHeader><CardContent><QRCodeGenerator value={menuUrl} filename={`${data.business.id}-menu`} /><p className="mx-auto mt-4 max-w-sm break-all text-center text-[10px] text-muted">{menuUrl}</p></CardContent></Card><Card className="glass-card border-0 ring-0"><CardHeader><CardTitle className="card-title">Customer QR codes</CardTitle><p className="text-xs text-muted">Every member has a unique identity for staff scans.</p></CardHeader><CardContent className="space-y-2">{data.customers.slice(0, 8).map((customer) => <Link key={customer.id} href={`/dashboard/customers/${customer.id}`} className="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface-soft p-3 hover:border-line-strong"><div><p className="text-xs font-bold text-ink">{customer.name}</p><code className="text-[10px] text-muted">{customer.qrCode}</code></div><span className="text-[11px] font-bold text-purple">View QR</span></Link>)}</CardContent></Card></section></div>;
}
