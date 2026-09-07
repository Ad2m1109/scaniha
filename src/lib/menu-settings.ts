import type { MenuSettings, MenuTemplateId } from "@/types";

export const menuDesignPresets: Record<MenuTemplateId, MenuSettings> = {
  lavender: {
    template: "lavender", currency: "DA", heroImage: "", tagline: "",
    layout: "grid", headerStyle: "centered", cardStyle: "elevated", fontFamily: "modern",
    borderRadius: "rounded", categoryStyle: "plain", showImages: true, showDescriptions: true, showContactInfo: true,
    colors: { background: "#f6f8fc", surface: "#ffffff", text: "#1e293b", muted: "#64748b", accent: "#2563eb" },
  },
  botanical: {
    template: "botanical", currency: "DA", heroImage: "", tagline: "",
    layout: "grid", headerStyle: "split", cardStyle: "outline", fontFamily: "rounded",
    borderRadius: "rounded", categoryStyle: "filled", showImages: true, showDescriptions: true, showContactInfo: true,
    colors: { background: "#f2f7f1", surface: "#ffffff", text: "#24352a", muted: "#657469", accent: "#3f6f50" },
  },
  sunset: {
    template: "sunset", currency: "DA", heroImage: "", tagline: "",
    layout: "list", headerStyle: "cover", cardStyle: "elevated", fontFamily: "rounded",
    borderRadius: "rounded", categoryStyle: "underline", showImages: true, showDescriptions: true, showContactInfo: true,
    colors: { background: "#fff7ed", surface: "#fffdf9", text: "#452f2a", muted: "#806c64", accent: "#e66345" },
  },
  noir: {
    template: "noir", currency: "DA", heroImage: "", tagline: "",
    layout: "list", headerStyle: "centered", cardStyle: "outline", fontFamily: "classic",
    borderRadius: "soft", categoryStyle: "filled", showImages: true, showDescriptions: true, showContactInfo: true,
    colors: { background: "#f5f2eb", surface: "#fffcf5", text: "#292824", muted: "#746f65", accent: "#292824" },
  },
  mono: {
    template: "mono", currency: "DA", heroImage: "", tagline: "",
    layout: "compact", headerStyle: "split", cardStyle: "minimal", fontFamily: "modern",
    borderRadius: "none", categoryStyle: "underline", showImages: false, showDescriptions: true, showContactInfo: true,
    colors: { background: "#ffffff", surface: "#ffffff", text: "#000000", muted: "#737373", accent: "#111111" },
  },
};

const ids = new Set(Object.keys(menuDesignPresets));
const layouts = new Set(["grid", "list", "compact"]);
const headers = new Set(["centered", "split", "cover"]);
const cards = new Set(["elevated", "outline", "minimal"]);
const fonts = new Set(["modern", "classic", "rounded"]);
const radii = new Set(["none", "soft", "rounded"]);
const categories = new Set(["plain", "underline", "filled"]);
const hex = /^#[0-9a-f]{6}$/i;

export function normalizeMenuSettings(input?: Partial<MenuSettings> | null): MenuSettings {
  const template = ids.has(String(input?.template)) ? input!.template! : "lavender";
  const preset = menuDesignPresets[template];
  const color = (value: unknown, fallback: string) => typeof value === "string" && hex.test(value) ? value : fallback;
  return {
    ...preset,
    ...input,
    template,
    currency: typeof input?.currency === "string" ? input.currency.slice(0, 4) : preset.currency,
    heroImage: typeof input?.heroImage === "string" ? input.heroImage : "",
    tagline: typeof input?.tagline === "string" ? input.tagline.slice(0, 240) : "",
    layout: layouts.has(String(input?.layout)) ? input!.layout! : preset.layout,
    headerStyle: headers.has(String(input?.headerStyle)) ? input!.headerStyle! : preset.headerStyle,
    cardStyle: cards.has(String(input?.cardStyle)) ? input!.cardStyle! : preset.cardStyle,
    fontFamily: fonts.has(String(input?.fontFamily)) ? input!.fontFamily! : preset.fontFamily,
    borderRadius: radii.has(String(input?.borderRadius)) ? input!.borderRadius! : preset.borderRadius,
    categoryStyle: categories.has(String(input?.categoryStyle)) ? input!.categoryStyle! : preset.categoryStyle,
    colors: {
      background: color(input?.colors?.background, preset.colors.background),
      surface: color(input?.colors?.surface, preset.colors.surface),
      text: color(input?.colors?.text, preset.colors.text),
      muted: color(input?.colors?.muted, preset.colors.muted),
      accent: color(input?.colors?.accent, preset.colors.accent),
    },
    showImages: typeof input?.showImages === "boolean" ? input.showImages : preset.showImages,
    showDescriptions: typeof input?.showDescriptions === "boolean" ? input.showDescriptions : preset.showDescriptions,
    showContactInfo: typeof input?.showContactInfo === "boolean" ? input.showContactInfo : preset.showContactInfo,
  };
}

export function applyMenuPreset(current: MenuSettings, template: MenuTemplateId): MenuSettings {
  return { ...menuDesignPresets[template], currency: current.currency, heroImage: current.heroImage, tagline: current.tagline };
}
