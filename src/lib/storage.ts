import { seedState } from "@/lib/data/seed";
import type { AppState } from "@/types";

const STORAGE_KEY = "perkly.mvp.v1";

export function loadAppState(): AppState {
  if (typeof window === "undefined") return seedState;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return seedState;
    const parsed = JSON.parse(stored) as Partial<AppState>;
    return {
      ...seedState,
      ...parsed,
      business: { ...seedState.business, ...parsed.business, menuPdfUrl: parsed.business?.menuPdfUrl ?? seedState.business.menuPdfUrl },
      loyalty: { ...seedState.loyalty, ...parsed.loyalty },
      menuSettings: { ...seedState.menuSettings, ...parsed.menuSettings },
      categories: parsed.categories ?? seedState.categories,
      products: parsed.products ?? seedState.products,
      customers: parsed.customers ?? seedState.customers,
      rewards: parsed.rewards ?? seedState.rewards,
      visits: parsed.visits ?? seedState.visits,
      redemptions: parsed.redemptions ?? seedState.redemptions,
      menuViews: parsed.menuViews ?? seedState.menuViews,
    };
  } catch {
    return seedState;
  }
}

export function saveAppState(state: AppState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
