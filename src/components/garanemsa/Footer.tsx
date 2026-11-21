import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { business } from "@/lib/garanemsa/content";
import type { Copy, Locale } from "@/lib/garanemsa/content";
import { LeafMark } from "./decor";

interface FooterProps {
  t: Copy;
  locale: Locale;
}

export function Footer({ t, locale }: FooterProps) {
  return (
    <footer className="gr-footer">
      <div className="gr-container gr-footer__inner">
        <div className="gr-footer__top">
          <a className="gr-footer__brand" href="#top">
            <span className="gr-footer__mark">
              <LeafMark aria-hidden="true" />
            </span>
            <span className="gr-footer__name">{business.name}</span>
            <span className="gr-footer__sub">
              {business.subtitle[locale]}
            </span>
          </a>

          <p className="gr-footer__meta">{t.footer.tagline}</p>
        </div>

        <div className="gr-footer__bottom">
          <p className="gr-footer__pending">{t.footer.pending}</p>

          <div className="gr-footer__links">
            <Link className="gr-footer__credit" href="/">
              {t.footer.credit}
            </Link>
            <a className="gr-footer__top-link" href="#top">
              {t.footer.backToTop}
              <ArrowUp aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
