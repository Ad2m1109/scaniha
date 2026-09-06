// next-auth v5 type augmentation
// Extends the built-in session/JWT types with our custom fields

import { DefaultSession, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      businessId: string;
      onboardingComplete: boolean;
    } & DefaultSession["user"];
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    googleSub?: string;
    businessId?: string;
    onboardingComplete?: boolean;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpiresAt?: number;
    error?: string;
  }
}
