"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Edit2, Eye, Search, WandSparkles } from "lucide-react";
import { CategoryEditor } from "@/components/menu/CategoryEditor";
import { CategoryForm } from "@/components/menu/CategoryForm";
import { ProductCard } from "@/components/menu/ProductCard";
import { ProductForm } from "@/components/menu/ProductForm";
import { PageIntro } from "@/components/shared/PageIntro";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppData } from "@/context/AppDataContext";
import { cn, driveImage } from "@/lib/utils";
import type { Category } from "@/types";

export default function MenuPage() {
  const { products, categories, business, ready } = useAppData();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return products.filter((product) => {
      const matchesSearch = !query || product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query);
      const matchesCategory = !activeCategory || product.categoryId === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const product of products) {
      counts[product.categoryId] = (counts[product.categoryId] || 0) + 1;
    }
    return counts;
  }, [products]);

  return (
    <div className="mx-auto max-w-[1280px] space-y-4">
      <PageIntro
        eyebrow="Menu board"
        title="Your menu, always in sync."
        description="Keep prices and availability fresh for the digital menu your customers see."
        action={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" render={<Link href="/dashboard/menu-generator" />} className="h-10 gap-2">
              <WandSparkles className="h-4 w-4" /> Create menu
            </Button>
            <Button variant="outline" render={<Link href={`/public/menu/${business.id}`} target="_blank" />} className="h-10 gap-2">
              <Eye className="h-4 w-4" /> Preview
            </Button>
            <CategoryForm />
            <ProductForm />
          </div>
        }
      />

      {/* Category filter chips */}
      {ready && categories.length > 0 && (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className={cn(
              "flex shrink-0 flex-col items-center gap-2 rounded-2xl border px-5 py-4 text-xs font-semibold transition-all",
              activeCategory === null
                ? "border-purple bg-purple text-white shadow-md"
                : "border-line bg-surface-soft text-muted hover:border-purple/40 hover:text-ink"
            )}
          >
            <span className={cn(
              "grid h-14 w-14 place-items-center rounded-xl text-sm font-bold",
              activeCategory === null ? "bg-white/20" : "bg-purple-soft text-purple"
            )}>
              {products.length}
            </span>
            <span className="text-center leading-tight">All</span>
          </button>
          {categories.map((category) => (
            <div key={category.id} className="relative group shrink-0">
              <button
                type="button"
                onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                className={cn(
                  "flex shrink-0 flex-col items-center gap-2 rounded-2xl border px-5 py-4 text-xs font-semibold transition-all",
                  activeCategory === category.id
                    ? "border-purple bg-purple text-white shadow-md"
                    : "border-line bg-surface-soft text-muted hover:border-purple/40 hover:text-ink"
                )}
              >
                {category.image ? (
                  <img src={driveImage(category.image)} alt="" className="h-14 w-14 rounded-xl object-cover" />
                ) : (
                  <span className={cn(
                    "grid h-14 w-14 place-items-center rounded-xl text-lg font-bold",
                    activeCategory === category.id ? "bg-white/20" : "bg-purple-soft text-purple"
                  )}>
                    {category.name.charAt(0)}
                  </span>
                )}
                <span className="max-w-[80px] truncate text-center leading-tight">{category.name}</span>
                <span className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-bold",
                  activeCategory === category.id ? "bg-white/20" : "bg-purple-soft text-purple"
                )}>
                  {categoryCounts[category.id] || 0}
                </span>
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setEditingCategory(category); }}
                className="absolute -top-1.5 -right-1.5 grid h-6 w-6 place-items-center rounded-full bg-surface-solid border border-line shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-purple-soft hover:border-purple/40"
                aria-label={`Edit ${category.name}`}
              >
                <Edit2 className="h-3 w-3 text-muted" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Search */}
      {ready && products.length > 0 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 pl-9 bg-surface-soft"
          />
        </div>
      )}

      {/* Product grid */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {ready && filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Empty states */}
      {ready && !categories.length && (
        <div className="glass-card rounded-2xl p-10 text-center">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-purple-soft">
            <WandSparkles className="h-7 w-7 text-purple" />
          </div>
          <p className="text-lg font-bold text-ink">Build your digital menu</p>
          <p className="mt-2 max-w-sm mx-auto text-sm text-muted">
            Start by adding categories with images, then add products with names, descriptions, and prices.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3">
            <div className="flex items-center gap-3 text-xs text-muted">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-purple-soft text-[10px] font-bold text-purple">1</span>
              Add categories with images
            </div>
            <div className="flex items-center gap-3 text-xs text-muted">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-purple-soft text-[10px] font-bold text-purple">2</span>
              Add products with details
            </div>
            <div className="flex items-center gap-3 text-xs text-muted">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-purple-soft text-[10px] font-bold text-purple">3</span>
              Preview your public menu
            </div>
          </div>
        </div>
      )}

      {ready && categories.length > 0 && !filteredProducts.length && (
        <div className="glass-card rounded-2xl p-10 text-center">
          <p className="font-bold text-ink">No products found</p>
          <p className="mt-1 text-xs text-muted">Try a different search term or category.</p>
        </div>
      )}

      {/* Edit category dialog */}
      {editingCategory && (
        <CategoryEditor
          category={editingCategory}
          open={!!editingCategory}
          onOpenChange={(open) => { if (!open) setEditingCategory(null); }}
        />
      )}
    </div>
  );
}
