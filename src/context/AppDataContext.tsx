"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Toaster, toast } from "sonner";

import { seedState } from "@/lib/data/seed";
import { loadAppState, saveAppState } from "@/lib/storage";
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

type NewCustomer = Pick<Customer, "name" | "email" | "phone">;
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

function id(prefix: string) {
  const suffix = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${prefix}-${suffix}`;
}

function customerTier(points: number): Customer["tier"] {
  if (points >= 1000) return "Gold";
  if (points >= 500) return "Silver";
  return "Bronze";
}

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(seedState);
  const [ready, setReady] = useState(false);

  // ── Load from remote on mount ──────────────────────────────────────────────
  useEffect(() => {
    async function init() {
      const localState = loadAppState();
      try {
        const res = await fetch("/api/data");
        if (res.ok) {
          const remoteData = await res.json();
          const serverBusinessId: string | undefined = remoteData.businessId;
          if (!remoteData.notFound) {
            setState({
              ...localState,
              business: {
                ...localState.business,
                ...remoteData.business,
                ...(serverBusinessId ? { id: serverBusinessId } : {}),
              },
              menuSettings: { ...localState.menuSettings, ...remoteData.settings },
              categories: remoteData.categories ?? localState.categories,
              products: remoteData.products ?? localState.products,
              customers: remoteData.customers ?? localState.customers,
              rewards: remoteData.rewards ?? localState.rewards,
              loyalty: remoteData.loyalty ?? localState.loyalty,
              visits: remoteData.visits ?? localState.visits,
              redemptions: remoteData.redemptions ?? localState.redemptions,
              menuViews: remoteData.menuViews ?? localState.menuViews,
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
    saveAppState(state);

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
      categories: [...current.categories, { ...input, id: id("category"), sortOrder: current.categories.length + 1 }],
    }));
    toast.success("Category created");
  }, []);

  const updateCategory = useCallback((category: Category) => {
    setState((current) => ({ ...current, categories: current.categories.map((item) => item.id === category.id ? category : item) }));
    toast.success("Category updated");
  }, []);

  const deleteCategory = useCallback((categoryId: string) => {
    setState((current) => ({
      ...current,
      categories: current.categories.filter((item) => item.id !== categoryId),
      products: current.products.filter((item) => item.categoryId !== categoryId),
    }));
    toast.success("Category removed");
  }, []);

  // ── Product CRUD ───────────────────────────────────────────────────────────
  const saveProduct = useCallback((product: Omit<Product, "id" | "sortOrder"> & { id?: string }) => {
    setState((current) => {
      if (product.id) {
        return { ...current, products: current.products.map((item) => item.id === product.id ? { ...item, ...product, id: item.id } : item) };
      }
      const sortOrder = current.products.filter((item) => item.categoryId === product.categoryId).length + 1;
      return { ...current, products: [...current.products, { ...product, id: id("product"), sortOrder }] };
    });
    toast.success(product.id ? "Product updated" : "Product created");
  }, []);

  const deleteProduct = useCallback((productId: string) => {
    setState((current) => ({ ...current, products: current.products.filter((item) => item.id !== productId) }));
    toast.success("Product removed");
  }, []);

  const moveProduct = useCallback((productId: string, direction: -1 | 1) => {
    setState((current) => {
      const ordered = [...current.products].sort((a, b) => a.sortOrder - b.sortOrder);
      const index = ordered.findIndex((item) => item.id === productId);
      const target = index + direction;
      if (index < 0 || target < 0 || target >= ordered.length || ordered[index].categoryId !== ordered[target].categoryId) return current;
      [ordered[index], ordered[target]] = [ordered[target], ordered[index]];
      return { ...current, products: ordered.map((item, itemIndex) => ({ ...item, sortOrder: itemIndex + 1 })) };
    });
  }, []);

  // ── Customer CRUD ──────────────────────────────────────────────────────────
  const addCustomer = useCallback((input: NewCustomer) => {
    const customer: Customer = {
      ...input,
      id: id("customer"),
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
    setState((current) => ({
      ...current,
      customers: current.customers.filter((item) => item.id !== customerId),
      visits: current.visits.filter((item) => item.customerId !== customerId),
      redemptions: current.redemptions.filter((item) => item.customerId !== customerId),
    }));
    toast.success("Customer removed");
  }, []);

  // ── Reward CRUD ────────────────────────────────────────────────────────────
  const saveReward = useCallback((reward: Omit<Reward, "id" | "redemptions"> & { id?: string }) => {
    setState((current) => reward.id
      ? { ...current, rewards: current.rewards.map((item) => item.id === reward.id ? { ...item, ...reward, id: item.id } : item) }
      : { ...current, rewards: [...current.rewards, { ...reward, id: id("reward"), redemptions: 0 }] });
    toast.success(reward.id ? "Reward updated" : "Reward created");
  }, []);

  const deleteReward = useCallback((rewardId: string) => {
    setState((current) => ({ ...current, rewards: current.rewards.filter((item) => item.id !== rewardId) }));
    toast.success("Reward removed");
  }, []);

  // ── Business / Loyalty / Settings ──────────────────────────────────────────
  const updateBusiness = useCallback((business: BusinessProfile) => {
    setState((current) => ({ ...current, business }));
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
    const customer = state.customers.find((item) => item.id === customerId);
    if (!customer) { toast.error("Customer not found"); return { ok: false, message: "Customer not found" }; }
    if (!state.loyalty.enabled) { toast.error("Loyalty is currently disabled"); return { ok: false, message: "Loyalty is currently disabled" }; }
    const points = state.loyalty.pointsPerVisit;
    const nextPoints = customer.points + points;
    setState((current) => ({
      ...current,
      customers: current.customers.map((item) => item.id === customerId ? {
        ...item,
        points: nextPoints,
        visits: item.visits + 1,
        tier: customerTier(nextPoints),
        lastVisit: new Date().toLocaleString(),
      } : item),
      visits: [{ id: id("visit"), customerId, pointsEarned: points, createdAt: new Date().toISOString() }, ...current.visits],
    }));
    toast.success(`Visit recorded · +${points} points`);
    return { ok: true, message: `${points} points added` };
  }, [state.customers, state.loyalty]);

  const redeemReward = useCallback((customerId: string, rewardId: string): Result => {
    const customer = state.customers.find((item) => item.id === customerId);
    const reward = state.rewards.find((item) => item.id === rewardId);
    if (!customer || !reward) { toast.error("Customer or reward not found"); return { ok: false, message: "Customer or reward not found" }; }
    if (reward.status !== "active") { toast.error("This reward is paused"); return { ok: false, message: "This reward is paused" }; }
    if (customer.points < reward.pointsRequired) { const message = `Needs ${reward.pointsRequired - customer.points} more points`; toast.error(message); return { ok: false, message }; }
    const nextPoints = customer.points - reward.pointsRequired;
    setState((current) => ({
      ...current,
      customers: current.customers.map((item) => item.id === customerId ? { ...item, points: nextPoints, tier: customerTier(nextPoints) } : item),
      rewards: current.rewards.map((item) => item.id === rewardId ? { ...item, redemptions: item.redemptions + 1 } : item),
      redemptions: [{ id: id("redemption"), customerId, rewardId, pointsSpent: reward.pointsRequired, createdAt: new Date().toISOString() }, ...current.redemptions],
    }));
    toast.success(`${reward.name} redeemed`);
    return { ok: true, message: `${reward.pointsRequired} points redeemed` };
  }, [state.customers, state.rewards]);

  const trackMenuView = useCallback((source: "menu" | "qr" = "menu") => {
    setState((current) => ({
      ...current,
      menuViews: [{ id: id("view"), source, createdAt: new Date().toISOString() }, ...current.menuViews],
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
