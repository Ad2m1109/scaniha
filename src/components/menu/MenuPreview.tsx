"use client";

import { AtSign as Instagram, Clock3, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BusinessProfile, Category, MenuSettings, Product } from "@/types";

export const menuTemplates = [
  { id: "lavender" as const, name: "Clean", description: "Crisp cards and clear sections", swatch: "bg-blue-500" },
  { id: "botanical" as const, name: "Botanical", description: "Soft green and organic", swatch: "bg-emerald-600" },
  { id: "sunset" as const, name: "Warm", description: "Friendly cream and coral", swatch: "bg-orange-500" },
  { id: "noir" as const, name: "Classic", description: "Refined charcoal and ivory", swatch: "bg-slate-700" },
  { id: "mono" as const, name: "Minimal", description: "Simple black and white", swatch: "bg-zinc-500" },
];

const templateClasses = {
  lavender: "bg-[#f6f8fc] text-slate-800 [--menu-accent:#2563eb] [--menu-card:#ffffff] [--menu-muted:#64748b]",
  botanical: "bg-[#f2f7f1] text-[#24352a] [--menu-accent:#3f6f50] [--menu-card:#ffffff] [--menu-muted:#657469]",
  sunset: "bg-[#fff7ed] text-[#452f2a] [--menu-accent:#e66345] [--menu-card:#fffdf9] [--menu-muted:#806c64]",
  noir: "bg-[#f5f2eb] text-[#292824] [--menu-accent:#292824] [--menu-card:#fffcf5] [--menu-muted:#746f65]",
  mono: "bg-white text-black [--menu-accent:#111111] [--menu-card:#ffffff] [--menu-muted:#737373]",
};

export function MenuPreview({ business, categories, products, settings, compact = false }: { business: BusinessProfile; categories: Category[]; products: Product[]; settings: MenuSettings; compact?: boolean }) {
  const available = products.filter((product) => product.available).sort((a, b) => a.sortOrder - b.sortOrder);
  return <div className={cn("min-h-full overflow-hidden rounded-2xl", templateClasses[settings.template], compact && "text-[90%]")}>
    <header className="relative overflow-hidden border-b border-black/10 px-5 py-8 text-center sm:px-8">{settings.heroImage ? <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: `url(${settings.heroImage})` }} /> : null}<div className="relative">{business.logo ? <div className="mx-auto mb-3 h-14 w-14 rounded-full border border-black/10 bg-white bg-cover bg-center" style={{ backgroundImage: `url(${business.logo})` }} /> : <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-[var(--menu-accent)] text-lg font-bold text-white">{business.name.charAt(0)}</div>}<p className="text-[10px] font-bold uppercase tracking-[.2em] text-[var(--menu-accent)]">Digital menu</p><h1 className="mt-2 text-2xl font-bold tracking-tight">{business.name}</h1><p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-[var(--menu-muted)]">{settings.tagline || business.description}</p><div className="mt-4 flex flex-wrap justify-center gap-3 text-[10px] font-semibold text-[var(--menu-muted)]">{business.address ? <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{business.address}</span> : null}<span className="flex items-center gap-1"><Clock3 className="h-3 w-3" />Open today</span></div></div></header>
    <main className="space-y-8 px-4 py-6 sm:px-7">{[...categories].sort((a, b) => a.sortOrder - b.sortOrder).map((category) => { const items = available.filter((product) => product.categoryId === category.id); if (!items.length) return null; return <section key={category.id}><div className="mb-3"><h2 className="text-base font-bold">{category.name}</h2><p className="mt-0.5 text-[11px] text-[var(--menu-muted)]">{category.description}</p></div><div className={cn("grid gap-3", settings.template === "mono" ? "divide-y divide-black/10" : "sm:grid-cols-2")}>{items.map((product) => <article key={product.id} className={cn("flex gap-3", settings.template === "mono" ? "py-3" : "rounded-xl border border-black/10 bg-[var(--menu-card)] p-3 shadow-sm")}>{product.image ? <div className="h-16 w-16 shrink-0 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} /> : null}<div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><h3 className="text-xs font-bold">{product.name}</h3><span className="shrink-0 text-xs font-bold text-[var(--menu-accent)]">{settings.currency} {product.price.toFixed(2)}</span></div><p className="mt-1 text-[10px] leading-relaxed text-[var(--menu-muted)]">{product.description}</p></div></article>)}</div></section>; })}{!available.length ? <div className="py-16 text-center"><p className="font-bold">The menu is being prepared.</p><p className="mt-1 text-xs text-[var(--menu-muted)]">Please check back soon.</p></div> : null}</main>
    <footer className="border-t border-black/10 px-5 py-5 text-center text-[10px] text-[var(--menu-muted)]"><div className="flex flex-wrap justify-center gap-4">{business.phone ? <a href={`tel:${business.phone}`} className="flex items-center gap-1"><Phone className="h-3 w-3" />Call</a> : null}{business.instagram ? <span className="flex items-center gap-1"><Instagram className="h-3 w-3" />{business.instagram}</span> : null}</div><p className="mt-3">Powered by Perkly</p></footer>
  </div>;
}
