import { readSnapshot } from "@/lib/server/snapshots";
import { PublicMenuClient } from "@/components/public-menu/PublicMenuClient";

export default async function PublicMenuPage({
  params,
}: {
  params: Promise<{ businessId: string }>;
}) {
  const { businessId } = await params;
  const snapshot = readSnapshot(businessId);
  return <PublicMenuClient businessId={businessId} snapshot={snapshot} />;
}
