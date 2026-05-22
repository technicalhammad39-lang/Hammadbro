import { isRichTextHtml, sanitizeRichText } from "@/lib/rich-text";

export default function RichTextContent({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  if (isRichTextHtml(value)) {
    return (
      <div
        className={`rich-text-content ${className}`}
        dangerouslySetInnerHTML={{ __html: sanitizeRichText(value) }}
      />
    );
  }

  return <p className={className}>{value}</p>;
}
