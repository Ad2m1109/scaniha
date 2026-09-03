import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Coffee,
  CreditCard,
  Gift,
  Quote,
  ScanLine,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

const bentoTiles = [
  {
    icon: CreditCard,
    title: "Digital loyalty cards",
    description:
      "Live in Apple Wallet and Google Pay, so your regulars can leave the paper stamps behind.",
  },
  {
    icon: ScanLine,
    title: "QR check-in at the register",
    description:
      "One code by the till. Customers scan, earn, and order — all in a single tap.",
  },
  {
    icon: Gift,
    title: "Rewards your regulars want",
    description:
      "Free latte after eight visits, a pastry at 400 points. You set the pace and the prize.",
  },
  {
    icon: Coffee,
    title: "The menu in their pocket",
    description:
      "Pair every card with a crisp digital menu your team can update in seconds.",
  },
  {
    icon: TrendingUp,
    title: "Member analytics at a glance",
    description:
      "Spot your most loyal regulars — and the quiet ones worth winning back.",
  },
  {
    icon: Users,
    title: "Member care that runs itself",
    description:
      "Welcome offers and re-engagement nudges go out while you keep pouring.",
  },
];

const steps = [
  {
    number: "01",
    title: "Design your card",
    description:
      "Choose a theme, name your rewards, and set visit goals. It takes about ten minutes.",
  },
  {
    number: "02",
    title: "Print one QR code",
    description:
      "Place it at the till or on each table. Customers scan straight into your loyalty program.",
  },
  {
    number: "03",
    title: "Watch regulars return",
    description:
      "Visits climb as members chase their next reward. Analytics keep you in the loop.",
  },
];

const testimonials = [
  {
    quote:
      "Loyalty used to mean a drawer of stamped cards. Now our regulars scan at the till and chase the next reward themselves — visits have grown every month since we switched.",
    name: "Nadia Belkacem",
    role: "Owner, Café El Wail",
    initial: "NB",
  },
  {
    quote:
      "The digital menu alone saved us hours every week. Pairing it with loyalty cards made our morning rush feel calmer and more personal.",
    name: "Karim Haddad",
    role: "Co-owner, Bloom Bakehouse",
    initial: "KH",
  },
  {
    quote:
      "We finally know who our regulars are. The re-engagement offers brought back members we hadn't seen in weeks — one of them is now a Gold member.",
    name: "Sonia Merabet",
    role: "Manager, Rue des Arcades Coffee",
    initial: "SM",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "free forever",
    description: "For one location finding its rhythm.",
    features: [
      "One loyalty program",
      "QR check-in & digital cards",
      "Core member analytics",
    ],
    cta: "Start free",
    popular: false,
  },
  {
    name: "Growth",
    price: "$29",
    period: "per month",
    description: "For cafes ready to build lasting habits.",
    features: [
      "Everything in Starter",
      "In-app menu updates",
      "Automated member care",
      "Monthly email reports",
    ],
    cta: "Start Building Loyalty",
    popular: true,
  },
  {
    name: "Flagship",
    price: "$59",
    period: "per month",
    description: "For busy counters with big followings.",
    features: [
      "Everything in Growth",
      "Multi-location insights",
      "Priority support & onboarding",
    ],
    cta: "Talk to us",
    popular: false,
  },
];

const buttonPrimary =
  "inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-purple px-6 text-sm font-bold text-white transition-all duration-200 hover:bg-purple-dark";

const buttonSecondary =
  "inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-line bg-surface-solid px-6 text-sm font-bold text-ink transition-all duration-200 hover:border-line-strong hover:bg-surface-soft";

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
            <a href="#bento" className="transition-colors duration-200 hover:text-ink">Loyalty cards</a>
            <a href="#pricing" className="transition-colors duration-200 hover:text-ink">Pricing</a>
          </nav>
          <Link
            href="/dashboard"
            className="inline-flex h-9 items-center justify-center rounded-xl bg-purple px-4 text-xs font-bold text-white shadow-[0_6px_14px_#7C3AED2E] transition-all duration-200 hover:bg-purple-dark"
          >
            Open dashboard
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 lg:px-8">
        <section className="grid items-center gap-12 pb-16 pt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:pb-20 lg:pt-20">
          <div>
            <p className="eyebrow">Loyalty studio for modern cafes</p>
            <h1 className="mt-4 text-4xl font-bold leading-[1.08] tracking-[-.045em] sm:text-5xl">
              Loyalty that keeps them coming back.
            </h1>
            <p className="mt-5 max-w-lg text-base font-light leading-relaxed text-muted sm:text-lg">
              Perkly turns every coffee run into an easy reason to return —
              digital loyalty cards, one QR at the register, and rewards your
              regulars actually use.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="/dashboard" className={buttonPrimary}>
                Start Building Loyalty
                <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
              </a>
              <a href="#bento" className={buttonSecondary}>
                See loyalty cards in action
              </a>
            </div>
            <p className="mt-6 flex items-center gap-2 text-[11px] font-semibold text-muted">
              <BadgeCheck aria-hidden="true" className="h-4 w-4 text-success" strokeWidth={1.8} />
              No app downloads for customers — set up in one afternoon
            </p>
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
        </div>
        </section>
        <section id="bento" className="scroll-mt-20 border-t border-line py-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="eyebrow">The toolkit</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-.04em]">
              Everything your cafe needs, in one place.
            </h2>
            <p className="body-copy mt-3">
              Six quiet tools working together — from the QR at the till to the analytics on your desk.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bentoTiles.map((tile) => (
              <div
                key={tile.title}
                className="rounded-2xl border border-line bg-card p-6 transition-all duration-200 hover:border-purple/20 hover:shadow-lg"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-purple-soft text-purple">
                  <tile.icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 text-sm font-bold tracking-[-.02em] text-ink">{tile.title}</h3>
                <p className="mt-1.5 text-[13px] font-light leading-relaxed text-muted">{tile.description}</p>
              </div>
            ))}
          </div>
        </section>
        <section id="how-it-works" className="scroll-mt-20 border-t border-line py-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-.04em]">
              How Perkly works for your cafe.
            </h2>
            <p className="body-copy mt-3">
              Three small steps between you and a loyalty program your regulars actually talk about.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="rounded-2xl border border-line bg-card p-6">
                <p className="text-[11px] font-bold uppercase tracking-[.18em] text-gold">{step.number}</p>
                <h3 className="mt-3 text-sm font-bold tracking-[-.02em] text-ink">{step.title}</h3>
                <p className="mt-1.5 text-[13px] font-light leading-relaxed text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="border-t border-line py-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="eyebrow">From behind the counter</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-.04em]">
              Cafe owners on what changed.
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <figure
                key={testimonial.name}
                className="flex flex-col rounded-2xl border border-line bg-card p-6"
              >
                <Quote aria-hidden="true" className="h-5 w-5 text-gold" strokeWidth={1.8} />
                <blockquote className="mt-4 flex-1 text-[13px] font-light leading-relaxed text-muted">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-2.5 border-t border-line pt-4">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-purple-soft text-[10px] font-bold text-purple">
                    {testimonial.initial}
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
        <section id="pricing" className="scroll-mt-20 border-t border-line py-16 lg:py-20">
          <div className="max-w-2xl">
            <p className="eyebrow">Pricing</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-.04em]">
              Everything your cafe needs to thrive.
            </h2>
            <p className="body-copy mt-3">
              Start free and upgrade when the stamps start adding up.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 items-stretch gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-200 hover:shadow-lg ${
                  plan.popular
                    ? "border-purple/25 bg-surface-soft ring-1 ring-purple/10 hover:border-purple/35"
                    : "border-line bg-card hover:border-purple/20"
                }`}
              >
                {plan.popular ? (
                  <span className="absolute right-5 top-5 rounded-full bg-gold px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.14em] text-amber-700">
                    Popular
                  </span>
                ) : null}
                <h3 className="text-sm font-bold tracking-[-.02em] text-ink">{plan.name}</h3>
                <p className="mt-1.5 text-[12px] font-light text-muted">{plan.description}</p>
                <p className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-3xl font-bold tracking-[-.04em]">{plan.price}</span>
                  <span className="text-xs font-semibold text-muted">{plan.period}</span>
                </p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-[13px] font-light text-muted">
                      <Check aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-success" strokeWidth={2} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="/dashboard"
                  className={`mt-7 inline-flex h-10 items-center justify-center rounded-xl text-xs font-bold transition-all duration-200 ${
                    plan.popular
                      ? "bg-purple text-white hover:bg-purple-dark"
                      : "border border-line bg-surface-solid text-ink hover:border-line-strong hover:bg-surface-soft"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-10 text-[11px] font-semibold text-muted sm:flex-row sm:items-center lg:px-8">
          <span>Perkly — Loyalty Studio</span>
          <span className="flex items-center gap-2">
            <Coffee aria-hidden="true" className="h-3.5 w-3.5 text-gold" strokeWidth={1.8} />
            Built for the morning ritual.
          </span>
        </div>
      </footer>
    </div>
  );
}
