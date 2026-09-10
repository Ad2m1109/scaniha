import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { archiveImage } from "@/lib/google/drive";
import { archivePostSchema } from "@/lib/validations";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const rl = rateLimit(req, { windowMs: 60_000, maxRequests: 30, keyPrefix: "archive" });
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token?.googleSub || !token?.accessToken || !token?.businessId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = archivePostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { imageUrl, category } = parsed.data;

  try {
    await archiveImage(
      token.accessToken as string,
      imageUrl,
      token.businessId as string,
      category
    );
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("[archive] Error:", e);
    return NextResponse.json({ error: "Archive failed" }, { status: 500 });
  }
}
