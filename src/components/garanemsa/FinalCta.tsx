import { ArrowRight, Navigation } from "lucide-react";
import { business } from "@/lib/garanemsa/content";
import type { Copy } from "@/lib/garanemsa/content";
import { BotanicalPattern } from "./decor";

export function FinalCta({ t }: { t: Copy }) {
  return (
    <section className="gr-section gr-cta" aria-labelledby="gr-cta-title">
      <BotanicalPattern className="gr-cta__pattern" />

      <div className="gr-container gr-cta__inner" data-reveal>
        <p className="gr-eyebrow gr-eyebrow--light">{t.cta.eyebrow}</p>
        <h2 id="gr-cta-title" className="gr-h2 gr-h2--light gr-cta__title">
          {t.cta.title}
        </h2>
        <p className="gr-lead gr-lead--light">{t.cta.body}</p>

        <div className="gr-actions gr-actions--center">
          <a className="gr-btn gr-btn--gold" href="#carte">
            {t.cta.menu}
            <ArrowRight className="gr-arrow" aria-hidden="true" />
          </a>
          <a
            className="gr-btn gr-btn--outline-light"
            href={business.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Navigation aria-hidden="true" />
            {t.cta.directions}
          </a>
          <a className="gr-btn gr-btn--outline-light" href="#contact">
            {t.cta.contact}
          </a>
        </div>
      </div>
    </section>
  );
}
