import { MapPin } from "lucide-react";
import { business } from "@/lib/garanemsa/content";
import type { Copy, Locale } from "@/lib/garanemsa/content";
import { BotanicalPattern, Divider, LeafBranch } from "./decor";

interface AboutProps {
  t: Copy;
  locale: Locale;
}

export function About({ t, locale }: AboutProps) {
  return (
    <section
      id="a-propos"
      className="gr-section gr-about"
      aria-labelledby="gr-about-title"
    >
      <div className="gr-container gr-about__grid">
        <div className="gr-about__copy" data-reveal>
          <p className="gr-eyebrow">{t.about.eyebrow}</p>
          <h2 id="gr-about-title" className="gr-h2">
            {t.about.title}
          </h2>
          <Divider />

          <div className="gr-about__text">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <p>{t.about.p3}</p>
          </div>
        </div>

        <aside className="gr-about__card" data-reveal>
          <BotanicalPattern className="gr-about__pattern" />
          <LeafBranch className="gr-about__branch" />

          <p className="gr-eyebrow gr-eyebrow--light">{t.about.cardTitle}</p>
          <p className="gr-about__card-line">{t.about.cardLine}</p>

          <ul className="gr-chips">
            {t.about.chips.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>

          <p className="gr-about__card-foot">
            <MapPin aria-hidden="true" />
            {business.city[locale]}
          </p>
        </aside>
      </div>
    </section>
  );
}
