import { auth } from "@/lib/firebase";
import { normalizeImageUrl } from "@/lib/image-url";

export type UploadFolder = "portfolio" | "blogs" | "services" | "profile" | "site-assets";

export async function uploadAdminFile(file: File, folder: UploadFolder) {
  const token = await auth.currentUser?.getIdToken();

  if (!token) {
    throw new Error("You must be logged in as admin to upload files.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 30000);

  const response = await fetch("/api/admin/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
    signal: controller.signal,
  }).finally(() => window.clearTimeout(timeoutId));

  const payload = await response.json().catch(() => ({
    ok: false,
    success: false,
    error: "Upload failed with an invalid server response.",
  }));

  if (!response.ok || (!payload.ok && !payload.success)) {
    throw new Error(payload.error || payload.message || "Image upload failed.");
  }

  if (typeof payload.url !== "string" || !payload.url.trim()) {
    throw new Error("Upload succeeded but no public image URL was returned.");
  }

  return normalizeImageUrl(payload.url);
}
