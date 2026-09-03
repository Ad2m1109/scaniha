"use client";

import { useState } from "react";
import { ImagePlus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAppData } from "@/context/AppDataContext";
import type { Product } from "@/types";

interface ProductFormProps {
  product?: Product;
  trigger?: React.ReactElement;
}

const blank = { name: "", description: "", price: "", image: "", categoryId: "", available: true };

export function ProductForm({ product, trigger }: ProductFormProps) {
  const { categories, saveProduct } = useAppData();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(blank);

  function changeOpen(nextOpen: boolean) {
    if (nextOpen) setForm(product ? { ...product, price: String(product.price) } : { ...blank, categoryId: categories[0]?.id ?? "" });
    setOpen(nextOpen);
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim() || !form.categoryId || Number(form.price) < 0) return;
    saveProduct({
      id: product?.id,
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      image: form.image.trim(),
      categoryId: form.categoryId,
      available: form.available,
    });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={changeOpen}>
      <DialogTrigger render={trigger ?? <Button type="button" className="h-10 gap-2 rounded-xl bg-purple px-4 text-xs font-bold text-white" />}>
        <Plus className="h-4 w-4" /> {product ? "Edit product" : "Add product"}
      </DialogTrigger>
      <DialogContent className="glass-card max-h-[90vh] max-w-lg overflow-y-auto border-line bg-surface-solid p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-ink">{product ? "Edit product" : "Add product"}</DialogTitle>
          <DialogDescription>Changes appear on the public menu immediately.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2"><Label htmlFor="product-name">Name</Label><Input id="product-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-10 bg-surface-soft" /></div>
          <div className="space-y-2"><Label htmlFor="product-description">Description</Label><Textarea id="product-description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="bg-surface-soft" /></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="product-price">Price</Label><Input id="product-price" required min="0" step="0.01" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="h-10 bg-surface-soft" /></div>
            <div className="space-y-2"><Label htmlFor="product-category">Category</Label><select id="product-category" required value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} className="h-10 w-full rounded-lg border border-input bg-surface-soft px-3 text-sm outline-none focus:border-ring">{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></div>
          </div>
          <div className="space-y-2"><Label htmlFor="product-image">Image URL</Label><div className="relative"><ImagePlus className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" /><Input id="product-image" type="url" placeholder="https://..." value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="h-10 bg-surface-soft pl-10" /></div></div>
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-surface-soft p-3 text-sm font-semibold text-ink"><input type="checkbox" checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} className="h-4 w-4 accent-purple" /> Available on the menu</label>
          <DialogFooter className="mt-6 -mx-6 -mb-6 border-line bg-surface-soft px-6 py-4"><Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button type="submit" className="bg-purple text-white hover:bg-purple-dark">Save product</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
