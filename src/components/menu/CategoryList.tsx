"use client";

import { useState } from "react";
import { Edit2, FolderOpen, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppData } from "@/context/AppDataContext";
import type { Category } from "@/types";

export function CategoryList() {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useAppData();
  const [editing, setEditing] = useState<Category | null | undefined>(undefined);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function open(category: Category | null) {
    setEditing(category);
    setName(category?.name ?? "");
    setDescription(category?.description ?? "");
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!name.trim()) return;
    if (editing) updateCategory({ ...editing, name: name.trim(), description: description.trim() });
    else addCategory({ name: name.trim(), description: description.trim() });
    setEditing(undefined);
  }

  return (
    <section className="glass-card rounded-2xl p-5">
      <div className="flex items-center justify-between gap-3"><div><h2 className="card-title">Categories</h2><p className="mt-1 text-xs text-muted">Organize the public menu.</p></div><Button type="button" variant="outline" size="sm" className="gap-2" onClick={() => open(null)}><Plus className="h-3.5 w-3.5" /> Add</Button></div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center gap-3 rounded-xl border border-line bg-surface-soft p-3">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-purple-soft text-purple"><FolderOpen className="h-4 w-4" /></span>
            <div className="min-w-0 flex-1"><p className="truncate text-xs font-bold text-ink">{category.name}</p><p className="text-[11px] text-muted">{products.filter((product) => product.categoryId === category.id).length} items</p></div>
            <Button variant="ghost" size="icon-sm" onClick={() => open(category)} aria-label={`Edit ${category.name}`}><Edit2 className="h-3.5 w-3.5" /></Button>
            <Button variant="ghost" size="icon-sm" onClick={() => { if (window.confirm(`Delete ${category.name} and its products?`)) deleteCategory(category.id); }} aria-label={`Delete ${category.name}`}><Trash2 className="h-3.5 w-3.5 text-destructive" /></Button>
          </div>
        ))}
      </div>
      <Dialog open={editing !== undefined} onOpenChange={(value) => !value && setEditing(undefined)}>
        <DialogContent className="glass-card border-line bg-surface-solid p-6"><DialogHeader><DialogTitle>{editing ? "Edit category" : "New category"}</DialogTitle></DialogHeader><form onSubmit={submit} className="space-y-4"><div className="space-y-2"><Label htmlFor="category-name">Name</Label><Input id="category-name" autoFocus value={name} onChange={(e) => setName(e.target.value)} required /></div><div className="space-y-2"><Label htmlFor="category-description">Description</Label><Input id="category-description" value={description} onChange={(e) => setDescription(e.target.value)} /></div><DialogFooter><Button type="button" variant="outline" onClick={() => setEditing(undefined)}>Cancel</Button><Button type="submit" className="bg-purple text-white">Save category</Button></DialogFooter></form></DialogContent>
      </Dialog>
    </section>
  );
}
