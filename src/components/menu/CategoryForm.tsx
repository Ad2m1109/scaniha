"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/shared/ImageUpload";
import { useAppData } from "@/context/AppDataContext";

const blank = { name: "", description: "", image: "" };

export function CategoryForm() {
  const { addCategory } = useAppData();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(blank);

  function changeOpen(nextOpen: boolean) {
    if (nextOpen) setForm({ ...blank });
    setOpen(nextOpen);
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.name.trim()) return;
    addCategory({
      name: form.name.trim(),
      description: form.description.trim(),
      image: form.image,
    });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={changeOpen}>
      <DialogTrigger render={<Button type="button" variant="outline" className="h-10 gap-2" />}>
        <Plus className="h-4 w-4" /> Add category
      </DialogTrigger>
      <DialogContent className="glass-card max-h-[90vh] max-w-lg overflow-y-auto border-line bg-surface-solid p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-ink">New category</DialogTitle>
          <DialogDescription>Categories organize your menu. Add an image to make it stand out.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category-name">Name</Label>
            <Input id="category-name" autoFocus required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-10 bg-surface-soft" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category-description">Description</Label>
            <Input id="category-description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="bg-surface-soft" />
          </div>
          <ImageUpload
            value={form.image}
            onChange={(url) => setForm({ ...form, image: url })}
            folder="menu"
            label="Category image"
          />
          <DialogFooter className="mt-6 -mx-6 -mb-6 border-line bg-surface-soft px-6 py-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-purple text-white hover:bg-purple-dark">Save category</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
