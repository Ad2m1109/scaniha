import Link from "next/link";
import {
  ArrowRight,
<<<<<<< HEAD
  Check,
  QrCode,
  Smartphone,
  Store,
  Scissors,
  Building2,
  ShoppingBag,
  Dumbbell,
  Briefcase,
  Building,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";

const useCases = [
  { icon: Store, title: "Restaurants", subtitle: "Menus & dishes" },
  { icon: Building2, title: "Hotels", subtitle: "Services & info" },
  { icon: Scissors, title: "Barbers & Salons", subtitle: "Services & pricing" },
  { icon: ShoppingBag, title: "Shops", subtitle: "Products & catalogs" },
  { icon: Dumbbell, title: "Gyms", subtitle: "Programs & services" },
  { icon: Briefcase, title: "Professionals", subtitle: "Profiles & services" },
  { icon: Building, title: "Companies", subtitle: "Business information" },
  { icon: Sparkles, title: "Any business", subtitle: "Something to share" },
=======
  BadgeCheck,
  Check,
  Coffee,
  CreditCard,
  Gift,
  QrCode,
  Sparkles,
  Star,
} from "lucide-react";

const trustStats = [
  { value: "500+", label: "Cafes onboard" },
  { value: "2.4M", label: "Member visits" },
  { value: "38%", label: "Return rate lift" },
];

const productPillars = [
  {
    icon: QrCode,
    title: "One scan to join",
    body: "Place a single QR by the till. Customers sign in with their phone and start earning in seconds — no app download.",
  },
  {
    icon: CreditCard,
    title: "Cards that live in their wallet",
    body: "Apple Wallet and Google Pay keep your loyalty card one swipe away. Stamps and points update the moment they leave.",
  },
  {
    icon: Gift,
    title: "Rewards you control",
    body: "Set the visit goal, name the perk, change it anytime. Free latte, pastry, or a 20% off coupon — your call.",
  },
  {
    icon: Coffee,
    title: "Menu and loyalty, together",
    body: "Pair every card with a clean digital menu your team can edit in seconds. No extra logins, no extra fees.",
  },
>>>>>>> origin/main
];

const steps = [
  {
    number: "01",
<<<<<<< HEAD
    title: "Build",
    body: "Add your business information, products, services, and content.",
  },
  {
    number: "02",
    title: "Customize",
    body: "Make the experience match your brand — colors, layout, typography.",
  },
  {
    number: "03",
    title: "Share",
    body: "Generate your QR code and put it wherever your customers can see it.",
  },
  {
    number: "04",
    title: "Connect",
    body: "Customers scan and instantly discover your business.",
=======
    title: "Set up in ten minutes",
    body: "Add your cafe, name a reward, pick how points work. We prefill the rest.",
  },
  {
    number: "02",
    title: "Print one QR code",
    body: "Stick it by the till or on every table. Customers scan straight into your program.",
  },
  {
    number: "03",
    title: "Watch regulars return",
    body: "Visits climb, redemptions show up live, and quiet members get a nudge to come back.",
  },
];

const testimonials = [
  {
    quote: "We stopped printing paper cards. Regulars now scan at the till and chase the next reward on their own.",
    name: "Nadia Belkacem",
    role: "Owner, Café El Wail",
  },
  {
    quote: "Pairing the menu with loyalty made our morning rush calmer. One tool, two jobs done well.",
    name: "Karim Haddad",
    role: "Co-owner, Bloom Bakehouse",
>>>>>>> origin/main
  },
];

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "forever",
<<<<<<< HEAD
    description: "Get your digital experience online from day one.",
    features: ["1 digital experience", "QR code generation", "Custom styling", "Basic analytics"],
    cta: "Get started",
    href: "/auth/register",
=======
    description: "Run a single cafe with a working loyalty program from day one.",
    features: ["1 loyalty program", "QR check-in & digital cards", "Core member analytics"],
    cta: "Start free",
>>>>>>> origin/main
    featured: false,
  },
  {
    name: "Growth",
    price: "$29",
    period: "per month",
<<<<<<< HEAD
    description: "For businesses ready to go fully digital.",
    features: ["Everything in Starter", "Custom domain", "Priority support", "Remove Scaniha branding"],
    cta: "Start 14-day trial",
    href: "/auth/register",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "$59",
    period: "per month",
    description: "For multi-location and high-volume businesses.",
    features: ["Everything in Growth", "Multiple experiences", "Dedicated support", "API access"],
    cta: "Talk to us",
    href: "mailto:hello@scaniha.app",
=======
    description: "For cafes ready to turn visits into a real habit.",
    features: ["Everything in Starter", "Live digital menu", "Automated member nudges", "Monthly email reports"],
    cta: "Start 14-day trial",
    featured: true,
  },
  {
    name: "Flagship",
    price: "$59",
    period: "per month",
    description: "For busy counters and multi-location teams.",
    features: ["Everything in Growth", "Multi-location insights", "Priority support & onboarding"],
    cta: "Talk to us",
>>>>>>> origin/main
    featured: false,
  },
];

<<<<<<< HEAD
export default function Home() {
  return (
    <div className="min-h-screen bg-background text-ink">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Scaniha home">
            <span className="grid h-10 w-10 place-items-center">
              <Logo />
            </span>
            <span className="text-[15px] font-bold tracking-[-0.03em] text-ink">Scaniha</span>
          </Link>
          <nav className="hidden items-center gap-7 text-[13px] font-semibold text-muted md:flex" aria-label="Landing navigation">
            <a href="#use-cases" className="transition-colors duration-200 hover:text-ink">Use cases</a>
            <a href="#how-it-works" className="transition-colors duration-200 hover:text-ink">How it works</a>
            <a href="#pricing" className="transition-colors duration-200 hover:text-ink">Pricing</a>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle className="h-9 w-9 rounded-lg border-border bg-surface-soft" />
            <Link
              href="/auth/login"
              className="hidden h-9 items-center justify-center rounded-lg px-3 text-xs font-bold text-muted transition-colors duration-200 hover:text-ink sm:inline-flex"
=======
const basePrimary =
  "inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-purple px-5 text-sm font-bold text-white shadow-[0_8px_18px_#7C3AED33] transition-all duration-200 hover:bg-purple-dark hover:shadow-[0_10px_22px_#7C3AED40]";

const baseSecondary =
  "inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-line bg-surface-solid px-5 text-sm font-bold text-ink transition-all duration-200 hover:border-line-strong hover:bg-surface-soft";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-line/70 bg-background/85 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Perkly home">
            <span className="relative grid h-9 w-9 place-items-center rounded-[12px] bg-ink text-white">
              <Sparkles aria-hidden="true" className="h-4 w-4 text-gold" strokeWidth={1.8} />
            </span>
            <span>
              <span className="block text-[15px] font-bold leading-none tracking-[-0.03em]">Perkly</span>
              <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[.18em] text-muted">Loyalty studio</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-7 text-[13px] font-semibold text-muted md:flex" aria-label="Landing navigation">
            <a href="#how-it-works" className="transition-colors duration-200 hover:text-ink">How it works</a>
            <a href="#features" className="transition-colors duration-200 hover:text-ink">Loyalty cards</a>
            <a href="#pricing" className="transition-colors duration-200 hover:text-ink">Pricing</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/auth/login"
              className="hidden h-9 items-center justify-center rounded-xl px-3 text-xs font-bold text-muted transition-colors duration-200 hover:text-ink sm:inline-flex"
>>>>>>> origin/main
            >
              Sign in
            </Link>
            <Link
<<<<<<< HEAD
              href="/auth/register"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-xs font-bold text-primary-foreground transition-all duration-200 hover:bg-purple-dark"
            >
              Get started
=======
              href="/dashboard"
              className="inline-flex h-9 items-center justify-center rounded-xl bg-purple px-4 text-xs font-bold text-white shadow-[0_6px_14px_#7C3AED2E] transition-all duration-200 hover:bg-purple-dark"
            >
              Start free
>>>>>>> origin/main
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 lg:px-8">
<<<<<<< HEAD
        {/* ─── Hero ─── */}
        <section className="grid items-center gap-12 pb-16 pt-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:pb-20 lg:pt-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[11px] font-semibold text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Your digital experience
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-[-.045em] sm:text-5xl lg:text-[56px]">
              One business.
              <br />
              One experience.
              <br />
              <span className="text-accent">One scan.</span>
            </h1>
            <p className="mt-5 max-w-lg text-base font-light leading-relaxed text-muted sm:text-lg">
              Bring your business information, products, services, and content together in one digital experience your customers can access instantly.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/auth/register"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-bold text-accent-foreground transition-all duration-200 hover:bg-[#6BDB52]"
              >
                Create your experience
                <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 text-sm font-bold text-ink transition-all duration-200 hover:border-line-strong hover:bg-secondary"
              >
=======
        <section className="grid items-center gap-12 pb-16 pt-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:pb-20 lg:pt-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-solid px-3 py-1.5 text-[11px] font-semibold text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-purple" aria-hidden="true" />
              Loyalty studio for modern cafes
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-[-.045em] sm:text-5xl lg:text-[56px]">
              Turn regulars into{" "}
              <span className="bg-gradient-to-r from-purple to-purple-dark bg-clip-text text-transparent">
                loyal regulars
              </span>
              .
            </h1>
            <p className="mt-5 max-w-lg text-base font-light leading-relaxed text-muted sm:text-lg">
              One QR at the register. A card in every wallet. Rewards your customers actually redeem. Perkly runs your loyalty in the background while you keep pouring.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard" className={basePrimary}>
                Start free — no card needed
                <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
              </Link>
              <a href="#how-it-works" className={baseSecondary}>
>>>>>>> origin/main
                See how it works
              </a>
            </div>
            <p className="mt-5 flex items-center gap-2 text-[11px] font-semibold text-muted">
<<<<<<< HEAD
              <Check aria-hidden="true" className="h-4 w-4 text-success" strokeWidth={2.5} />
              Free forever for one business. No credit card needed.
            </p>
          </div>

          {/* Hero visual — Business → Digital → QR → Customer */}
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="relative overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground">
              <div aria-hidden="true" className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full border border-accent/20" />
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-10 h-36 w-36 rounded-[32px] bg-accent/10" />

              <div className="relative space-y-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-accent/30" style={{ backgroundColor: "#171B1C" }}>
                    <Store aria-hidden="true" className="h-4 w-4 text-accent" strokeWidth={2} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold uppercase tracking-[.15em] text-accent">Your business</p>
                    <p className="text-xs text-primary-foreground/60">Services, products, content</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="h-6 w-px bg-accent/30" />
                </div>

                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-accent/30 bg-accent/15">
                    <Sparkles aria-hidden="true" className="h-4 w-4 text-accent" strokeWidth={2} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold uppercase tracking-[.15em] text-accent">Scaniha</p>
                    <p className="text-xs text-primary-foreground/60">Digital experience created</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="h-6 w-px bg-accent/30" />
                </div>

                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-accent/30" style={{ backgroundColor: "#171B1C" }}>
                    <QrCode aria-hidden="true" className="h-4 w-4 text-accent" strokeWidth={2} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold uppercase tracking-[.15em] text-accent">QR Code</p>
                    <p className="text-xs text-primary-foreground/60">One scan to access</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="h-6 w-px bg-accent/30" />
                </div>

                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-accent/30" style={{ backgroundColor: "#171B1C" }}>
                    <Smartphone aria-hidden="true" className="h-4 w-4 text-accent" strokeWidth={2} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold uppercase tracking-[.15em] text-accent">Customer</p>
                    <p className="text-xs text-primary-foreground/60">Instant access on their phone</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 text-[11px] font-semibold text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Works for restaurants, shops, hotels, gyms, and any business
=======
              <BadgeCheck aria-hidden="true" className="h-4 w-4 text-success" strokeWidth={1.8} />
              Free forever for one cafe. Upgrade only when you outgrow it.
            </p>
            <dl className="mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6">
              {trustStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-[10px] font-semibold uppercase tracking-[.14em] text-faint">{stat.label}</dt>
                  <dd className="numeric mt-1 text-xl font-bold tracking-[-.04em] text-ink">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="relative overflow-hidden rounded-2xl bg-ink p-6 text-white shadow-[0_18px_36px_#7C3AED1F]">
              <div aria-hidden="true" className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full border border-white/15" />
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-10 h-36 w-36 rounded-[32px] bg-white/5" />
              <div className="relative flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-[10px] border border-white/20 bg-white/15">
                    <Sparkles aria-hidden="true" className="h-4 w-4 text-amber-200" strokeWidth={1.8} />
                  </span>
                  <span className="text-sm font-bold tracking-[-.02em]">Northstar Coffee</span>
                </div>
                <span className="rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.15em] text-amber-200">
                  Gold tier
                </span>
              </div>
              <div className="relative mt-9 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-white/75">Maya Kim</p>
                  <p className="mt-1 text-[11px] text-white/70">Member since Jan 2024</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-[.13em] text-white/75">Balance</p>
                  <p className="numeric mt-1 text-xl font-bold tracking-[-.04em]">
                    1,840 <span className="text-[10px] font-semibold text-white/80">pts</span>
                  </p>
                </div>
              </div>
              <div className="relative mt-6 flex items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5" aria-label="8 of 10 stamps collected">
                  {Array.from({ length: 10 }, (_, index) => {
                    const filled = index < 8;
                    return (
                      <span
                        key={index}
                        className={`grid h-5 w-5 place-items-center rounded-full ${
                          filled ? "bg-gold shadow-[0_2px_6px_#F59E0B40]" : "border border-white/30 bg-white/10"
                        }`}
                      >
                        {filled ? <Check aria-hidden="true" className="h-2.5 w-2.5 text-white" strokeWidth={3.5} /> : null}
                      </span>
                    );
                  })}
                </div>
                <span className="shrink-0 text-[11px] font-bold text-amber-100">8 / 10</span>
              </div>
              <div className="relative mt-5 h-px bg-white/15" />
              <p className="relative mt-3 text-[11px] text-white/70">2 visits to a free pastry</p>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-line bg-surface-solid px-4 py-3 text-[11px] font-semibold text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Live preview — Maya just earned 20 pts at 8:42 AM
>>>>>>> origin/main
            </div>
          </div>
        </section>

<<<<<<< HEAD
        {/* ─── The Problem ─── */}
        <section className="border-t border-border py-14 lg:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">The problem</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-.04em] sm:text-4xl">
              Your business is everywhere.
            </h2>
            <div className="mx-auto mt-8 max-w-lg space-y-4 text-[15px] font-light leading-relaxed text-muted">
              <p>
                Your products might be on Instagram.
                <br />
                Your phone number might be on Google.
                <br />
                Your services might be on a flyer.
              </p>
              <p>
                Your customers shouldn&apos;t have to search for your business.
              </p>
            </div>
            <div className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/5 px-5 py-2.5 text-sm font-bold text-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Scaniha brings it together.
            </div>
          </div>
        </section>

        {/* ─── Transformation ─── */}
        <section className="border-t border-border py-14 lg:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-.04em] sm:text-4xl">
              From scattered information to one digital experience.
            </h2>
          </div>

          <div className="mx-auto mt-12 max-w-xl">
            <div className="relative overflow-hidden rounded-2xl bg-primary p-8 text-primary-foreground">
              <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-accent/15" />
              <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -left-12 h-40 w-40 rounded-[36px] bg-accent/8" />

              <div className="relative space-y-5">
                {/* Step 1: Business Information */}
                <div className="flex items-center gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-accent/25" style={{ backgroundColor: "#171B1C" }}>
                    <Store aria-hidden="true" className="h-5 w-5 text-accent" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-[.14em] text-accent">Business information</p>
                    <p className="mt-0.5 text-[13px] text-primary-foreground/50">Products, services, contact, content</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="h-8 w-px bg-accent/25" />
                </div>

                {/* Step 2: Scaniha */}
                <div className="flex items-center gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-accent/25 bg-accent/12">
                    <Sparkles aria-hidden="true" className="h-5 w-5 text-accent" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-[.14em] text-accent">Scaniha</p>
                    <p className="mt-0.5 text-[13px] text-primary-foreground/50">One digital experience, created</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="h-8 w-px bg-accent/25" />
                </div>

                {/* Step 3: One Digital Experience */}
                <div className="flex items-center gap-4">
                  <span className="grid h-10 w-0 shrink-0 place-items-center rounded-xl border border-accent/25" style={{ backgroundColor: "#171B1C", width: "2.5rem" }}>
                    <QrCode aria-hidden="true" className="h-5 w-5 text-accent" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-[.14em] text-accent">One digital experience</p>
                    <p className="mt-0.5 text-[13px] text-primary-foreground/50">Shared via QR code</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="h-8 w-px bg-accent/25" />
                </div>

                {/* Step 4: Scan → Discover */}
                <div className="flex items-center gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-accent/25" style={{ backgroundColor: "#171B1C" }}>
                    <Smartphone aria-hidden="true" className="h-5 w-5 text-accent" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-[.14em] text-accent">Scan &amp; discover</p>
                    <p className="mt-0.5 text-[13px] text-primary-foreground/50">Customers access your business instantly</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── What can you digitalize? ─── */}
        <section id="use-cases" className="scroll-mt-20 border-t border-border py-14 lg:py-16">
          <div className="max-w-2xl">
            <p className="eyebrow">Use cases</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-.04em] sm:text-4xl">
              Whatever your business offers, give it a digital home.
            </h2>
            <p className="body-copy mt-3">
              Your products, services, information, and content — all in one place your customers can access.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {useCases.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:border-accent/40 hover:shadow-soft"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-secondary">
                  <item.icon aria-hidden="true" className="h-5 w-5 text-ink" strokeWidth={1.8} />
                </span>
                <h3 className="mt-3 text-sm font-bold tracking-[-.02em] text-ink">{item.title}</h3>
                <p className="mt-1 text-[12px] text-muted">{item.subtitle}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm font-semibold text-muted">
            And anything else your customers need to access.
          </p>
        </section>

        {/* ─── How it works (4 steps) ─── */}
        <section id="how-it-works" className="scroll-mt-20 border-t border-border py-14 lg:py-16">
          <div className="max-w-2xl">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-.04em] sm:text-4xl">
              Four steps to your digital experience.
            </h2>
            <p className="body-copy mt-3">
              Simple enough for any business. Powerful enough to make an impression.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.number} className="rounded-xl border border-border bg-card p-6">
                <p className="text-[11px] font-bold uppercase tracking-[.18em] text-accent">{step.number}</p>
=======
        <section id="features" className="scroll-mt-20 border-t border-line py-14 lg:py-16">
          <div className="max-w-2xl">
            <p className="eyebrow">The toolkit</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-.04em] sm:text-4xl">
              Everything your cafe needs, in one place.
            </h2>
            <p className="body-copy mt-3">
              Four tools, one subscription, zero clunky hardware. Built for the way cafes actually run.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {productPillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-2xl border border-line bg-card p-6 transition-all duration-200 hover:border-purple/25 hover:shadow-[0_10px_24px_#4B318114]"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-purple-soft text-purple">
                  <pillar.icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 text-sm font-bold tracking-[-.02em] text-ink">{pillar.title}</h3>
                <p className="mt-1.5 text-[13px] font-light leading-relaxed text-muted">{pillar.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-20 border-t border-line py-14 lg:py-16">
          <div className="max-w-2xl">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-.04em] sm:text-4xl">
              Live in your cafe this afternoon.
            </h2>
            <p className="body-copy mt-3">
              No developer, no printer, no problem. Three steps and your loyalty program is open for business.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="rounded-2xl border border-line bg-card p-6">
                <p className="text-[11px] font-bold uppercase tracking-[.18em] text-purple">{step.number}</p>
>>>>>>> origin/main
                <h3 className="mt-3 text-sm font-bold tracking-[-.02em] text-ink">{step.title}</h3>
                <p className="mt-1.5 text-[13px] font-light leading-relaxed text-muted">{step.body}</p>
              </div>
            ))}
          </div>
<<<<<<< HEAD
        </section>

        {/* ─── Value / Brand ─── */}
        <section className="border-t border-border py-14 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-[-.04em] sm:text-4xl lg:text-5xl">
              One scan.<br />
              <span className="text-accent">Less searching.</span>
            </h2>
            <div className="mx-auto mt-8 max-w-md space-y-4 text-[15px] font-light leading-relaxed text-muted">
              <p>
                Your customers don&apos;t need another app, another account, or a complicated process.
              </p>
              <p className="font-semibold text-ink">
                They scan. They discover. They connect.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Pricing ─── */}
        <section id="pricing" className="scroll-mt-20 border-t border-border py-14 lg:py-16">
=======
          <div className="mt-10 flex flex-col items-start gap-3 rounded-2xl border border-purple/20 bg-purple-soft/40 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold text-ink">Curious how it looks on your phone?</p>
              <p className="mt-1 text-[12px] font-light text-muted">Open a live demo card — no signup, no email.</p>
            </div>
            <Link href="/dashboard" className={basePrimary}>
              Open live demo
              <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>
        </section>

        <section className="border-t border-line py-14 lg:py-16">
          <div className="max-w-2xl">
            <p className="eyebrow">From behind the counter</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-.04em] sm:text-4xl">
              Cafe owners on what changed.
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <figure
                key={testimonial.name}
                className="flex flex-col rounded-2xl border border-line bg-card p-6"
              >
                <div className="flex items-center gap-1 text-gold" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} aria-hidden="true" className="h-4 w-4 fill-gold" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-[14px] font-light leading-relaxed text-ink">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-2.5 border-t border-line pt-4">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-purple-soft text-[10px] font-bold text-purple">
                    {testimonial.name.split(" ").map((part) => part[0]).join("")}
                  </span>
                  <span>
                    <span className="block text-xs font-bold text-ink">{testimonial.name}</span>
                    <span className="block text-[11px] text-muted">{testimonial.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="pricing" className="scroll-mt-20 border-t border-line py-14 lg:py-16">
>>>>>>> origin/main
          <div className="max-w-2xl">
            <p className="eyebrow">Pricing</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-.04em] sm:text-4xl">
              One fair price. No contracts.
            </h2>
            <p className="body-copy mt-3">
<<<<<<< HEAD
              Start free, upgrade when you need more. Cancel anytime.
=======
              Start free, upgrade when the stamps start adding up. Cancel anytime.
>>>>>>> origin/main
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 items-stretch gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
<<<<<<< HEAD
                className={`relative flex flex-col rounded-xl border p-6 transition-all duration-200 ${
                  plan.featured
                    ? "border-accent/40 bg-accent/5 shadow-soft"
                    : "border-border bg-card hover:border-accent/20"
                }`}
              >
                {plan.featured ? (
                  <span className="absolute right-5 top-5 rounded-full bg-accent px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.14em] text-accent-foreground">
=======
                className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-200 ${
                  plan.featured
                    ? "border-purple/30 bg-purple-soft/30 shadow-[0_18px_40px_#7C3AED1F] hover:border-purple/50"
                    : "border-line bg-card hover:border-purple/20 hover:shadow-[0_10px_24px_#4B318114]"
                }`}
              >
                {plan.featured ? (
                  <span className="absolute right-5 top-5 rounded-full bg-gold px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.14em] text-amber-700">
>>>>>>> origin/main
                    Most popular
                  </span>
                ) : null}
                <h3 className="text-sm font-bold tracking-[-.02em] text-ink">{plan.name}</h3>
                <p className="mt-1.5 text-[12px] font-light text-muted">{plan.description}</p>
                <p className="mt-5 flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold tracking-[-.04em] text-ink">{plan.price}</span>
                  <span className="text-xs font-semibold text-muted">{plan.period}</span>
                </p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-[13px] font-light text-ink">
<<<<<<< HEAD
                      <Check aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={2.5} />
=======
                      <Check aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-purple" strokeWidth={2.5} />
>>>>>>> origin/main
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
<<<<<<< HEAD
                  href={plan.href}
                  className={`mt-7 inline-flex h-10 items-center justify-center rounded-xl text-xs font-bold transition-all duration-200 ${
                    plan.featured
                      ? "bg-accent text-accent-foreground hover:bg-[#6BDB52]"
                      : "border border-border bg-card text-ink hover:border-line-strong hover:bg-secondary"
=======
                  href="/dashboard"
                  className={`mt-7 inline-flex h-10 items-center justify-center rounded-xl text-xs font-bold transition-all duration-200 ${
                    plan.featured
                      ? "bg-purple text-white shadow-[0_8px_18px_#7C3AED33] hover:bg-purple-dark"
                      : "border border-line bg-surface-solid text-ink hover:border-line-strong hover:bg-surface-soft"
>>>>>>> origin/main
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-[11px] font-semibold text-muted">
<<<<<<< HEAD
            All plans include unlimited QR codes, no setup fees, and a 14-day money-back guarantee.
          </p>
        </section>

        {/* ─── Final CTA ─── */}
        <section className="my-12 overflow-hidden rounded-2xl bg-primary p-8 text-primary-foreground sm:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[.18em] text-accent">Your digital experience</p>
              <h2 className="mt-3 text-3xl font-bold leading-[1.1] tracking-[-.04em] sm:text-4xl">
                Give your business
                <br />
                a digital experience.
              </h2>
              <p className="mt-3 max-w-lg text-[14px] font-light leading-relaxed text-primary-foreground/60">
                Start with what your business already has. Free forever for one business — no card, no commitment.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/auth/register"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-accent px-5 text-sm font-bold text-accent-foreground transition-all duration-200 hover:bg-[#6BDB52]"
                >
                  Create your Scaniha
=======
            All plans include unlimited members, no setup fees, and a 14-day money-back guarantee.
          </p>
        </section>

        <section className="my-12 overflow-hidden rounded-2xl bg-ink p-8 text-white sm:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div>
              <p className="eyebrow text-amber-200">Ready when you are</p>
              <h2 className="mt-3 text-3xl font-bold leading-[1.1] tracking-[-.04em] sm:text-4xl">
                Your next regular is one scan away.
              </h2>
              <p className="mt-3 max-w-lg text-[14px] font-light leading-relaxed text-white/75">
                Spin up a working loyalty program in ten minutes. Free forever for one cafe — no card, no commitment, no salesperson.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dashboard"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-ink transition-all duration-200 hover:bg-amber-200"
                >
                  Start free
>>>>>>> origin/main
                  <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2} />
                </Link>
                <a
                  href="#how-it-works"
<<<<<<< HEAD
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-primary-foreground/20 bg-primary-foreground/5 px-5 text-sm font-bold text-primary-foreground transition-all duration-200 hover:border-primary-foreground/40 hover:bg-primary-foreground/10"
=======
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 text-sm font-bold text-white transition-all duration-200 hover:border-white/40 hover:bg-white/10"
>>>>>>> origin/main
                >
                  See how it works
                </a>
              </div>
            </div>
<<<<<<< HEAD
            <div className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-5">
              <p className="text-[10px] font-bold uppercase tracking-[.16em] text-accent">What you get on day one</p>
              <ul className="mt-4 space-y-3 text-[13px] text-primary-foreground/80">
                {[
                  "A branded digital experience, ready to share",
                  "One QR code for your business",
                  "Custom colors, layout, and typography",
                  "Sample content you can edit anytime",
                ].map((perk) => (
                  <li key={perk} className="flex items-start gap-2">
                    <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
=======
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-[10px] font-bold uppercase tracking-[.16em] text-amber-200">What you get on day one</p>
              <ul className="mt-4 space-y-3 text-[13px] text-white/85">
                {[
                  "Branded loyalty card, ready to share",
                  "One QR code for the till",
                  "Member list and basic analytics",
                  "Sample rewards you can edit later",
                ].map((perk) => (
                  <li key={perk} className="flex items-start gap-2">
                    <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-amber-200" strokeWidth={2.5} />
>>>>>>> origin/main
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

<<<<<<< HEAD
      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-10 text-[11px] font-semibold text-muted sm:flex-row sm:items-center lg:px-8">
          <span className="flex items-center gap-2">
            <Logo size="sm" className="h-3.5 w-3.5 rounded" />
            Scaniha
          </span>
          <span>YOUR DIGITAL EXPERIENCE.</span>
=======
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-10 text-[11px] font-semibold text-muted sm:flex-row sm:items-center lg:px-8">
          <span>Perkly — Loyalty Studio</span>
          <span className="flex items-center gap-2">
            <Coffee aria-hidden="true" className="h-3.5 w-3.5 text-gold" strokeWidth={1.8} />
            Built for the morning ritual.
          </span>
>>>>>>> origin/main
        </div>
      </footer>
    </div>
  );
}
