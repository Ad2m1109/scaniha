import {
  ArrowUpRight,
  Clock,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Share2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { business } from "@/lib/garanemsa/content";
import type { Copy, Locale } from "@/lib/garanemsa/content";
import { FacebookMark, InstagramMark } from "./decor";
import { SectionHead } from "./SectionHead";

interface ContactProps {
  t: Copy;
  locale: Locale;
}

interface ContactRow {
  key: string;
  label: string;
  value: string | null;
  href: string | null;
  icon: LucideIcon;
}

interface SocialLink {
  label: string;
  href: string;
  icon: "instagram" | "facebook" | "whatsapp";
}

export function Contact({ t, locale }: ContactProps) {
  const rows: ContactRow[] = [
    {
      key: "address",
      label: t.contact.address,
      value: business.address,
      href: null,
      icon: MapPin,
    },
    {
      key: "phone",
      label: t.contact.phone,
      value: business.phone,
      href: business.phone
        ? `tel:${business.phone.replace(/[^\d+]/g, "")}`
        : null,
      icon: Phone,
    },
    {
      key: "hours",
      label: t.contact.hours,
      value: business.hours?.[locale] ?? null,
      href: null,
      icon: Clock,
    },
  ];

  const socials: SocialLink[] = [];
  if (business.instagram) {
    socials.push({
      label: "Instagram",
      href: business.instagram,
      icon: "instagram",
    });
  }
  if (business.facebook) {
    socials.push({
      label: "Facebook",
      href: business.facebook,
      icon: "facebook",
    });
  }
  if (business.whatsapp) {
    socials.push({
      label: "WhatsApp",
      href: business.whatsapp,
      icon: "whatsapp",
    });
  }

  return (
    <section
      id="contact"
      className="gr-section gr-contact"
      aria-labelledby="gr-contact-title"
    >
      <div className="gr-container gr-contact__grid">
        <div className="gr-contact__info">
          <SectionHead
            id="gr-contact-title"
            eyebrow={t.contact.eyebrow}
            title={t.contact.title}
            body={t.contact.body}
          />

          <ul className="gr-contact__list" data-reveal>
            {rows.map((row) => {
              const Icon = row.icon;

              return (
                <li key={row.key} className="gr-contact__row">
                  <span className="gr-contact__icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <div className="gr-contact__body">
                    <p className="gr-contact__label">{row.label}</p>
                    {row.value ? (
                      row.href ? (
                        <a className="gr-contact__value" href={row.href}>
                          {row.value}
                        </a>
                      ) : (
                        <p className="gr-contact__value">{row.value}</p>
                      )
                    ) : (
                      <p className="gr-contact__pending">
                        {t.contact.pending}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}

            <li className="gr-contact__row">
              <span className="gr-contact__icon">
                <Share2 aria-hidden="true" />
              </span>
              <div className="gr-contact__body">
                <p className="gr-contact__label">{t.contact.social}</p>
                {socials.length > 0 ? (
                  <div className="gr-socials">
                    {socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {social.icon === "instagram" ? (
                          <InstagramMark />
                        ) : social.icon === "facebook" ? (
                          <FacebookMark />
                        ) : (
                          <MessageCircle aria-hidden="true" />
                        )}
                        {social.label}
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="gr-contact__pending">
                    {t.contact.socialNote}
                  </p>
                )}
              </div>
            </li>
          </ul>

          <div className="gr-actions" data-reveal>
            <a
              className="gr-btn gr-btn--green"
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Navigation aria-hidden="true" />
              {t.contact.directions}
            </a>

            {business.phone ? (
              <a
                className="gr-btn gr-btn--outline"
                href={`tel:${business.phone.replace(/[^\d+]/g, "")}`}
              >
                <Phone aria-hidden="true" />
                {t.contact.call}
              </a>
            ) : (
              <span
                className="gr-btn gr-btn--outline gr-btn--disabled"
                aria-disabled="true"
                title={t.contact.pending}
              >
                <Phone aria-hidden="true" />
                {t.contact.call}
                <span className="gr-btn__soon">{t.common.comingSoon}</span>
              </span>
            )}
          </div>
        </div>

        <aside
          className="gr-map"
          aria-label={t.contact.mapTitle}
          data-reveal
        >
          <span className="gr-map__grid" aria-hidden="true" />
          <span className="gr-map__pin" aria-hidden="true">
            <MapPin />
          </span>

          <div className="gr-map__content">
            <p className="gr-eyebrow gr-eyebrow--light">{t.contact.mapTitle}</p>
            <p className="gr-map__note">{t.contact.mapNote}</p>
            <a
              className="gr-btn gr-btn--gold"
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.contact.directions}
              <ArrowUpRight className="gr-arrow" aria-hidden="true" />
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
