# Garanemsa — public profile

The page at `/garanemsa` is a standalone, mobile-first profile for **Garanemsa
Café & Resto, Sousse**. It is intentionally independent from the Scaniha
dashboard and from `.data/`, so it works as a static route on Netlify.

## Files

| File | Purpose |
| --- | --- |
| `src/app/garanemsa/page.tsx` | Route, metadata, JSON-LD, fonts |
| `src/app/garanemsa/garanemsa.css` | Scoped design system (`.gr`) |
| `src/app/garanemsa/opengraph-image.tsx` | Social share card (1200×630) |
| `src/app/garanemsa/icon.svg` | Route favicon |
| `src/app/garanemsa/loading.tsx` | Branded loading state |
| `src/app/garanemsa/error.tsx` | Branded error state |
| `src/components/garanemsa/*` | Page sections |
| `src/lib/garanemsa/content.ts` | **All content and configuration** |

## Updating the profile

Edit `src/lib/garanemsa/content.ts`, then redeploy. No QR code needs to change:
the URL stays `/garanemsa`.

### Contact details

```ts
address: "12 rue Example, Sousse 4000",
phone: "+216 73 000 000",
hours: {
  fr: "Tous les jours, 8h–23h",
  en: "Every day, 8am–11pm",
  ar: "كل يوم، 8 صباحاً–11 مساءً",
},
instagram: "https://www.instagram.com/…",
facebook: "https://www.facebook.com/…",
whatsapp: "https://wa.me/216…",
```

Any value left as `null` is shown as **À confirmer / To be confirmed / قيد
التأكيد**. The phone button stays disabled until a number is set. Google Maps
always opens a name search, so directions work before the exact address is
known.

### Menu and prices

Only add dishes and prices from the restaurant's verified menu. Fill the
`items` array of a category:

```ts
{
  id: "pizzas",
  label: { fr: "Pizzas", en: "Pizzas", ar: "بيتزا" },
  items: [
    {
      name: { fr: "Margherita", en: "Margherita", ar: "مارغريتا" },
      description: {
        fr: "Tomate, mozzarella, basilic",
        en: "Tomato, mozzarella, basil",
        ar: "طماطم، موزاريلا، ريحان",
      },
      price: "14,000 DT",
    },
  ],
},
```

When `items` is non-empty the category switches from the “À confirmer” state to
the real menu list automatically. Set `menuUrl` to the official PDF or menu
page to enable the **Voir le menu complet** button.

### Photos

1. Put official photos in `public/garanemsa/` (create the folder).
2. Set the matching `src` in `business.heroImage` or in a `gallery` entry:

```ts
heroImage: "/garanemsa/salle.jpg",
// gallery entry
src: "/garanemsa/terrasse.jpg",
```

Until then the page renders an intentional botanical placeholder, clearly
labelled “Photo à venir”. A configured file that fails to load also falls back
to the placeholder. Do not use stock or AI images presented as the real
restaurant.

Recommended exports: hero 1600×2000 (4:5), gallery 1200×900, WebP or AVIF,
under ~300 KB each.

### Branding

The palette and typography live at the top of `garanemsa.css` as CSS variables
(`--gr-green-900`, `--gr-gold`, `--gr-cream`, `--gr-serif`, `--gr-sans`).
Changing them updates the whole page without touching the components.

### Languages

French is the default and the SEO language. English and Arabic are available
from the FR / EN / AR switch in the header, and can be linked directly:

- `/garanemsa` — French
- `/garanemsa?lang=en` — English
- `/garanemsa?lang=ar` — Arabic (RTL)

All visible strings are in the `copy` object in `content.ts`. If a string is
added, add it to all three languages.

## Rules

- Do not invent a phone number, address, opening hours, social account, dish,
  price, award or history. Leave the field `null` until it is verified.
- `business.siteUrl` is read from `NEXT_PUBLIC_APP_URL` (falling back to
  `https://scaniha.netlify.app`). Set it on Netlify to the final domain so the
  canonical URL, JSON-LD and OG image use the right host.
- The page does not read `.data/` and does not write to disk, so it is safe on
  serverless hosting.

## QR code

Point the printed Scaniha card at:

```text
https://<your-domain>/garanemsa
```

The page is permanent: updating content, photos or prices only requires a
redeploy, never a reprint.

## Later: dashboard-managed content

When the Scaniha dashboard can manage this business, replace the `business`,
`menuCategories` and `gallery` exports with a fetch from a persistent store
(not `.data/` on Netlify). The components only depend on the exported types, so
the UI does not need to change.
