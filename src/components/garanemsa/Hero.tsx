import { ArrowRight, MapPin } from "lucide-react";
import { business } from "@/lib/garanemsa/content";
import type { Copy, Locale } from "@/lib/garanemsa/content";
import { BotanicalPattern, Divider, LeafMark } from "./decor";
import { Photo } from "./Photo";

interface HeroProps {
  t: Copy;
  locale: Locale;
}

export function Hero({ t, locale }: HeroProps) {
  return (
    <section className="gr-hero" aria-labelledby="gr-hero-title">
      <BotanicalPattern className="gr-hero__pattern" />

      <div className="gr-container gr-hero__grid">
        <div className="gr-hero__copy">
          <p className="gr-eyebrow gr-eyebrow--light">{t.hero.eyebrow}</p>

          <h1 id="gr-hero-title" className="gr-hero__title">
            <span className="gr-hero__name">{business.name}</span>
            <span className="gr-hero__sub">{business.subtitle[locale]}</span>
          </h1>

          <Divider className="gr-divider--light" />

          <p className="gr-hero__headline">{t.hero.headline}</p>
          <p className="gr-hero__body">{t.hero.body}</p>

          <div className="gr-actions">
            <a className="gr-btn gr-btn--gold" href="#carte">
              {t.hero.primary}
              <ArrowRight className="gr-arrow" aria-hidden="true" />
            </a>
            <a
              className="gr-btn gr-btn--outline-light"
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin aria-hidden="true" />
              {t.hero.secondary}
            </a>
          </div>

          <p className="gr-hero__note">
            <LeafMark aria-hidden="true" />
            {t.hero.note}
          </p>
        </div>

        <div className="gr-hero__visual">
          <div className="gr-hero__frame">
            <div className="gr-hero__photo">
              <Photo
                src={business.heroImage}
                alt={business.heroAlt[locale]}
                priority
                sizes="(max-width: 900px) 90vw, 42vw"
              />
              <span className="gr-hero__photo-shade" aria-hidden="true" />
              {!business.heroImage ? (
                <span className="gr-hero__pending">{t.hero.photoPending}</span>
              ) : null}
            </div>
          </div>

          <span className="gr-hero__stamp">
            <MapPin aria-hidden="true" />
            {business.city[locale]}
          </span>
        </div>
      </div>

      <a className="gr-hero__scroll" href="#a-propos">
        <span>{t.hero.scroll}</span>
        <span className="gr-hero__scroll-line" aria-hidden="true" />
      </a>
    </section>
  );
}
