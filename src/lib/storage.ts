import { seedState } from "@/lib/data/seed";
import type { AppState } from "@/types";

const LEGACY_KEY = "perkly.mvp.v1";

function storageKey(businessId?: string): string {
  return businessId ? `scaniha.${businessId}` : LEGACY_KEY;
}

/**
 * Load app state from localStorage.
 * If businessId is provided, reads from a namespaced key.
 * Otherwise falls back to the legacy key (for initial load before businessId is known).
 */
export function loadAppState(businessId?: string): AppState {
  if (typeof window === "undefined") return seedState;

  try {
    // Try namespaced key first, then legacy key
    const namespacedKey = businessId ? storageKey(businessId) : null;
    const stored = (namespacedKey && window.localStorage.getItem(namespacedKey))
      ?? window.localStorage.getItem(LEGACY_KEY);
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

/**
 * Save app state to localStorage under the businessId-namespaced key.
 * Also clears any stale data from the legacy key or a different businessId.
 */
export function saveAppState(state: AppState, businessId?: string) {
  if (typeof window === "undefined") return;

  const key = storageKey(businessId || state.business.id);
  window.localStorage.setItem(key, JSON.stringify(state));

  // Clean up legacy key if we're now using namespaced keys
  if (businessId || state.business.id) {
    window.localStorage.removeItem(LEGACY_KEY);
  }
}

/**
 * Clear localStorage for a specific business (used on logout).
 */
export function clearAppState(businessId?: string) {
  if (typeof window === "undefined") return;
  if (businessId) {
    window.localStorage.removeItem(storageKey(businessId));
  }
  window.localStorage.removeItem(LEGACY_KEY);
}
