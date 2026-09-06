"use client";

import { useSession } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { handleSignOut } from "@/app/actions/auth";

export function SidebarAccount() {
  const { data: session } = useSession();
  const userName = session?.user?.name || "";
  const initials = userName
    .split(" ")
    .map((p) => p[0])
    .join("");

  return (
    <form
      action={handleSignOut}
      className="flex h-auto w-full items-center justify-start gap-3 rounded-2xl border border-transparent px-2 py-2 text-left hover:border-line hover:bg-purple-wash transition"
    >
      <Avatar size="default" className="h-9 w-9 bg-purple-soft text-purple-dark">
        <AvatarFallback className="bg-transparent text-xs font-bold text-purple-dark">
          {initials || "?"}
        </AvatarFallback>
      </Avatar>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-xs font-bold text-ink">
          {userName || "My Account"}
        </span>
        <span className="block truncate text-[11px] text-muted">Owner account</span>
      </span>
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="h-8 w-8 shrink-0 hover:bg-red-50 hover:text-red-500"
        aria-label="Sign out"
        title="Sign out"
      >
        <LogOut className="h-3.5 w-3.5" strokeWidth={1.8} />
      </Button>
    </form>
  );
}
