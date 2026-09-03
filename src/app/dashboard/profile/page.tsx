"use client";

import { Building2, Globe, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageIntro } from "@/components/shared/PageIntro";
import { Textarea } from "@/components/ui/textarea";

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-[1280px] space-y-6">
      <PageIntro
        eyebrow="Business profile"
        title="Make your cafe easy to find."
        description="The details below power your public menu, QR codes, and member benefits."
      />

      <Card className="glass-card max-w-3xl border-0 ring-0">
        <CardHeader className="p-6 pb-0">
          <CardTitle className="card-title">Business information</CardTitle>
          <p className="mt-1 text-xs text-muted">Used across your digital menu and loyalty cards.</p>
        </CardHeader>
        <CardContent className="p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="business-name" className="text-xs font-bold text-ink">Business name</Label>
                <div className="relative">
                  <Building2 aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" strokeWidth={1.8} />
                  <Input id="business-name" className="h-10 rounded-xl border-line bg-surface-soft pl-10" defaultValue="Cafe El Wail" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone-number" className="text-xs font-bold text-ink">Phone number</Label>
                <div className="relative">
                  <Phone aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" strokeWidth={1.8} />
                  <Input id="phone-number" className="h-10 rounded-xl border-line bg-surface-soft pl-10" defaultValue="+213 555 123 456" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-xs font-bold text-ink">Address</Label>
                <div className="relative">
                  <MapPin aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" strokeWidth={1.8} />
                  <Input id="address" className="h-10 rounded-xl border-line bg-surface-soft pl-10" defaultValue="123 Rue Didouche Mourad, Algiers" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website" className="text-xs font-bold text-ink">Website</Label>
                <div className="relative">
                  <Globe aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" strokeWidth={1.8} />
                  <Input id="website" className="h-10 rounded-xl border-line bg-surface-soft pl-10" placeholder="https://..." />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-xs font-bold text-ink">Description</Label>
              <Textarea
                id="description"
                defaultValue="Le meilleur café d'Alger avec des produits frais et un service exceptionnel."
                rows={4}
                className="rounded-xl border-line bg-surface-soft"
              />
            </div>

            <Button type="submit" className="rounded-xl bg-purple px-5 text-white hover:bg-purple-dark">
              Save changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
