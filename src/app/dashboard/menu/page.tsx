"use client";

import Link from "next/link";
import { Eye, WandSparkles } from "lucide-react";
import { CategoryList } from "@/components/menu/CategoryList";
import { ProductCard } from "@/components/menu/ProductCard";
import { ProductForm } from "@/components/menu/ProductForm";
import { PageIntro } from "@/components/shared/PageIntro";
import { Button } from "@/components/ui/button";
import { useAppData } from "@/context/AppDataContext";

export default function MenuPage() {
  const { products, business, ready } = useAppData();
  return <div className="mx-auto max-w-[1280px] space-y-6">
    <PageIntro eyebrow="Menu board" title="Your menu, always in sync." description="Keep prices and availability fresh for the digital menu your customers see." action={<div className="flex flex-wrap gap-2"><Button variant="outline" render={<Link href="/dashboard/menu-generator" />} className="h-10 gap-2"><WandSparkles className="h-4 w-4" /> Create menu</Button><Button variant="outline" render={<Link href={`/public/menu/${business.id}`} target="_blank" />} className="h-10 gap-2"><Eye className="h-4 w-4" /> Preview</Button><ProductForm /></div>} />
    <div className="grid gap-5 xl:grid-cols-[280px_minmax(0,1fr)]"><CategoryList /><section aria-label="Menu items" className="grid grid-cols-1 gap-4 md:grid-cols-2">{ready && products.map((product) => <ProductCard key={product.id} product={product} />)}{ready && !products.length ? <div className="glass-card col-span-full rounded-2xl p-10 text-center"><p className="font-bold text-ink">Your menu is empty</p><p className="mt-1 text-xs text-muted">Add your first category and product to publish a menu.</p></div> : null}</section></div>
  </div>;
}
