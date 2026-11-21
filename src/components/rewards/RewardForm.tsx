"use client";

import { useState } from "react";
import { Edit2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/shared/ImageUpload";
import { useAppData } from "@/context/AppDataContext";
import type { Reward } from "@/types";

const empty = { name: "", description: "", image: "", pointsRequired: "100", status: "active" as Reward["status"] };

export function RewardForm({ reward, trigger }: { reward?: Reward; trigger?: React.ReactElement }) {
  const { saveReward } = useAppData();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);

  function changeOpen(next: boolean) {
    if (next) setForm(reward ? { name: reward.name, description: reward.description, image: reward.image, pointsRequired: String(reward.pointsRequired), status: reward.status } : empty);
    setOpen(next);
  }

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!form.name.trim() || Number(form.pointsRequired) < 1) return;
    saveReward({ id: reward?.id, name: form.name.trim(), description: form.description.trim(), image: form.image.trim(), pointsRequired: Number(form.pointsRequired), status: form.status });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={changeOpen}>
      <DialogTrigger render={trigger ?? <Button className="h-10 gap-2 bg-purple text-white" />}>
        {reward ? <Edit2 className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        {reward ? "Edit reward" : "Add reward"}
      </DialogTrigger>
      <DialogContent className="glass-card max-w-md border-line bg-surface-solid p-6">
        <DialogHeader>
          <DialogTitle>{reward ? "Edit reward" : "New reward"}</DialogTitle>
          <DialogDescription>Set a clear benefit and the points needed to claim it.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reward-name">Reward name</Label>
            <Input id="reward-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reward-description">Description</Label>
            <Textarea id="reward-description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <ImageUpload
            value={form.image}
            onChange={(url) => setForm({ ...form, image: url })}
            folder="rewards"
            label="Reward image"
          />
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="reward-points">Required points</Label>
              <Input id="reward-points" min="1" type="number" value={form.pointsRequired} onChange={(e) => setForm({ ...form, pointsRequired: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reward-status">Status</Label>
              <select id="reward-status" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Reward["status"] })} className="h-10 w-full rounded-lg border border-input bg-surface-soft px-3 text-sm outline-none focus:border-ring">
                <option value="active">Active</option>
                <option value="paused">Paused</option>
              </select>
            </div>
          </div>
          <DialogFooter className="mt-6 -mx-6 -mb-6 border-line bg-surface-soft px-6 py-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" className="bg-purple text-white hover:bg-purple-dark">Save reward</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
