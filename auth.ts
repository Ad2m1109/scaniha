import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getOwnerMapping, saveOwnerMapping } from "@/lib/server/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          // Request offline access so we get a refresh_token for Phase 2
          access_type: "offline",
          prompt: "consent",
          scope: [
            "openid",
            "email",
            "profile",
            "https://www.googleapis.com/auth/spreadsheets",
            "https://www.googleapis.com/auth/drive.file",
          ].join(" "),
        },
      },
    }),
  ],

  callbacks: {
    // Persist tokens and generate a stable businessId in the JWT
    async jwt({ token, account, profile }) {
      // First sign-in: account and profile are populated
      if (account && profile) {
        token.googleSub = profile.sub as string;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpiresAt = account.expires_at
          ? account.expires_at * 1000
          : Date.now() + 3600 * 1000;

        // Generate or retrieve a stable, opaque businessId.
        const sub = profile.sub as string;
        let mapping = getOwnerMapping(sub);
        if (!mapping) {
          mapping = {
            sub,
            businessId: crypto.randomUUID(),
          };
          saveOwnerMapping(mapping);
        }
        token.businessId = mapping.businessId;
      }

      // Refresh access_token if it has expired
      const isExpired =
        typeof token.accessTokenExpiresAt === "number" &&
        Date.now() > token.accessTokenExpiresAt;

      if (isExpired && token.refreshToken) {
        try {
          const response = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: process.env.AUTH_GOOGLE_ID!,
              client_secret: process.env.AUTH_GOOGLE_SECRET!,
              grant_type: "refresh_token",
              refresh_token: token.refreshToken as string,
            }),
          });
          const tokens = await response.json();
          if (tokens.access_token) {
            token.accessToken = tokens.access_token;
            token.accessTokenExpiresAt =
              Date.now() + (tokens.expires_in ?? 3600) * 1000;
          }
        } catch {
          // Token refresh failed — user will need to sign in again
          token.error = "RefreshTokenError";
        }
      }

      return token;
    },

    // Expose only safe fields to the client session
    async session({ session, token }) {
      session.user.businessId = token.businessId as string;
      // NOTE: accessToken and refreshToken are intentionally NOT passed to the
      // client session. They are only used in server-side API routes via
      // the JWT (retrieved with auth() on the server).
      if (token.error) {
        session.error = token.error as string;
      }
      return session;
    },

    // Redirect to dashboard after successful sign-in
    async redirect({ url, baseUrl }) {
      if (url === "/") return `${baseUrl}/dashboard`;
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/dashboard`;
    },
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
});
