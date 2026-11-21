import type { BusinessProfile } from "@/types";

export const business: BusinessProfile = {
  id: "",
  name: "",
  tagline: "",
  location: "",
  ownerName: "",
  memberCount: 0,
  activeMembers: 0,
  memberGoal: 2000,
  createdAt: new Date().toISOString().slice(0, 10),
  phone: "",
  address: "",
  description: "",
  logo: "",
  facebook: "",
  instagram: "",
  whatsapp: "",
  menuPdfUrl: "",
};
