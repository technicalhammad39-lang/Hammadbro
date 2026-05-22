"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import { normalizeImageUrl } from "@/lib/image-url";

export function AdminCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[28px] border border-[#E4E7EC] bg-white p-5 shadow-sm sm:p-6 ${className}`}>
      {children}
    </div>
  );
}

export function AdminButton({
  children,
  className = "",
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "dark" | "light" | "danger" }) {
  const styles = {
    primary: "bg-[#FD853A] text-white hover:bg-[#e46e24]",
    dark: "bg-[#171717] text-white hover:bg-[#2a2a2a]",
    light: "bg-[#F2F4F7] text-[#171717] hover:bg-[#E4E7EC]",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      {...props}
      className={`rounded-full px-5 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2 text-sm font-semibold text-[#344054]">
      {label}
      {children}
    </label>
  );
}

export const inputClass =
  "w-full rounded-[16px] border border-[#E4E7EC] bg-white px-4 py-3 text-base text-[#171717] outline-none transition-colors focus:border-[#FD853A]";

export function StatusMessage({ message, type = "info" }: { message: string; type?: "info" | "error" | "success" }) {
  if (!message) return null;

  const styles = {
    info: "border-[#E4E7EC] bg-[#F9FAFB] text-[#344054]",
    error: "border-red-200 bg-red-50 text-red-700",
    success: "border-green-200 bg-green-50 text-green-700",
  };

  return <p className={`rounded-[16px] border px-4 py-3 text-sm font-semibold ${styles[type]}`}>{message}</p>;
}

export function AdminToast({
  message,
  type = "info",
}: {
  message: string;
  type?: "info" | "error" | "success";
}) {
  if (!message) return null;

  const styles = {
    info: "border-[#E4E7EC] bg-white text-[#344054]",
    error: "border-red-200 bg-red-50 text-red-700",
    success: "border-green-200 bg-green-50 text-green-700",
  };

  return (
    <div className={`fixed right-5 top-24 z-[80] max-w-sm rounded-[18px] border px-4 py-3 text-sm font-semibold shadow-xl ${styles[type]}`}>
      {message}
    </div>
  );
}

export function AdminSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <AdminCard className="flex flex-col gap-3">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="h-4 animate-pulse rounded-full bg-[#E4E7EC]" />
      ))}
    </AdminCard>
  );
}

export function ConfirmDialog({
  open,
  title,
  description,
  loading,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  description: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/55 px-5 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[28px] border border-white/15 bg-white p-6 shadow-2xl">
        <h3 className="text-2xl font-semibold text-[#171717]">{title}</h3>
        <p className="mt-3 text-[#667085]">{description}</p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <AdminButton type="button" variant="light" onClick={onCancel} disabled={loading}>
            Cancel
          </AdminButton>
          <AdminButton type="button" variant="danger" onClick={onConfirm} disabled={loading}>
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                Deleting...
              </span>
            ) : (
              "Delete"
            )}
          </AdminButton>
        </div>
      </div>
    </div>
  );
}

export function AdminImagePreview({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const imageUrl = normalizeImageUrl(src);

  if (!imageUrl) return null;

  return (
    <div className="rounded-[20px] border border-[#E4E7EC] bg-[#F9FAFB] p-2">
      {!failed ? (
        <img
          src={imageUrl}
          alt={alt}
          className={`h-auto w-full rounded-[16px] object-contain ${className}`}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="rounded-[16px] border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
          Image uploaded, but this public URL is not loading yet. Check `NEXT_PUBLIC_UPLOAD_BASE_URL` and Hostinger public path.
          <a href={imageUrl} target="_blank" rel="noopener noreferrer" className="mt-2 block break-all text-[#FD853A] underline">
            {imageUrl}
          </a>
        </div>
      )}
    </div>
  );
}
