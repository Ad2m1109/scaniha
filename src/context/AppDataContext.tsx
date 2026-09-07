"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Toaster, toast } from "sonner";

import { seedState } from "@/lib/data/seed";
import { loadAppState, saveAppState } from "@/lib/storage";
import { generateId, customerTier } from "@/lib/utils";
import type {
  AppState,
  BusinessProfile,
  Category,
  Customer,
  LoyaltyConfig,
  MenuSettings,
  Product,
  Reward,
} from "@/types";

type NewCustomer = Pick<Customer, "name" | "email" | "phone" | "image">;
type Result = { ok: boolean; message: string };

interface AppDataContextValue extends AppState {
  ready: boolean;
  addCategory: (input: Omit<Category, "id" | "sortOrder">) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  saveProduct: (product: Omit<Product, "id" | "sortOrder"> & { id?: string }) => void;
  deleteProduct: (id: string) => void;
  moveProduct: (id: string, direction: -1 | 1) => void;
  addCustomer: (input: NewCustomer) => Customer;
  updateCustomer: (customer: Customer) => void;
  deleteCustomer: (id: string) => void;
  saveReward: (reward: Omit<Reward, "id" | "redemptions"> & { id?: string }) => void;
  deleteReward: (id: string) => void;
  updateBusiness: (profile: BusinessProfile) => void;
  updateLoyalty: (config: LoyaltyConfig) => void;
  updateMenuSettings: (settings: MenuSettings) => void;
  recordVisit: (customerId: string) => Result;
  redeemReward: (customerId: string, rewardId: string) => Result;
  trackMenuView: (source?: "menu" | "qr") => void;
}

const AppDataContext = createContext<AppDataContextValue | null>(null);

function archiveImageLocal(imageUrl: string, businessId: string, category: string) {
  fetch("/api/archive", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ imageUrl, category }),
  }).catch(() => {});
}

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(seedState);
  const [ready, setReady] = useState(false);

  // ── Load from remote on mount ──────────────────────────────────────────────
  useEffect(() => {
    async function init() {
      // First, try loading from legacy localStorage (fast initial render)
      const localState = loadAppState();
      try {
        const res = await fetch("/api/data");
        if (res.ok) {
          const remoteData = await res.json();
          const serverBusinessId: string | undefined = remoteData.businessId;
          if (!remoteData.notFound && serverBusinessId) {
            // Check if localStorage has stale data from a different business
            const namespacedKey = `scaniha.${serverBusinessId}`;
            const namespaced = window.localStorage.getItem(namespacedKey);
            const cache = namespaced
              ? JSON.parse(namespaced) as Partial<AppState>
              : null;

            // Use namespaced cache if available, otherwise use legacy + server data
            const base = cache ?? localState;
            setState({
              ...base,
              business: {
                ...base.business,
                ...remoteData.business,
                id: serverBusinessId,
              },
              menuSettings: { ...base.menuSettings, ...remoteData.settings },
              categories: remoteData.categories ?? base.categories,
              products: remoteData.products ?? base.products,
              customers: remoteData.customers ?? base.customers,
              rewards: remoteData.rewards ?? base.rewards,
              loyalty: remoteData.loyalty ?? base.loyalty,
              visits: remoteData.visits ?? base.visits,
              redemptions: remoteData.redemptions ?? base.redemptions,
              menuViews: remoteData.menuViews ?? base.menuViews,
            });
            setReady(true);
            return;
          }
          if (serverBusinessId) {
            setState({
              ...localState,
              business: { ...localState.business, id: serverBusinessId },
            });
            setReady(true);
            return;
          }
        }
      } catch (e) {
        console.error("Failed to load remote data", e);
      }
      setState(localState);
      setReady(true);
    }
    init();
  }, []);

  // ── Auto-save to localStorage + remote ─────────────────────────────────────
  useEffect(() => {
    if (!ready) return;
    saveAppState(state, state.business.id);

    const timer = setTimeout(() => {
      fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business: state.business,
          menuSettings: state.menuSettings,
          categories: state.categories,
          products: state.products,
          customers: state.customers,
          rewards: state.rewards,
          loyalty: state.loyalty,
          visits: state.visits,
          redemptions: state.redemptions,
          menuViews: state.menuViews,
        }),
      })
        .then((res) => {
          if (!res.ok) toast.error("Failed to sync changes");
        })
        .catch((e) => {
          console.error("Failed to save remote data", e);
          toast.error("Network error while syncing");
        });
    }, 1500);

    return () => clearTimeout(timer);
  }, [
    ready,
    state.business,
    state.menuSettings,
    state.categories,
    state.products,
    state.customers,
    state.rewards,
    state.loyalty,
    state.visits,
    state.redemptions,
    state.menuViews,
  ]);

  // ── Category CRUD ──────────────────────────────────────────────────────────
  const addCategory = useCallback((input: Omit<Category, "id" | "sortOrder">) => {
    setState((current) => ({
      ...current,
      categories: [...current.categories, { ...input, id: generateId("category"), sortOrder: current.categories.length + 1 }],
    }));
    toast.success("Category created");
  }, []);

  const updateCategory = useCallback((category: Category) => {
    setState((current) => ({ ...current, categories: current.categories.map((item) => item.id === category.id ? category : item) }));
    toast.success("Category updated");
  }, []);

  const deleteCategory = useCallback((categoryId: string) => {
    setState((current) => {
      // Archive images of all products in this category
      const affected = current.products.filter((p) => p.categoryId === categoryId && p.image);
      if (affected.length && current.business.id) {
        for (const p of affected) {
          archiveImageLocal(p.image, current.business.id, "products");
        }
      }
      return {
        ...current,
        categories: current.categories.filter((item) => item.id !== categoryId),
        products: current.products.filter((item) => item.categoryId !== categoryId),
      };
    });
    toast.success("Category removed");
  }, []);

  // ── Product CRUD ───────────────────────────────────────────────────────────
  const saveProduct = useCallback((product: Omit<Product, "id" | "sortOrder"> & { id?: string }) => {
    setState((current) => {
      if (product.id) {
        return { ...current, products: current.products.map((item) => item.id === product.id ? { ...item, ...product, id: item.id } : item) };
      }
      const sortOrder = current.products.filter((item) => item.categoryId === product.categoryId).length + 1;
      return { ...current, products: [...current.products, { ...product, id: generateId("product"), sortOrder }] };
    });
    toast.success(product.id ? "Product updated" : "Product created");
  }, []);

  const deleteProduct = useCallback((productId: string) => {
    setState((current) => {
      const product = current.products.find((p) => p.id === productId);
      if (product?.image && current.business.id) {
        archiveImageLocal(product.image, current.business.id, "products");
      }
      return { ...current, products: current.products.filter((item) => item.id !== productId) };
    });
    toast.success("Product removed");
  }, []);

  const moveProduct = useCallback((productId: string, direction: -1 | 1) => {
    setState((current) => {
      const ordered = [...current.products].sort((a, b) => a.sortOrder - b.sortOrder);
      const index = ordered.findIndex((item) => item.id === productId);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= ordered.length || ordered[index].categoryId !== ordered[target].categoryId) return current;
      [ordered[index], ordered[target]] = [ordered[target], ordered[index]];
      // Only renumber products within the same category
      const categoryId = ordered[index].categoryId;
      let categoryCounter = 1;
      return {
        ...current,
        products: ordered.map((item) => {
          if (item.categoryId === categoryId) {
            return { ...item, sortOrder: categoryCounter++ };
          }
          return item;
        }),
      };
    });
  }, []);

  // ── Customer CRUD ──────────────────────────────────────────────────────────
  const addCustomer = useCallback((input: NewCustomer) => {
    const customer: Customer = {
      ...input,
      id: generateId("customer"),
      image: input.image ?? "",
      points: state.loyalty.enabled ? state.loyalty.welcomeBonus : 0,
      visits: 0,
      tier: "Bronze",
      lastVisit: "Never",
      joinedAt: new Date().toISOString().slice(0, 10),
      qrCode: `PK-${Math.random().toString(36).slice(2, 10).toUpperCase()}`,
    };
    setState((current) => ({ ...current, customers: [customer, ...current.customers] }));
    toast.success("Customer created");
    return customer;
  }, [state.loyalty]);

  const updateCustomer = useCallback((customer: Customer) => {
    setState((current) => ({ ...current, customers: current.customers.map((item) => item.id === customer.id ? customer : item) }));
    toast.success("Customer updated");
  }, []);

  const deleteCustomer = useCallback((customerId: string) => {
    // Archive the customer's profile image on Drive before removing
    const customer = state.customers.find((c) => c.id === customerId);
    if (customer?.image && state.business.id) {
      fetch(`/api/customers?id=${customerId}`, { method: "DELETE" }).catch(() => {});
    }
    setState((current) => ({
      ...current,
      customers: current.customers.filter((item) => item.id !== customerId),
      visits: current.visits.filter((item) => item.customerId !== customerId),
      redemptions: current.redemptions.filter((item) => item.customerId !== customerId),
    }));
    toast.success("Customer removed");
  }, [state.customers, state.business.id]);

  // ── Reward CRUD ────────────────────────────────────────────────────────────
  const saveReward = useCallback((reward: Omit<Reward, "id" | "redemptions"> & { id?: string }) => {
    setState((current) => reward.id
      ? { ...current, rewards: current.rewards.map((item) => item.id === reward.id ? { ...item, ...reward, id: item.id } : item) }
      : { ...current, rewards: [...current.rewards, { ...reward, id: generateId("reward"), redemptions: 0 }] });
    toast.success(reward.id ? "Reward updated" : "Reward created");
  }, []);

  const deleteReward = useCallback((rewardId: string) => {
    setState((current) => {
      const reward = current.rewards.find((r) => r.id === rewardId);
      if (reward?.image && current.business.id) {
        archiveImageLocal(reward.image, current.business.id, "rewards");
      }
      return { ...current, rewards: current.rewards.filter((item) => item.id !== rewardId) };
    });
    toast.success("Reward removed");
  }, []);

  // ── Business / Loyalty / Settings ──────────────────────────────────────────
  const updateBusiness = useCallback((business: BusinessProfile) => {
    setState((current) => {
      // Archive old logo if it changed
      if (current.business.logo && current.business.logo !== business.logo && business.id) {
        archiveImageLocal(current.business.logo, business.id, "profile");
      }
      return { ...current, business };
    });
    toast.success("Business profile saved");
  }, []);

  const updateLoyalty = useCallback((loyalty: LoyaltyConfig) => {
    setState((current) => ({ ...current, loyalty }));
    toast.success("Loyalty settings saved");
  }, []);

  const updateMenuSettings = useCallback((menuSettings: MenuSettings) => {
    setState((current) => ({ ...current, menuSettings }));
    toast.success("Menu design saved");
  }, []);

  // ── Activity recording ─────────────────────────────────────────────────────
  const recordVisit = useCallback((customerId: string): Result => {
    // Validation reads from state (acceptable — stale read just means "not found")
    if (!state.loyalty.enabled) { toast.error("Loyalty is currently disabled"); return { ok: false, message: "Loyalty is currently disabled" }; }
    const points = state.loyalty.pointsPerVisit;

    let result: Result = { ok: false, message: "Customer not found" };
    setState((current) => {
      const customer = current.customers.find((item) => item.id === customerId);
      if (!customer) { toast.error("Customer not found"); return current; }
      const nextPoints = customer.points + points;
      result = { ok: true, message: `${points} points added` };
      return {
        ...current,
        customers: current.customers.map((item) => item.id === customerId ? {
          ...item,
          points: nextPoints,
          visits: item.visits + 1,
          tier: customerTier(nextPoints),
          lastVisit: new Date().toLocaleString(),
        } : item),
        visits: [{ id: generateId("visit"), customerId, pointsEarned: points, createdAt: new Date().toISOString() }, ...current.visits],
      };
    });
    if (result.ok) toast.success(`Visit recorded · +${points} points`);
    return result;
  }, [state.loyalty]);

  const redeemReward = useCallback((customerId: string, rewardId: string): Result => {
    // Validation reads from state
    const customer = state.customers.find((item) => item.id === customerId);
    const reward = state.rewards.find((item) => item.id === rewardId);
    if (!customer || !reward) { toast.error("Customer or reward not found"); return { ok: false, message: "Customer or reward not found" }; }
    if (reward.status !== "active") { toast.error("This reward is paused"); return { ok: false, message: "This reward is paused" }; }
    if (customer.points < reward.pointsRequired) { const message = `Needs ${reward.pointsRequired - customer.points} more points`; toast.error(message); return { ok: false, message }; }
    const pointsRequired = reward.pointsRequired;

    let result: Result = { ok: false, message: "Redemption failed" };
    setState((current) => {
      const c = current.customers.find((item) => item.id === customerId);
      if (!c) { return current; }
      const nextPoints = c.points - pointsRequired;
      result = { ok: true, message: `${pointsRequired} points redeemed` };
      return {
        ...current,
        customers: current.customers.map((item) => item.id === customerId ? { ...item, points: nextPoints, tier: customerTier(nextPoints) } : item),
        rewards: current.rewards.map((item) => item.id === rewardId ? { ...item, redemptions: item.redemptions + 1 } : item),
        redemptions: [{ id: generateId("redemption"), customerId, rewardId, pointsSpent: pointsRequired, createdAt: new Date().toISOString() }, ...current.redemptions],
      };
    });
    if (result.ok) toast.success(`${reward.name} redeemed`);
    return result;
  }, [state.customers, state.rewards]);

  const trackMenuView = useCallback((source: "menu" | "qr" = "menu") => {
    setState((current) => ({
      ...current,
      menuViews: [{ id: generateId("view"), source, createdAt: new Date().toISOString() }, ...current.menuViews],
    }));
  }, []);

  const value = useMemo<AppDataContextValue>(() => ({
    ...state,
    ready,
    addCategory, updateCategory, deleteCategory, saveProduct, deleteProduct, moveProduct,
    addCustomer, updateCustomer, deleteCustomer, saveReward, deleteReward,
    updateBusiness, updateLoyalty, updateMenuSettings, recordVisit, redeemReward, trackMenuView,
  }), [state, ready, addCategory, updateCategory, deleteCategory, saveProduct, deleteProduct, moveProduct, addCustomer, updateCustomer, deleteCustomer, saveReward, deleteReward, updateBusiness, updateLoyalty, updateMenuSettings, recordVisit, redeemReward, trackMenuView]);

  return (
    <AppDataContext.Provider value={value}>
      {children}
      <Toaster richColors position="bottom-right" />
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) throw new Error("useAppData must be used inside AppDataProvider");
  return context;
}
