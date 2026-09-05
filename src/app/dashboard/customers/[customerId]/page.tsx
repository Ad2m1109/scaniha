import { CustomerProfile } from "@/components/customers/CustomerProfile";

export default async function CustomerPage({ params }: { params: Promise<{ customerId: string }> }) {
  const { customerId } = await params;
  return <CustomerProfile customerId={customerId} />;
}
