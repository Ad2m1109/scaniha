import { gallery } from "@/lib/garanemsa/content";
import type { Copy, Locale } from "@/lib/garanemsa/content";
import { Photo } from "./Photo";
import { SectionHead } from "./SectionHead";

interface GalleryProps {
  t: Copy;
  locale: Locale;
}

export function Gallery({ t, locale }: GalleryProps) {
  return (
    <section
      id="galerie"
      className="gr-section gr-gallery"
      aria-labelledby="gr-gallery-title"
    >
      <div className="gr-container">
        <SectionHead
          id="gr-gallery-title"
          eyebrow={t.gallery.eyebrow}
          title={t.gallery.title}
          body={t.gallery.body}
        />

        <div className="gr-gallery__grid">
          {gallery.map((shot, index) => (
            <figure
              key={shot.id}
              className={`gr-gallery__tile gr-gallery__tile--${index + 1}`}
              data-reveal
            >
              <div className="gr-gallery__media">
                <Photo
                  src={shot.src}
                  alt={shot.alt[locale]}
                  sizes={
                    index === 0
                      ? "(max-width: 800px) 100vw, 66vw"
                      : "(max-width: 800px) 50vw, 33vw"
                  }
                />
                <span className="gr-gallery__shade" aria-hidden="true" />
              </div>

              <figcaption className="gr-gallery__caption">
                <span>{shot.label[locale]}</span>
                {!shot.src ? (
                  <span className="gr-gallery__pending">
                    {t.gallery.pending}
                  </span>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="gr-note gr-gallery__note">{t.gallery.note}</p>
      </div>
    </section>
  );
}
