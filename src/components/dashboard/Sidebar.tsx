"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Coffee,
  Gift,
  LayoutDashboard,
  MoreHorizontal,
  QrCode,
  Settings2,
  Sparkles,
  Users,
  CircleHelp,
  ChevronsUpDown,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { business } from "@/lib/data/business";
import { cn } from "@/lib/utils";

export interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  hasDot?: boolean;
}

export const navigation: NavigationItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Customers", href: "/dashboard/customers", icon: Users, badge: "1.2k" },
  { name: "Menu", href: "/dashboard/menu", icon: Coffee },
  { name: "QR Codes", href: "/dashboard/qr-codes", icon: QrCode, hasDot: true },
  { name: "Rewards", href: "/dashboard/rewards", icon: Gift },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Profile", href: "/dashboard/profile", icon: Settings2 },
];

function isNavigationActive(pathname: string, href: string): boolean {
  return href === "/dashboard"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
}

function NavigationLinks({
  pathname,
  onNavigate,
  mobile = false,
}: {
  pathname: string;
  onNavigate?: () => void;
  mobile?: boolean;
}) {
  return (
    <nav aria-label="Primary navigation" className={cn(mobile ? "grid grid-cols-2 gap-1" : "space-y-1")}>
      {navigation.map((item) => {
        const Icon = item.icon;
        const active = isNavigationActive(pathname, item.href);

        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "nav-link flex items-center gap-3 rounded-xl text-[13px] font-semibold",
              mobile ? "px-3 py-2.5" : "px-3 py-2.5",
            )}
            data-active={active}
          >
            <Icon
              aria-hidden="true"
              className={cn("h-[17px] w-[17px] shrink-0", active ? "text-purple" : "text-muted")}
              strokeWidth={1.8}
            />
            <span className="truncate">{item.name}</span>
            {!mobile && item.badge ? (
              <Badge
                variant="secondary"
                className="ml-auto h-5 rounded-full bg-purple-soft px-2 py-0 text-[10px] font-bold text-purple-dark"
              >
                {item.badge}
              </Badge>
            ) : null}
            {!mobile && item.hasDot ? (
              <span
                aria-label="Needs attention"
                className="ml-auto h-2 w-2 rounded-full bg-gold shadow-[0_0_0_4px_#F59E0B1F]"
              />
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="desktop-sidebar hidden border-r border-line bg-surface-soft px-5 py-6 lg:flex lg:flex-col">
      <div className="flex items-center gap-3 px-2">
        <div className="relative grid h-10 w-10 place-items-center rounded-[14px] bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 text-white shadow-[0_8px_18px_#7C3AED47]">
          <span className="absolute inset-[5px] rounded-[10px] border border-white/25" />
          <Sparkles aria-hidden="true" className="relative h-5 w-5 text-white" strokeWidth={1.8} />
        </div>
        <div>
          <p className="text-[17px] font-bold leading-none tracking-[-.04em] text-ink">Perkly</p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[.16em] text-muted">Loyalty studio</p>
        </div>
      </div>

      <Button
        variant="ghost"
        type="button"
        className="soft-glass mt-8 flex h-auto w-full items-center justify-start gap-3 rounded-2xl px-3 py-3 text-left hover:bg-purple-wash"
        aria-label="Switch business"
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gold-soft text-amber-700">
          <Coffee aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-xs font-semibold text-ink">{business.name}</span>
          <span className="mt-0.5 block text-[11px] text-muted">{business.location}</span>
        </span>
        <ChevronsUpDown aria-hidden="true" className="h-4 w-4 shrink-0 text-faint" strokeWidth={1.8} />
      </Button>

      <div className="mt-8 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-faint">Workspace</div>
      <div className="mt-3">
        <NavigationLinks pathname={pathname} />
      </div>

      <div className="mt-auto space-y-3">
        <div className="rounded-2xl border border-line bg-gradient-to-br from-purple-50/80 to-amber-50/60 p-3 dark:from-purple-500/10 dark:to-amber-500/5">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-gold-soft text-amber-700">
              <CircleHelp aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.8} />
            </span>
            <p className="text-[11px] font-bold text-ink">Need a hand?</p>
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-muted">Your loyalty guide is one click away.</p>
          <Button variant="link" className="mt-2 h-auto p-0 text-[11px] font-bold text-purple-dark dark:text-purple-300">
            Open help center <span aria-hidden="true">→</span>
          </Button>
        </div>

        <Button
          variant="ghost"
          type="button"
          className="flex h-auto w-full items-center justify-start gap-3 rounded-2xl border border-transparent px-2 py-2 text-left hover:border-line hover:bg-purple-wash"
          aria-label="Open account menu"
        >
          <Avatar size="default" className="h-9 w-9 bg-gradient-to-br from-amber-200 to-purple-200 text-purple-dark">
            <AvatarFallback className="bg-transparent text-xs font-bold text-purple-dark">MK</AvatarFallback>
          </Avatar>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-xs font-bold text-ink">{business.ownerName}</span>
            <span className="block truncate text-[11px] text-muted">Owner account</span>
          </span>
          <MoreHorizontal aria-hidden="true" className="h-4 w-4 text-faint" strokeWidth={1.8} />
        </Button>
      </div>
    </aside>
  );
}

export function MobileNavigation({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="mobile-menu-panel glass-card rounded-2xl p-3 shadow-md lg:hidden">
      <div className="mb-2 px-3 pt-2 text-[10px] font-bold uppercase tracking-[.18em] text-faint">Workspace</div>
      <NavigationLinks pathname={pathname} onNavigate={onNavigate} mobile />
    </div>
  );
}
