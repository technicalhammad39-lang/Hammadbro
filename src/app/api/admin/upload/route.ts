import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/firebase-admin";
import { normalizeUploadBaseUrl } from "@/lib/image-url";
import { createSlug } from "@/lib/slug";

export const runtime = "nodejs";

const allowedFolders = new Set(["portfolio", "blogs", "services", "profile", "site-assets"]);
const allowedMimeTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

function error(message: string, status = 400) {
  return NextResponse.json({ ok: false, success: false, error: message, message }, { status });
}

async function requireAdmin(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : "";

  if (!token) {
    return null;
  }

  return verifyAdminToken(token);
}

export async function POST(request: NextRequest) {
  try {
    const admin = await requireAdmin(request);

    if (!admin) {
      return error("Only the configured admin can upload files.", 403);
    }

    const uploadRoot = process.env.HOSTINGER_UPLOAD_ROOT || process.env.HOSTINGER_PUBLIC_UPLOAD_ROOT;
    const publicBaseUrl = process.env.NEXT_PUBLIC_UPLOAD_BASE_URL || process.env.HOSTINGER_UPLOAD_PUBLIC_BASE;

    if (!uploadRoot || !publicBaseUrl) {
      return error("Upload configuration missing", 500);
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const folder = String(formData.get("folder") || "");

    if (!(file instanceof File)) {
      return error("No file was uploaded.");
    }

    if (!allowedFolders.has(folder)) {
      return error("Invalid upload folder.");
    }

    const extension = allowedMimeTypes.get(file.type);

    if (!extension) {
      return error("Only JPG, JPEG, PNG, and WEBP images are allowed.");
    }

    const maxMb = Number(process.env.UPLOAD_MAX_MB || process.env.HOSTINGER_UPLOAD_MAX_MB || 10);
    const maxBytes = maxMb * 1024 * 1024;

    if (file.size > maxBytes) {
      return error(`File is too large. Maximum upload size is ${maxMb} MB.`);
    }

    const originalBase = path.parse(file.name).name;
    const safeBase = createSlug(originalBase).slice(0, 80) || "upload";
    const uniqueName = `${safeBase}-${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${extension}`;
    const targetDir = path.resolve(uploadRoot, folder);
    const targetPath = path.resolve(targetDir, uniqueName);
    const rootPath = path.resolve(uploadRoot);

    if (!targetPath.startsWith(rootPath + path.sep)) {
      return error("Invalid upload path.");
    }

    await mkdir(targetDir, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(targetPath, buffer);

    const url = `${normalizeUploadBaseUrl(publicBaseUrl)}/${folder}/${uniqueName}`;

    return NextResponse.json({
      ok: true,
      success: true,
      url,
      fileName: uniqueName,
      folder,
    });
  } catch (uploadError) {
    const message = uploadError instanceof Error ? uploadError.message : "Upload failed.";
    console.error("Admin upload failed:", uploadError);
    return error(message, 500);
  }
}
