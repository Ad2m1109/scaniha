import { PublicMenuClient } from "@/components/public-menu/PublicMenuClient";

export default async function PublicMenuPage({ params }: { params: Promise<{ businessId: string }> }) {
  const { businessId } = await params;
  return <PublicMenuClient businessId={businessId} />;
}
