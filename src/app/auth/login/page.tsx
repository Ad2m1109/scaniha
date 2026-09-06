"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { Sparkles, ArrowRight, Coffee, QrCode, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Coffee,
    title: "Digital menu",
    desc: "A clean menu your customers can scan from any table.",
  },
  {
    icon: QrCode,
    title: "QR check-in",
    desc: "One scan at the till and loyalty points are added instantly.",
  },
  {
    icon: Gift,
    title: "Loyalty rewards",
    desc: "Set rewards your regulars actually come back for.",
  },
];

export default function LoginPage() {
  return (
    <div className="auth-page grid min-h-screen bg-background lg:grid-cols-[1fr_1fr]">
      {/* Left side — branding (desktop only) */}
      <div className="relative hidden overflow-hidden bg-ink text-white lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-[40px] bg-white/5" />

        <div className="relative">
          <Link href="/" className="inline-flex items-center gap-3" aria-label="Perkly home">
            <span className="grid h-10 w-10 place-items-center rounded-[12px] bg-white/10">
              <Sparkles className="h-5 w-5 text-gold" strokeWidth={1.8} />
            </span>
            <span>
              <span className="block text-base font-bold tracking-tight">Perkly</span>
              <span className="block text-[10px] font-semibold uppercase tracking-[.18em] text-white/50">
                Loyalty studio
              </span>
            </span>
          </Link>
        </div>

        <div className="relative space-y-10">
          <h2 className="text-4xl font-bold leading-[1.1] tracking-tight">
            Turn regulars into<br />
            <span className="text-gold">loyal regulars</span>.
          </h2>
          <div className="space-y-5">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10">
                  <f.icon className="h-4.5 w-4.5 text-gold" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="text-sm font-bold">{f.title}</p>
                  <p className="mt-0.5 text-[13px] leading-relaxed text-white/55">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-[11px] font-semibold text-white/30">
          Free forever for one cafe.
        </p>
      </div>

      {/* Right side — login form */}
      <div className="flex items-center justify-center bg-background p-6 sm:p-8 lg:p-12">
        <div className="w-full max-w-[380px] space-y-8">
          {/* Mobile logo */}
          <div className="text-center lg:hidden">
            <Link href="/" className="mx-auto mb-5 inline-flex items-center gap-3" aria-label="Perkly home">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-purple text-white shadow-[0_6px_14px_#7C3AED33]">
                <Sparkles className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <span className="text-left">
                <span className="block text-lg font-bold tracking-tight text-ink">Perkly</span>
                <span className="block text-[10px] font-semibold uppercase tracking-[.18em] text-muted">
                  Loyalty studio
                </span>
              </span>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight text-ink">Welcome back</h1>
            <p className="mt-2 text-sm text-muted">
              Sign in to manage your loyalty program.
            </p>
          </div>

          {/* Desktop heading */}
          <div className="hidden text-left lg:block">
            <h1 className="text-3xl font-bold tracking-tight text-ink">Welcome back</h1>
            <p className="mt-2 text-sm text-muted">
              Sign in to manage your loyalty program.
            </p>
          </div>

          <Card className="glass-card border-0 shadow-xl ring-0">
            <CardContent className="p-6 sm:p-8">
              <Button
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="h-11 w-full gap-2.5 rounded-xl bg-purple text-white shadow-[0_8px_18px_#7C3AED33] hover:bg-purple-dark hover:shadow-[0_10px_22px_#7C3AED40]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                </svg>
                Continue with Google
              </Button>

              <div className="mt-6 text-center text-xs text-muted">
                New here?{" "}
                <button
                  type="button"
                  onClick={() => signIn("google", { callbackUrl: "/auth/onboarding" })}
                  className="font-semibold text-purple transition-colors hover:text-purple-dark"
                >
                  Create your cafe
                  <ArrowRight className="ml-1 inline h-3 w-3" />
                </button>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-[11px] text-muted/70">
            By continuing, you agree to our{" "}
            <span className="font-semibold text-muted">Terms</span> and{" "}
            <span className="font-semibold text-muted">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
