"use client";

import { Bell, Menu, Moon, Sun } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { business } from "@/lib/data/business";

interface HeaderProps {
  isDark: boolean;
  mobileOpen: boolean;
  hasUnread: boolean;
  onMobileToggle: () => void;
  onNotificationClick: () => void;
  onThemeToggle: () => void;
}

export function Header({
  isDark,
  mobileOpen,
  hasUnread,
  onMobileToggle,
  onNotificationClick,
  onThemeToggle,
}: HeaderProps) {
  return (
    <header className="relative flex items-center justify-between gap-4 border-b border-line py-4 lg:py-6">
      <div className="flex min-w-0 items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          type="button"
          className="icon-button h-10 w-10 shrink-0 rounded-xl bg-surface-soft lg:hidden"
          onClick={onMobileToggle}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          title={mobileOpen ? "Close navigation" : "Open navigation"}
        >
          <Menu aria-hidden="true" className="h-[18px] w-[18px] text-ink" strokeWidth={1.8} />
        </Button>
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-muted">Tuesday, July 7, 2026</p>
          <h1 className="mt-0.5 truncate text-xl font-bold tracking-[-.035em] text-ink sm:text-[23px]">
            Good morning, Maya <span aria-hidden="true" className="inline-block text-purple">✦</span>
          </h1>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <div className="hidden items-center gap-2 rounded-full border border-line bg-surface-soft px-3 py-2 text-[11px] font-semibold text-muted shadow-[0_4px_12px_#4B31810A] sm:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Live data
        </div>
        <Button
          variant="outline"
          size="icon"
          type="button"
          className="icon-button relative h-10 w-10 rounded-xl bg-surface-soft"
          onClick={onNotificationClick}
          aria-label={hasUnread ? "Notifications, 3 unread" : "Notifications"}
          title={hasUnread ? "Notifications, 3 unread" : "Notifications"}
        >
          <Bell aria-hidden="true" className="h-[17px] w-[17px] text-muted" strokeWidth={1.8} />
          {hasUnread ? (
            <Badge className="absolute right-[7px] top-[6px] h-2 w-2 rounded-full border-2 border-page-bg bg-gold p-0" aria-hidden="true">
              <span className="sr-only">3 unread notifications</span>
            </Badge>
          ) : null}
        </Button>
        <Button
          variant="outline"
          size="icon"
          type="button"
          className="icon-button hidden h-10 w-10 rounded-xl bg-surface-soft sm:inline-flex"
          onClick={onThemeToggle}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDark ? (
            <Sun aria-hidden="true" className="h-[17px] w-[17px] text-gold" strokeWidth={1.8} />
          ) : (
            <Moon aria-hidden="true" className="h-[17px] w-[17px] text-purple" strokeWidth={1.8} />
          )}
        </Button>
        <Avatar size="default" className="h-10 w-10 bg-gradient-to-br from-amber-200 to-purple-200 text-purple-dark shadow-[0_5px_14px_#7C3AED24]">
          <AvatarFallback className="bg-transparent text-[11px] font-bold text-purple-dark">{business.ownerName.split(" ").map((part) => part[0]).join("")}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
