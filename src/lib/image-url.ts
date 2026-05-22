export function normalizeImageUrl(value?: string) {
  const url = (value || "").trim();

  if (!url) return "";
  if (/^(https?:|data:|blob:)/i.test(url)) return url;
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("/")) return url;

  return `https://${url.replace(/^\/+/, "")}`;
}

export function normalizeUploadBaseUrl(value: string) {
  return normalizeImageUrl(value).replace(/\/+$/, "");
}
