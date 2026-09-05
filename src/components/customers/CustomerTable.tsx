"use client";

import { Mail, Phone, SearchX } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatNumber } from "@/lib/formatters";
import type { Customer, CustomerTier } from "@/types";

interface CustomerTableProps {
  customers: Customer[];
}

const tierStyles: Record<CustomerTier, string> = {
  Gold: "bg-gold-soft text-accent-foreground",
  Silver: "bg-purple-soft text-purple-dark",
  Bronze: "bg-orange-100 text-orange-700",
};

function initials(name: string) {
  return name.split(" ").map((part) => part[0]).join("");
}

export function CustomerTable({ customers }: CustomerTableProps) {
  return (
    <Card className="glass-card overflow-hidden border-0 p-0 ring-0">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-line hover:bg-transparent">
              <TableHead className="h-12 px-5 text-[10px] font-bold uppercase tracking-[.14em] text-faint">Customer</TableHead>
              <TableHead className="h-12 text-[10px] font-bold uppercase tracking-[.14em] text-faint">Contact</TableHead>
              <TableHead className="h-12 text-[10px] font-bold uppercase tracking-[.14em] text-faint">Visits</TableHead>
              <TableHead className="h-12 text-[10px] font-bold uppercase tracking-[.14em] text-faint">Points</TableHead>
              <TableHead className="h-12 pr-5 text-[10px] font-bold uppercase tracking-[.14em] text-faint">Tier</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id} className="border-line hover:bg-purple-wash">
                <TableCell className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar size="default" className="h-9 w-9 bg-purple-soft text-purple">
                      <AvatarFallback className="bg-transparent text-[10px] font-bold text-purple">{initials(customer.name)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <Link href={`/dashboard/customers/${customer.id}`} className="truncate text-sm font-bold text-ink hover:text-purple">{customer.name}</Link>
                      <p className="mt-0.5 truncate text-[11px] text-muted">Joined {customer.joinedAt}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1 text-[11px] text-muted">
                    <p className="flex items-center gap-1.5"><Mail aria-hidden="true" className="h-3 w-3 text-faint" />{customer.email}</p>
                    <p className="flex items-center gap-1.5"><Phone aria-hidden="true" className="h-3 w-3 text-faint" />{customer.phone}</p>
                  </div>
                </TableCell>
                <TableCell className="numeric text-sm font-semibold text-ink">{customer.visits}</TableCell>
                <TableCell className="numeric text-sm font-semibold text-ink">{formatNumber(customer.points)}</TableCell>
                <TableCell className="pr-5"><div className="flex items-center justify-between gap-2"><Badge className={`border-0 px-2.5 py-1 text-[10px] font-bold ${tierStyles[customer.tier]}`}>{customer.tier}</Badge><Link href={`/dashboard/customers/${customer.id}`} className="text-[11px] font-bold text-purple">View</Link></div></TableCell>
              </TableRow>
            ))}
            {customers.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={5} className="h-48 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted">
                    <SearchX aria-hidden="true" className="h-7 w-7 text-faint" strokeWidth={1.6} />
                    <p className="text-sm font-semibold text-ink">No customers found</p>
                    <p className="text-xs">Try a different name or email.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
