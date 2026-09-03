"use client";

import { useEffect, useRef } from "react";
import { MenuPreview } from "@/components/menu/MenuPreview";
import { useAppData } from "@/context/AppDataContext";

export function PublicMenuClient({ businessId }: { businessId: string }) {
  const data = useAppData();
  const tracked = useRef(false);
  const { ready, trackMenuView } = data;
  useEffect(() => { if (ready && !tracked.current) { tracked.current = true; const source = new URLSearchParams(window.location.search).get("source") === "qr" ? "qr" : "menu"; trackMenuView(source); } }, [ready, trackMenuView]);
  if (!data.ready) return <div className="grid min-h-screen place-items-center bg-slate-50 text-sm text-slate-500">Loading menu…</div>;
  if (businessId !== data.business.id) return <div className="grid min-h-screen place-items-center bg-slate-50 p-6 text-center"><div><h1 className="text-xl font-bold text-slate-800">Menu not found</h1><p className="mt-2 text-sm text-slate-500">Check the QR code and try again.</p></div></div>;
  return <div className="min-h-screen bg-slate-100 py-0 sm:px-4 sm:py-8"><div className="mx-auto min-h-screen max-w-2xl shadow-xl sm:min-h-0 sm:overflow-hidden sm:rounded-2xl"><MenuPreview business={data.business} categories={data.categories} products={data.products} settings={data.menuSettings} /></div></div>;
}
