/**
 * Garanemsa — single source of truth for the public profile.
 *
 * Everything shown on /garanemsa comes from this file. Values that have not
 * been verified with the restaurant are deliberately `null` and are rendered
 * as "À confirmer" on the page. See README.md in this folder before editing.
 */

export type Locale = "fr" | "en" | "ar";

export type Localized = Record<Locale, string>;

export interface MenuItem {
  name: Localized;
  description?: Localized;
  /** Only set once the price is confirmed, e.g. "12,500 DT". */
  price?: string;
}

export interface MenuCategory {
  id: string;
  label: Localized;
  items: MenuItem[];
}

export interface GalleryShot {
  id: string;
  label: Localized;
  alt: Localized;
  /** Example: "/garanemsa/salle.jpg". Leave null until an official photo exists. */
  src: string | null;
}

export const locales: { id: Locale; label: string }[] = [
  { id: "fr", label: "FR" },
  { id: "en", label: "EN" },
  { id: "ar", label: "AR" },
];

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "fr" || value === "en" || value === "ar";
}

const rawSiteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
const siteUrl =
  rawSiteUrl && !/localhost|127\.0\.0\.1/.test(rawSiteUrl)
    ? rawSiteUrl.replace(/\/$/, "")
    : "https://scaniha.netlify.app";

/**
 * Verified facts only.
 * - `name`, `city` and the category names come from the Scaniha brief.
 * - Address, phone, hours, social links and menu URL are unknown: keep null.
 */
export const business = {
  name: "Garanemsa",
  subtitle: {
    fr: "Café & Resto",
    en: "Café & Resto",
    ar: "مقهى ومطعم",
  } as Localized,
  city: {
    fr: "Sousse, Tunisie",
    en: "Sousse, Tunisia",
    ar: "سوسة، تونس",
  } as Localized,
  address: null as string | null,
  phone: null as string | null,
  hours: null as Localized | null,
  instagram: null as string | null,
  facebook: null as string | null,
  whatsapp: null as string | null,
  menuUrl: null as string | null,
  heroImage: null as string | null,
  heroAlt: {
    fr: "Intérieur chaleureux de Garanemsa Café & Resto à Sousse",
    en: "Warm interior of Garanemsa Café & Resto in Sousse",
    ar: "الديكور الدافئ لمقهى ومطعم Garanemsa في سوسة",
  } as Localized,
  /**
   * A name search is safe without a verified address and still gives visitors
   * a working directions action.
   */
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Garanemsa%20Caf%C3%A9%20%26%20Resto%20Sousse%20Tunisie",
  siteUrl,
};

export const menuCategories: MenuCategory[] = [
  {
    id: "pizzas",
    label: { fr: "Pizzas", en: "Pizzas", ar: "بيتزا" },
    items: [],
  },
  {
    id: "salades",
    label: { fr: "Salades", en: "Salads", ar: "سلطات" },
    items: [],
  },
  {
    id: "poissons",
    label: {
      fr: "Poissons & fruits de mer",
      en: "Fish & seafood",
      ar: "أسماك وثمار البحر",
    },
    items: [],
  },
  {
    id: "grillades",
    label: {
      fr: "Grillades & plats",
      en: "Grills & mains",
      ar: "مشاوٍ وأطباق",
    },
    items: [],
  },
  {
    id: "boissons",
    label: {
      fr: "Boissons & café",
      en: "Drinks & coffee",
      ar: "مشروبات وقهوة",
    },
    items: [],
  },
];

export const gallery: GalleryShot[] = [
  {
    id: "indoor",
    label: {
      fr: "Salle intérieure",
      en: "Indoor seating",
      ar: "القاعة الداخلية",
    },
    alt: {
      fr: "Salle intérieure de Garanemsa",
      en: "Garanemsa indoor dining room",
      ar: "القاعة الداخلية في Garanemsa",
    },
    src: null,
  },
  {
    id: "terrace",
    label: { fr: "Terrasse", en: "Terrace", ar: "التراس" },
    alt: {
      fr: "Terrasse de Garanemsa",
      en: "Garanemsa terrace",
      ar: "تراس Garanemsa",
    },
    src: null,
  },
  {
    id: "plants",
    label: {
      fr: "Décor & plantes",
      en: "Décor & plants",
      ar: "الديكور والنباتات",
    },
    alt: {
      fr: "Plantes et décoration intérieure de Garanemsa",
      en: "Garanemsa plants and interior décor",
      ar: "نباتات وديكور Garanemsa الداخلي",
    },
    src: null,
  },
  {
    id: "food",
    label: {
      fr: "Café & assiettes",
      en: "Coffee & plates",
      ar: "القهوة والأطباق",
    },
    alt: {
      fr: "Café et plats servis chez Garanemsa",
      en: "Coffee and dishes served at Garanemsa",
      ar: "قهوة وأطباق تُقدَّم في Garanemsa",
    },
    src: null,
  },
  {
    id: "evening",
    label: {
      fr: "Ambiance du soir",
      en: "Evening atmosphere",
      ar: "أجواء المساء",
    },
    alt: {
      fr: "Ambiance du soir chez Garanemsa",
      en: "Garanemsa evening atmosphere",
      ar: "أجواء المساء في Garanemsa",
    },
    src: null,
  },
];

const fr = {
  nav: {
    menu: "La carte",
    gallery: "Galerie",
    contact: "Contact",
    directions: "Itinéraire",
  },
  hero: {
    eyebrow: "Sousse · Tunisie",
    headline: "Un lieu pour se retrouver, goûter et profiter.",
    body: "Un café-restaurant chaleureux à Sousse, où les plantes, le bois et la lumière chaude composent un cadre simple et accueillant.",
    primary: "Voir la carte",
    secondary: "Itinéraire",
    photoPending: "Photo du restaurant à venir",
    note: "Profil numérique Scaniha",
    scroll: "Découvrir",
  },
  about: {
    eyebrow: "Bienvenue",
    title: "Un café-resto, un jardin en ville.",
    p1: "Garanemsa est un café-restaurant à Sousse. On y vient pour un repas, un café ou un moment partagé, dans un intérieur aux tons verts, égayé de plantes et baigné d’une lumière chaleureuse.",
    p2: "La salle et la terrasse offrent deux ambiances, pour un déjeuner tranquille comme pour une soirée entre amis.",
    p3: "La carte réunit pizzas, salades, poissons et fruits de mer, grillades, boissons et café. Les plats et les prix seront publiés dès validation de la carte officielle.",
    cardTitle: "Le cadre",
    cardLine: "Des plantes, du bois, une lumière dorée.",
    chips: ["Café & resto", "Salle & terrasse", "Sousse"],
  },
  menu: {
    eyebrow: "La carte",
    title: "Des envies simples, bien servies.",
    body: "Pizzas, salades, poissons et fruits de mer, grillades, boissons et café : la carte de Garanemsa se découvre sur place. Les plats et les prix seront ajoutés ici dès que la carte officielle sera confirmée.",
    pending: "À confirmer",
    note: "Aucun plat ni prix n’est affiché tant qu’il n’a pas été confirmé par l’établissement.",
    fullMenu: "Voir le menu complet",
    fullMenuPending: "Lien vers la carte officielle à venir",
  },
  gallery: {
    eyebrow: "En images",
    title: "L’atmosphère Garanemsa.",
    body: "Salle, terrasse, plantes, assiettes et lumière du soir : les photos officielles seront ajoutées ici.",
    pending: "Photo à venir",
    note: "Aucune image ne représente le restaurant tant qu’elle n’a pas été fournie par l’établissement.",
  },
  contact: {
    eyebrow: "Nous trouver",
    title: "Une adresse à Sousse.",
    body: "Les coordonnées exactes, les horaires et les réseaux sociaux seront affichés ici dès leur confirmation.",
    address: "Adresse",
    phone: "Téléphone",
    hours: "Horaires",
    social: "Réseaux sociaux",
    pending: "À confirmer",
    directions: "Ouvrir dans Google Maps",
    call: "Appeler",
    mapTitle: "Sousse, Tunisie",
    mapNote:
      "Adresse exacte à confirmer. Le bouton ouvre une recherche Google Maps au nom de l’établissement.",
    socialNote: "Instagram et Facebook à confirmer.",
  },
  cta: {
    eyebrow: "À bientôt",
    title: "La prochaine table est pour vous.",
    body: "Découvrez la carte, préparez votre itinéraire ou revenez nous voir à Sousse.",
    menu: "Explorer la carte",
    directions: "Itinéraire",
    contact: "Nous contacter",
  },
  footer: {
    tagline: "Café & Resto · Sousse, Tunisie",
    credit: "Profil numérique réalisé avec Scaniha",
    pending: "Informations en cours de vérification.",
    backToTop: "Retour en haut",
  },
  common: {
    skip: "Aller au contenu",
    language: "Langue",
    pending: "À confirmer",
    comingSoon: "Bientôt disponible",
    quickActions: "Actions rapides",
    mainNav: "Navigation principale",
  },
};

export type Copy = typeof fr;

const en: Copy = {
  nav: {
    menu: "Menu",
    gallery: "Gallery",
    contact: "Contact",
    directions: "Directions",
  },
  hero: {
    eyebrow: "Sousse · Tunisia",
    headline: "A place to gather, taste and enjoy.",
    body: "A warm café-restaurant in Sousse, where plants, wood and soft light create a simple, welcoming setting.",
    primary: "View menu",
    secondary: "Get directions",
    photoPending: "Restaurant photo coming soon",
    note: "Scaniha digital profile",
    scroll: "Discover",
  },
  about: {
    eyebrow: "Welcome",
    title: "A café-resto, a garden in the city.",
    p1: "Garanemsa is a café-restaurant in Sousse. Come for a meal, a coffee or a shared moment, in green-toned interiors brightened by plants and warm light.",
    p2: "The dining room and terrace offer two moods, for a quiet lunch or an evening with friends.",
    p3: "The menu brings together pizzas, salads, fish and seafood, grills, drinks and coffee. Dishes and prices will be published once the official menu is confirmed.",
    cardTitle: "The setting",
    cardLine: "Plants, wood, golden light.",
    chips: ["Café & resto", "Indoor & terrace", "Sousse"],
  },
  menu: {
    eyebrow: "The menu",
    title: "Simple cravings, served well.",
    body: "Pizzas, salads, fish and seafood, grills, drinks and coffee: Garanemsa’s menu is discovered on site. Dishes and prices will be added here once the official menu is confirmed.",
    pending: "To be confirmed",
    note: "No dish or price is shown until it has been confirmed by the restaurant.",
    fullMenu: "View full menu",
    fullMenuPending: "Link to the official menu coming soon",
  },
  gallery: {
    eyebrow: "In pictures",
    title: "The Garanemsa atmosphere.",
    body: "Dining room, terrace, plants, plates and evening light: official photos will be added here.",
    pending: "Photo coming soon",
    note: "No image represents the restaurant until it has been provided by the establishment.",
  },
  contact: {
    eyebrow: "Find us",
    title: "An address in Sousse.",
    body: "Exact contact details, opening hours and social links will appear here once confirmed.",
    address: "Address",
    phone: "Phone",
    hours: "Opening hours",
    social: "Social media",
    pending: "To be confirmed",
    directions: "Open in Google Maps",
    call: "Call",
    mapTitle: "Sousse, Tunisia",
    mapNote:
      "Exact address to be confirmed. The button opens a Google Maps search for the establishment.",
    socialNote: "Instagram and Facebook to be confirmed.",
  },
  cta: {
    eyebrow: "See you soon",
    title: "The next table is yours.",
    body: "Explore the menu, plan your route or come back to see us in Sousse.",
    menu: "Explore the menu",
    directions: "Directions",
    contact: "Contact us",
  },
  footer: {
    tagline: "Café & Resto · Sousse, Tunisia",
    credit: "Digital profile made with Scaniha",
    pending: "Information is being verified.",
    backToTop: "Back to top",
  },
  common: {
    skip: "Skip to content",
    language: "Language",
    pending: "To be confirmed",
    comingSoon: "Coming soon",
    quickActions: "Quick actions",
    mainNav: "Main navigation",
  },
};

const ar: Copy = {
  nav: {
    menu: "القائمة",
    gallery: "الصور",
    contact: "التواصل",
    directions: "الاتجاهات",
  },
  hero: {
    eyebrow: "سوسة · تونس",
    headline: "مكان للالتقاء والتذوق والاستمتاع.",
    body: "مقهى ومطعم دافئ في سوسة، حيث تمنح النباتات والخشب والضوء الدافئ جواً بسيطاً ومرحباً.",
    primary: "اطلع على القائمة",
    secondary: "الاتجاهات",
    photoPending: "صورة المطعم قادمة",
    note: "ملف رقمي من Scaniha",
    scroll: "اكتشف",
  },
  about: {
    eyebrow: "أهلاً بكم",
    title: "مقهى ومطعم، حديقة في المدينة.",
    p1: "Garanemsa مقهى ومطعم في سوسة. تأتي إليه لتناول وجبة أو قهوة أو لقضاء وقت مشترك، في مساحة داخلية بدرجات خضراء تملؤها النباتات ويغمرها ضوء دافئ.",
    p2: "توفّر القاعة والتراس أجواءً مختلفة، لغداء هادئ أو أمسية مع الأصدقاء.",
    p3: "تضم القائمة البيتزا والسلطات والأسماك والمأكولات البحرية والمشاوي والمشروبات والقهوة. ستُنشر الأطباق والأسعار بعد تأكيد القائمة الرسمية.",
    cardTitle: "المكان",
    cardLine: "نباتات، خشب، وضوء ذهبي.",
    chips: ["مقهى ومطعم", "قاعة وتراس", "سوسة"],
  },
  menu: {
    eyebrow: "القائمة",
    title: "رغبات بسيطة، تُقدَّم بعناية.",
    body: "البيتزا، السلطات، الأسماك والمأكولات البحرية، المشاوي، المشروبات والقهوة: قائمة Garanemsa تُكتشف في المكان. ستُضاف الأطباق والأسعار هنا بعد تأكيد القائمة الرسمية.",
    pending: "قيد التأكيد",
    note: "لا يُعرض أي طبق أو سعر قبل تأكيده من المؤسسة.",
    fullMenu: "عرض القائمة الكاملة",
    fullMenuPending: "رابط القائمة الرسمية قادم",
  },
  gallery: {
    eyebrow: "بالصور",
    title: "أجواء Garanemsa.",
    body: "القاعة، التراس، النباتات، الأطباق وضوء المساء: ستُضاف الصور الرسمية هنا.",
    pending: "صورة قادمة",
    note: "لا تمثّل أي صورة المطعم قبل توفيرها من المؤسسة.",
  },
  contact: {
    eyebrow: "أين تجدنا",
    title: "عنوان في سوسة.",
    body: "ستُعرض هنا العناوين الدقيقة والمواعيد وحسابات التواصل الاجتماعي بعد تأكيدها.",
    address: "العنوان",
    phone: "الهاتف",
    hours: "المواعيد",
    social: "شبكات التواصل",
    pending: "قيد التأكيد",
    directions: "افتح في خرائط Google",
    call: "اتصل",
    mapTitle: "سوسة، تونس",
    mapNote:
      "العنوان الدقيق قيد التأكيد. يفتح الزر بحثاً في خرائط Google باسم المؤسسة.",
    socialNote: "إنستغرام وفيسبوك قيد التأكيد.",
  },
  cta: {
    eyebrow: "إلى اللقاء",
    title: "الطاولة القادمة لكم.",
    body: "اطلعوا على القائمة، حضّروا طريقكم، أو عودوا لزيارتنا في سوسة.",
    menu: "استكشف القائمة",
    directions: "الاتجاهات",
    contact: "تواصل معنا",
  },
  footer: {
    tagline: "مقهى ومطعم · سوسة، تونس",
    credit: "ملف رقمي من إنشاء Scaniha",
    pending: "المعلومات قيد التحقق.",
    backToTop: "العودة إلى الأعلى",
  },
  common: {
    skip: "انتقل إلى المحتوى",
    language: "اللغة",
    pending: "قيد التأكيد",
    comingSoon: "قريباً",
    quickActions: "إجراءات سريعة",
    mainNav: "التنقل الرئيسي",
  },
};

export const copy: Record<Locale, Copy> = { fr, en, ar };
