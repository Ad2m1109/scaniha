"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  ArrowUpRight,
  Navigation,
  UtensilsCrossed,
} from "lucide-react";
import {
  business,
  copy,
  isLocale,
  locales,
} from "@/lib/garanemsa/content";
import type { Locale } from "@/lib/garanemsa/content";
import { About } from "./About";
import { Contact } from "./Contact";
import { LeafMark } from "./decor";
import { FinalCta } from "./FinalCta";
import { Footer } from "./Footer";
import { Gallery } from "./Gallery";
import { Hero } from "./Hero";
import { MenuSection } from "./MenuSection";

interface GaranemsaPageProps {
  fontClassName: string;
}

const titles: Record<Locale, string> = {
  fr: "Garanemsa Café & Resto — Sousse, Tunisie",
  en: "Garanemsa Café & Resto — Sousse, Tunisia",
  ar: "Garanemsa مقهى ومطعم — سوسة، تونس",
};

const LANGUAGE_KEY = "garanemsa.lang";
let cachedLocale: Locale | null = null;
const localeListeners = new Set<() => void>();

function readLocale(): Locale {
  if (cachedLocale) return cachedLocale;

  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  const stored = window.localStorage.getItem(LANGUAGE_KEY);
  cachedLocale = isLocale(fromUrl) ? fromUrl : isLocale(stored) ? stored : "fr";
  return cachedLocale;
}

function subscribeToLocale(listener: () => void): () => void {
  localeListeners.add(listener);

  const onStorage = (event: StorageEvent) => {
    if (event.key === LANGUAGE_KEY) {
      cachedLocale = null;
      listener();
    }
  };

  window.addEventListener("storage", onStorage);

  return () => {
    localeListeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getServerLocale(): Locale {
  return "fr";
}

function changeLocale(next: Locale): void {
  cachedLocale = next;
  window.localStorage.setItem(LANGUAGE_KEY, next);

  const url = new URL(window.location.href);
  if (url.searchParams.has("lang")) {
    url.searchParams.delete("lang");
    window.history.replaceState(null, "", url);
  }

  localeListeners.forEach((listener) => listener());
}

export function GaranemsaPage({ fontClassName }: GaranemsaPageProps) {
  const locale = useSyncExternalStore(
    subscribeToLocale,
    readLocale,
    getServerLocale,
  );
  const t = copy[locale];
  const dir = locale === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.title = titles[locale];
  }, [locale]);

  // Subtle reveal on scroll. Falls back to visible content when the API or
  // motion preference does not allow animation.
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(".gr [data-reveal]"),
    );
    if (nodes.length === 0) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="top"
      className={`gr ${fontClassName}`}
      lang={locale}
      dir={dir}
    >
      <a className="gr-skip" href="#contenu">
        {t.common.skip}
      </a>

      <header className="gr-nav">
        <div className="gr-container gr-nav__inner">
          <a
            className="gr-brand"
            href="#top"
            aria-label={`${business.name} — ${business.subtitle[locale]}`}
          >
            <span className="gr-brand__mark">
              <LeafMark aria-hidden="true" />
            </span>
            <span className="gr-brand__text">
              <span className="gr-brand__name">{business.name}</span>
              <span className="gr-brand__sub">
                {business.subtitle[locale]}
              </span>
            </span>
          </a>

          <nav className="gr-nav__links" aria-label={t.common.mainNav}>
            <a href="#carte">{t.nav.menu}</a>
            <a href="#galerie">{t.nav.gallery}</a>
            <a href="#contact">{t.nav.contact}</a>
          </nav>

          <div className="gr-nav__right">
            <a
              className="gr-nav__cta"
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.nav.directions}
              <ArrowUpRight aria-hidden="true" />
            </a>

            <div
              className="gr-lang"
              role="group"
              aria-label={t.common.language}
              dir="ltr"
            >
              {locales.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  lang={item.id}
                  aria-pressed={locale === item.id}
                  onClick={() => changeLocale(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main id="contenu">
        <Hero t={t} locale={locale} />
        <About t={t} locale={locale} />
        <MenuSection t={t} locale={locale} />
        <Gallery t={t} locale={locale} />
        <Contact t={t} locale={locale} />
        <FinalCta t={t} />
      </main>

      <Footer t={t} locale={locale} />

      <nav className="gr-mobilebar" aria-label={t.common.quickActions}>
        <a href="#carte">
          <UtensilsCrossed aria-hidden="true" />
          {t.nav.menu}
        </a>
        <a
          href={business.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Navigation aria-hidden="true" />
          {t.nav.directions}
        </a>
      </nav>
    </div>
  );
}
