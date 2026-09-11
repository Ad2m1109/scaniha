"use client";

import type { CSSProperties } from "react";
import { AtSign as Instagram, Clock3, MapPin, Phone } from "lucide-react";
import { cn, driveImage } from "@/lib/utils";
import { menuDesignPresets, normalizeMenuSettings } from "@/lib/menu-settings";
import type { BusinessProfile, Category, MenuSettings, Product } from "@/types";

export const menuTemplates = [
  { id: "lavender" as const, name: "Clean", description: "Crisp cards and clear sections", swatch: "bg-blue-500" },
  { id: "botanical" as const, name: "Botanical", description: "Soft green and organic", swatch: "bg-emerald-600" },
  { id: "sunset" as const, name: "Warm", description: "Friendly cream and coral", swatch: "bg-orange-500" },
  { id: "noir" as const, name: "Classic", description: "Refined charcoal and ivory", swatch: "bg-slate-700" },
  { id: "mono" as const, name: "Minimal", description: "Simple black and white", swatch: "bg-zinc-500" },
];

const fontClasses = { modern: "font-sans", classic: "font-serif", rounded: "font-sans tracking-wide" };
const radiusClasses = { none: "rounded-none", soft: "rounded-md", rounded: "rounded-2xl" };

export function MenuPreview({ business, categories, products, settings: rawSettings, compact = false }: { business: BusinessProfile; categories: Category[]; products: Product[]; settings: MenuSettings; compact?: boolean }) {
  const settings = normalizeMenuSettings(rawSettings);
  const sorted = [...products].sort((a, b) => a.sortOrder - b.sortOrder);
  const style = {
    "--menu-bg": settings.colors.background,
    "--menu-card": settings.colors.surface,
    "--menu-text": settings.colors.text,
    "--menu-muted": settings.colors.muted,
    "--menu-accent": settings.colors.accent,
  } as CSSProperties;
  const headerHasCover = settings.headerStyle === "cover" && settings.heroImage;

  return (
    <div style={style} className={cn("min-h-full overflow-hidden bg-[var(--menu-bg)] text-[var(--menu-text)]", radiusClasses[settings.borderRadius], fontClasses[settings.fontFamily], compact && "text-[90%]")}>
      <header className={cn("relative overflow-hidden border-b border-black/10 px-5 py-8 sm:px-8", settings.headerStyle === "centered" ? "text-center" : "text-left", settings.headerStyle === "split" && "sm:flex sm:items-center sm:justify-between sm:gap-6", headerHasCover && "min-h-52 text-white sm:flex sm:min-h-60 sm:items-end")}>
        {settings.heroImage ? <div className={cn("absolute inset-0 bg-cover bg-center", headerHasCover ? "opacity-100" : "opacity-15")} style={{ backgroundImage: `url(${driveImage(settings.heroImage)})` }} /> : null}
        {headerHasCover ? <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/5" /> : null}
        <div className={cn("relative", settings.headerStyle === "centered" && "mx-auto", settings.headerStyle === "split" && "max-w-md")}>
          {business.logo ? <div className={cn("mb-3 h-14 w-14 border border-black/10 bg-white bg-cover bg-center", radiusClasses[settings.borderRadius], settings.headerStyle === "centered" && "mx-auto")} style={{ backgroundImage: `url(${driveImage(business.logo)})` }} /> : <div className={cn("mb-3 grid h-12 w-12 place-items-center bg-[var(--menu-accent)] text-lg font-bold text-white", radiusClasses[settings.borderRadius], settings.headerStyle === "centered" && "mx-auto")}>{business.name.charAt(0)}</div>}
          <p className={cn("text-[10px] font-bold uppercase tracking-[.2em]", headerHasCover ? "text-white/80" : "text-[var(--menu-accent)]")}>Digital menu</p>
          <h1 className="mt-2 text-[1.4rem] font-bold tracking-tight">{business.name}</h1>
          <p className={cn("mt-2 max-w-md text-xs leading-relaxed", headerHasCover ? "text-white/80" : "text-[var(--menu-muted)]")}>{settings.tagline || business.description}</p>
        </div>
        <div className={cn("relative mt-4 flex flex-wrap gap-3 text-[10px] font-semibold", settings.headerStyle === "centered" && "justify-center", settings.headerStyle === "split" && "sm:mt-0 sm:max-w-40 sm:justify-end", headerHasCover ? "text-white/80" : "text-[var(--menu-muted)]")}>
          {business.address ? <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{business.address}</span> : null}
          <span className="flex items-center gap-1"><Clock3 className="h-3 w-3" />Open today</span>
        </div>
      </header>

      <main className={cn("px-4 py-6 sm:px-7", settings.layout === "compact" ? "space-y-5" : "space-y-8")}>
        {[...categories].sort((a, b) => a.sortOrder - b.sortOrder).map((category) => {
          const items = sorted.filter((product) => product.categoryId === category.id);
          if (!items.length) return null;
          return <section key={category.id}>
            <div className={cn("mb-3 flex items-center gap-3", settings.categoryStyle === "underline" && "border-b-2 border-[var(--menu-accent)] pb-2", settings.categoryStyle === "filled" && "bg-[var(--menu-accent)] px-3 py-2 text-white", settings.categoryStyle === "filled" && radiusClasses[settings.borderRadius])}>
              {category.image ? <img src={driveImage(category.image)} alt="" className={cn("object-cover", settings.categoryStyle === "filled" ? "h-8 w-8 rounded-lg border border-white/20" : "h-8 w-8 rounded-lg border border-black/10")} /> : null}
              <div>
                <h2 className="text-[15px] font-bold">{category.name}</h2>
                {settings.showDescriptions && category.description ? <p className={cn("mt-0.5 text-[11px]", settings.categoryStyle === "filled" ? "text-white/75" : "text-[var(--menu-muted)]")}>{category.description}</p> : null}
              </div>
            </div>
            <div className={cn("grid", settings.layout === "grid" ? "gap-3 sm:grid-cols-2" : settings.layout === "compact" ? "divide-y divide-black/10" : "gap-3")}>
              {items.map((product) => <article key={product.id} className={cn("flex gap-3", settings.layout === "compact" ? "py-2" : "p-3", settings.cardStyle !== "minimal" && "bg-[var(--menu-card)]", settings.cardStyle === "elevated" && "border border-black/5 shadow-sm", settings.cardStyle === "outline" && "border border-black/15", settings.cardStyle !== "minimal" && radiusClasses[settings.borderRadius], !product.available && "opacity-50")}>
                {settings.showImages && product.image ? <div className={cn("shrink-0 bg-cover bg-center", settings.layout === "compact" ? "h-12 w-12" : "h-16 w-16", radiusClasses[settings.borderRadius])} style={{ backgroundImage: `url(${driveImage(product.image)})` }} /> : null}
                <div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><h3 className="text-[11px] font-bold">{product.name}</h3><div className="flex items-center gap-2"><span className="shrink-0 text-[11px] font-bold text-[var(--menu-accent)]">{settings.currency} {product.price.toFixed(2)}</span>{!product.available && <span className="shrink-0 rounded-full bg-black/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[var(--menu-muted)]">Hidden</span>}</div></div>{settings.showDescriptions && product.description ? <p className="mt-1 text-[10px] leading-relaxed text-[var(--menu-muted)]">{product.description}</p> : null}</div>
              </article>)}
            </div>
          </section>;
        })}
        {!products.length ? <div className="py-16 text-center"><p className="font-bold">The menu is being prepared.</p><p className="mt-1 text-xs text-[var(--menu-muted)]">Please check back soon.</p></div> : null}
      </main>

      {settings.showContactInfo ? <footer className="border-t border-black/10 px-5 py-5 text-center text-[10px] text-[var(--menu-muted)]"><div className="flex flex-wrap justify-center gap-4">{business.phone ? <a href={`tel:${business.phone}`} className="flex items-center gap-1"><Phone className="h-3 w-3" />Call</a> : null}{business.instagram ? <span className="flex items-center gap-1"><Instagram className="h-3 w-3" />{business.instagram}</span> : null}</div><p className="mt-3">Powered by Scaniha</p></footer> : null}
    </div>
  );
}

export { menuDesignPresets };
