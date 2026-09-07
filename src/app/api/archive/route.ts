import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { archiveImage } from "@/lib/google/drive";

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  if (!token?.googleSub || !token?.accessToken || !token?.businessId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { imageUrl, category } = await req.json();

  if (!imageUrl || !category) {
    return NextResponse.json({ error: "imageUrl and category required" }, { status: 400 });
  }

  const validCategories = ["products", "rewards", "profile", "menu", "customers"];
  if (!validCategories.includes(category)) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }

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
