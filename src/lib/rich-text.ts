const allowedTags = new Set([
  "p",
  "br",
  "strong",
  "b",
  "em",
  "i",
  "u",
  "h2",
  "h3",
  "ul",
  "ol",
  "li",
  "a",
  "div",
  "span",
]);

export function isRichTextHtml(value: string) {
  return /<\/?[a-z][\s\S]*>/i.test(value);
}

export function sanitizeRichText(value = "") {
  if (!value) return "";

  return value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "")
    .replace(/\s(href|src)=["']javascript:[^"']*["']/gi, "")
    .replace(/<\/?([a-z][a-z0-9]*)\b([^>]*)>/gi, (tag, tagName, attrs) => {
      const normalizedTag = String(tagName).toLowerCase();

      if (!allowedTags.has(normalizedTag)) {
        return "";
      }

      if (normalizedTag !== "a") {
        if (tag.startsWith("</")) {
          return `</${normalizedTag}>`;
        }

        const alignMatch = String(attrs).match(/\b(?:text-align:\s*|align=["']?)(left|center|right)/i);
        const align = alignMatch?.[1]?.toLowerCase();
        const alignAttr = align && ["left", "center", "right"].includes(align) ? ` style="text-align:${align}"` : "";

        return `<${normalizedTag}${alignAttr}>`;
      }

      const hrefMatch = String(attrs).match(/\shref=["']([^"']+)["']/i);
      const href = hrefMatch?.[1] || "";
      const safeHref = /^(https?:\/\/|mailto:|\/|#)/i.test(href) ? href : "#";

      return tag.startsWith("</")
        ? "</a>"
        : `<a href="${safeHref}" target="_blank" rel="noopener noreferrer">`;
    });
}

export function richTextToPlainText(value = "") {
  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|h2|h3|li)>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
