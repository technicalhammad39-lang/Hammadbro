import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/firebase-admin";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!token) {
    return NextResponse.json({ ok: false, message: "Missing auth token." }, { status: 401 });
  }

  try {
    const admin = await verifyAdminToken(token);

    if (!admin) {
      return NextResponse.json({ ok: false, message: "Access denied." }, { status: 403 });
    }

    return NextResponse.json({ ok: true, email: admin.email });
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid auth token." }, { status: 401 });
  }
}
