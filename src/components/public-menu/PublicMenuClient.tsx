"use client";

import type { PublicSnapshot } from "@/lib/server/snapshots";
import { MenuPreview } from "@/components/menu/MenuPreview";
import type { BusinessProfile, MenuSettings } from "@/types";

interface Props {
  businessId: string;
  snapshot: PublicSnapshot | null;
}

// Map snapshot to the shapes MenuPreview expects
function snapshotToBusiness(s: PublicSnapshot): BusinessProfile {
  return {
    id:           s.businessId,
    name:         s.business.name,
    logo:         s.business.logo,
    phone:        s.business.phone,
    address:      s.business.address,
    description:  s.business.description,
    facebook:     s.business.facebook,
    instagram:    s.business.instagram,
    whatsapp:     s.business.whatsapp,
    location:     "",
    ownerName:    "",
    memberCount:  0,
    activeMembers: 0,
    memberGoal:   0,
    createdAt:    "",
    tagline:      "",
  };
}

function snapshotToSettings(s: PublicSnapshot): MenuSettings {
  return {
    template: "lavender",
    currency:  s.style.currency  || "DA",
    heroImage: s.style.heroImage || "",
    tagline:   "",
  };
}

function MenuNotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-slate-50 p-6 text-center">
      <div>
        <h1 className="mt-4 text-xl font-bold text-slate-800">Menu not found</h1>
        <p className="mt-2 text-sm text-slate-500">
          This menu hasn&apos;t been published yet, or the QR code may be outdated.
        </p>
      </div>
    </div>
  );
}

export function PublicMenuClient({ businessId, snapshot }: Props) {
  if (!snapshot || snapshot.businessId !== businessId) {
    return <MenuNotFound />;
  }

  const business  = snapshotToBusiness(snapshot);
  const settings  = snapshotToSettings(snapshot);

  return (
    <div className="min-h-screen bg-slate-100 py-0 sm:px-4 sm:py-8">
      <div className="mx-auto min-h-screen max-w-2xl shadow-xl sm:min-h-0 sm:overflow-hidden sm:rounded-2xl">
        <MenuPreview
          business={business}
          categories={snapshot.categories}
          products={snapshot.products}
          settings={settings}
        />
      </div>
    </div>
  );
}
