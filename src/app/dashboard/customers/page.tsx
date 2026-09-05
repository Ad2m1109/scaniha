"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, UsersRound } from "lucide-react";

import { CustomerForm } from "@/components/customers/CustomerForm";
import { CustomerTable } from "@/components/customers/CustomerTable";
import { PageIntro } from "@/components/shared/PageIntro";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppData } from "@/context/AppDataContext";

export default function CustomersPage() {
  const { customers } = useAppData();
  const [search, setSearch] = useState("");
  const [tier, setTier] = useState("All");

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return customers.filter((customer) => (tier === "All" || customer.tier === tier) && (!query || `${customer.name} ${customer.email} ${customer.phone}`.toLowerCase().includes(query)));
  }, [customers, search, tier]);

  return (
    <div className="mx-auto max-w-[1280px] space-y-6">
      <PageIntro
        eyebrow="Member directory"
        title="Know your regulars."
        description="Keep every visit meaningful with a clear view of your members, points, and loyalty tier."
        action={<CustomerForm />}
      />

      <Card className="glass-card border-0 ring-0">
        <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="relative min-w-0 flex-1 sm:max-w-md">
            <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" strokeWidth={1.8} />
            <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name, email, or phone" aria-label="Search customers" className="h-10 rounded-xl border-line bg-surface-soft pl-9" />
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-muted">
            <span className="flex items-center gap-2 rounded-full bg-purple-soft px-3 py-2 text-purple-dark"><UsersRound aria-hidden="true" className="h-3.5 w-3.5" />{customers.length} members</span>
            <div className="relative"><SlidersHorizontal aria-hidden="true" className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" /><select value={tier} onChange={(event) => setTier(event.target.value)} aria-label="Filter by tier" className="h-9 rounded-xl border border-line bg-surface-solid pl-8 pr-3 text-xs text-muted"><option>All</option><option>Gold</option><option>Silver</option><option>Bronze</option></select></div>
          </div>
        </CardContent>
      </Card>

      <CustomerTable customers={filteredCustomers} />
    </div>
  );
}
