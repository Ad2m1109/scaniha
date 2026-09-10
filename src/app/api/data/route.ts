import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { dataPostSchema } from "@/lib/validations";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";
import { loadBusinessData, saveBusinessData } from "@/lib/services/data-service";
import { normalizeMenuSettings } from "@/lib/menu-settings";

// ─── GET /api/data ────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const rl = rateLimit(req, { windowMs: 60_000, maxRequests: 60, keyPrefix: "data:get" });
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token?.googleSub || !token?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sub = token.googleSub as string;
  const businessId = token.businessId as string;

  const data = await loadBusinessData(sub, token.accessToken as string, businessId);
  if (data) {
    return NextResponse.json(data);
  }

  return NextResponse.json({ notFound: true, businessId });
}

// ─── POST /api/data ───────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const rl = rateLimit(req, { windowMs: 60_000, maxRequests: 20, keyPrefix: "data:post" });
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token?.googleSub || !token?.accessToken || !token?.businessId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = dataPostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const {
    business,
    menuSettings: rawMenuSettings,
    categories,
    products,
    customers,
    rewards,
    loyalty,
    visits,
    redemptions,
    menuViews,
  } = parsed.data;
  const menuSettings = normalizeMenuSettings(rawMenuSettings);

  const result = await saveBusinessData(
    token.googleSub as string,
    token.accessToken as string,
    token.businessId as string,
    {
      business,
      menuSettings,
      categories,
      products,
      customers,
      rewards,
      loyalty,
      visits,
      redemptions,
      menuViews,
    }
  );

  if (!result.success) {
    return NextResponse.json({ error: result.error || "Failed to save data" }, { status: 500 });
  }

  return NextResponse.json({ success: true, businessId: result.businessId });
}
