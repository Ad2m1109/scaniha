import {
  ArrowUpRight,
  Coffee,
  Fish,
  Flame,
  Pizza,
  Salad,
  UtensilsCrossed,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { business, menuCategories } from "@/lib/garanemsa/content";
import type { Copy, Locale } from "@/lib/garanemsa/content";
import { BotanicalPattern, Divider } from "./decor";

const categoryIcons: Record<string, LucideIcon> = {
  pizzas: Pizza,
  salades: Salad,
  poissons: Fish,
  grillades: Flame,
  boissons: Coffee,
};

interface MenuSectionProps {
  t: Copy;
  locale: Locale;
}

export function MenuSection({ t, locale }: MenuSectionProps) {
  return (
    <section
      id="carte"
      className="gr-section gr-menu"
      aria-labelledby="gr-menu-title"
    >
      <BotanicalPattern className="gr-menu__pattern" />

      <div className="gr-container">
        <div className="gr-menu__head" data-reveal>
          <p className="gr-eyebrow gr-eyebrow--light">{t.menu.eyebrow}</p>
          <h2 id="gr-menu-title" className="gr-h2 gr-h2--light">
            {t.menu.title}
          </h2>
          <Divider className="gr-divider--light" />
          <p className="gr-lead gr-lead--light">{t.menu.body}</p>
        </div>

        <div className="gr-menu__panel" data-reveal>
          <ul className="gr-menu__list">
            {menuCategories.map((category, index) => {
              const Icon = categoryIcons[category.id] ?? UtensilsCrossed;

              return (
                <li key={category.id} className="gr-menu__row">
                  <span className="gr-menu__icon">
                    <Icon aria-hidden="true" />
                  </span>

                  <div className="gr-menu__body">
                    <div className="gr-menu__line">
                      <h3>{category.label[locale]}</h3>
                      <span className="gr-menu__dots" aria-hidden="true" />
                      {category.items.length === 0 ? (
                        <span className="gr-menu__status">
                          {t.menu.pending}
                        </span>
                      ) : null}
                    </div>

                    {category.items.length > 0 ? (
                      <ul className="gr-menu__items">
                        {category.items.map((item, itemIndex) => (
                          <li key={`${category.id}-${itemIndex}`}>
                            <div className="gr-menu__item-line">
                              <span>{item.name[locale]}</span>
                              <span
                                className="gr-menu__dots"
                                aria-hidden="true"
                              />
                              {item.price ? (
                                <span className="gr-menu__price">
                                  {item.price}
                                </span>
                              ) : null}
                            </div>
                            {item.description ? (
                              <p>{item.description[locale]}</p>
                            ) : null}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>

                  <span className="gr-menu__index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="gr-menu__foot">
            <p className="gr-note gr-note--light">{t.menu.note}</p>

            {business.menuUrl ? (
              <a
                className="gr-btn gr-btn--gold"
                href={business.menuUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.menu.fullMenu}
                <ArrowUpRight className="gr-arrow" aria-hidden="true" />
              </a>
            ) : (
              <span
                className="gr-btn gr-btn--ghost-light gr-btn--disabled"
                aria-disabled="true"
                title={t.menu.fullMenuPending}
              >
                {t.menu.fullMenu}
                <span className="gr-btn__soon">{t.common.comingSoon}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
