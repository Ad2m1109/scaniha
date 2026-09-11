"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUpload } from "@/components/shared/ImageUpload";
import { useAppData } from "@/context/AppDataContext";
import type { Category } from "@/types";

interface CategoryEditorProps {
  category: Category;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CategoryEditor({ category, open, onOpenChange }: CategoryEditorProps) {
  const { updateCategory, deleteCategory } = useAppData();
  const [name, setName] = useState(category.name);
  const [description, setDescription] = useState(category.description);
  const [image, setImage] = useState(category.image);

  function handleSave(event: React.FormEvent) {
    event.preventDefault();
    if (!name.trim()) return;
    updateCategory({ ...category, name: name.trim(), description: description.trim(), image });
    onOpenChange(false);
  }

  function handleDelete() {
    if (window.confirm(`Delete "${category.name}" and all its products?`)) {
      deleteCategory(category.id);
      onOpenChange(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card max-h-[90vh] max-w-lg overflow-y-auto border-line bg-surface-solid p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-ink">Edit category</DialogTitle>
          <DialogDescription>Update the category or remove it entirely.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-category-name">Name</Label>
            <Input id="edit-category-name" autoFocus required value={name} onChange={(e) => setName(e.target.value)} className="h-10 bg-surface-soft" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-category-description">Description</Label>
            <Input id="edit-category-description" value={description} onChange={(e) => setDescription(e.target.value)} className="bg-surface-soft" />
          </div>
          <ImageUpload
            value={image}
            onChange={setImage}
            folder="menu"
            label="Category image"
          />
          <DialogFooter className="mt-6 -mx-6 -mb-6 border-line bg-surface-soft px-6 py-4">
            <Button type="button" variant="ghost" onClick={handleDelete} className="mr-auto gap-1.5 text-destructive hover:text-destructive">
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" className="bg-purple text-white hover:bg-purple-dark">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
