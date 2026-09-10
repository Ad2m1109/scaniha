import { NextRequest, NextResponse } from "next/server";
import { readSnapshot } from "@/lib/server/snapshots";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";

// ─── GET /api/public/menu/[businessId] ───────────────────────────────────────
// Unauthenticated endpoint. Reads the pre-generated snapshot from disk.
// No Google credentials are used here.
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const rl = rateLimit(req, { windowMs: 60_000, maxRequests: 60, keyPrefix: "public:menu" });
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  const { businessId } = await params;

  if (!businessId) {
    return NextResponse.json({ error: "Missing businessId" }, { status: 400 });
  }

  const snapshot = await readSnapshot(businessId);

  if (!snapshot) {
    return NextResponse.json({ error: "Menu not found" }, { status: 404 });
  }

  return NextResponse.json(snapshot, {
    headers: {
      // Allow public caching for 30s — balances freshness vs. load
      "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
    },
  });
}
