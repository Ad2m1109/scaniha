"use client";

import { ArrowDown, ArrowUp, Edit, ImageIcon, Trash2 } from "lucide-react";

import { ProductForm } from "@/components/menu/ProductForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppData } from "@/context/AppDataContext";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const { categories, saveProduct, deleteProduct, moveProduct, menuSettings } = useAppData();
  const category = categories.find((item) => item.id === product.categoryId);

  return (
    <Card className="glass-card min-w-0 overflow-hidden border-0 p-0 ring-0">
      {product.image ? <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} /> : <div className="grid h-24 place-items-center bg-surface-soft"><ImageIcon className="h-6 w-6 text-faint" /></div>}
      <CardContent className="flex min-h-[170px] flex-col p-5">
        <div className="flex items-start justify-between gap-3"><div><h2 className="card-title">{product.name}</h2><p className="mt-1 text-xs text-muted">{category?.name ?? "Uncategorized"}</p></div><button type="button" onClick={() => saveProduct({ ...product, available: !product.available })}><Badge className={product.available ? "border-0 bg-success-soft text-success" : "border-0 bg-destructive/10 text-destructive"}>{product.available ? "Available" : "Hidden"}</Badge></button></div>
        <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-muted">{product.description || "No description yet."}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-5"><p className="metric-value text-xl">{menuSettings.currency} {product.price.toFixed(2)}</p><div className="flex gap-1"><Button variant="ghost" size="icon-sm" onClick={() => moveProduct(product.id, -1)} aria-label="Move up"><ArrowUp className="h-3.5 w-3.5" /></Button><Button variant="ghost" size="icon-sm" onClick={() => moveProduct(product.id, 1)} aria-label="Move down"><ArrowDown className="h-3.5 w-3.5" /></Button><ProductForm product={product} trigger={<Button variant="outline" size="icon-sm" aria-label={`Edit ${product.name}`}><Edit className="h-3.5 w-3.5" /></Button>} /><Button variant="outline" size="icon-sm" onClick={() => { if (window.confirm(`Delete ${product.name}?`)) deleteProduct(product.id); }} aria-label={`Delete ${product.name}`}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button></div></div>
      </CardContent>
    </Card>
  );
}
