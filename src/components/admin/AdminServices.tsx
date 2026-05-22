"use client";

import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminButton, AdminCard, AdminImagePreview, AdminSkeleton, AdminToast, ConfirmDialog, StatusMessage } from "@/components/admin/AdminUi";
import { cardData } from "@/data/data";
import { getActionErrorMessage, withAdminTimeout } from "@/lib/admin-action";
import { ServiceDoc } from "@/lib/content-types";
import { db } from "@/lib/firebase";
import { createSlug } from "@/lib/slug";

export default function AdminServices() {
  const [services, setServices] = useState<ServiceDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"info" | "error" | "success">("success");
  const [deleteTarget, setDeleteTarget] = useState<ServiceDoc | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      query(collection(db, "services"), orderBy("order", "asc")),
      (snapshot) => {
        setServices(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })) as ServiceDoc[]);
        setLoading(false);
      },
      (error) => {
        console.error("Services load failed:", error);
        setMessage(error.message || "Services failed to load.");
        setMessageType("error");
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  const seedDefaults = async () => {
    try {
      setSaving(true);
      setMessage("");
      for (const [index, item] of cardData.entries()) {
        await withAdminTimeout(
          addDoc(collection(db, "services"), {
            title: item.title,
            slug: createSlug(item.title),
            shortDescription: item.desc,
            fullDescription: "",
            imageUrl: item.imageSrc,
            icon: item.icon,
            order: index + 1,
            status: "published",
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          }),
          "Default service save",
        );
      }
      setMessage("Default services added.");
      setMessageType("success");
    } catch (error) {
      console.error("Default services seed failed:", error);
      setMessage(getActionErrorMessage(error, "Default services seed failed."));
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  };

  const removeService = async () => {
    if (!deleteTarget?.id) return;

    try {
      setDeleting(true);
      setMessage("");
      await withAdminTimeout(deleteDoc(doc(db, "services", deleteTarget.id)), "Service delete");
      setMessage("Service deleted.");
      setMessageType("success");
      setDeleteTarget(null);
    } catch (error) {
      console.error("Service delete failed:", error);
      setMessage(getActionErrorMessage(error, "Service delete failed."));
      setMessageType("error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FD853A]">Services</p>
          <h2 className="text-4xl font-semibold">Service Cards</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {services.length === 0 && (
            <AdminButton type="button" variant="dark" onClick={seedDefaults} disabled={saving}>
              {saving ? "Saving..." : "Add Default Services"}
            </AdminButton>
          )}
          <Link href="/admin/services/new" className="rounded-full bg-[#FD853A] px-5 py-3 text-sm font-semibold text-white hover:bg-[#e46e24]">
            Add Service
          </Link>
        </div>
      </div>

      <AdminToast message={message} type={messageType} />
      <StatusMessage message={message} type={messageType} />

      {loading && <AdminSkeleton rows={4} />}
      {!loading && services.length === 0 && <AdminCard>No services added yet.</AdminCard>}

      <div className="grid gap-5">
        {services.map((service) => (
          <AdminCard key={service.id} className="grid gap-5 lg:grid-cols-[160px_1fr_auto] lg:items-center">
            {service.imageUrl ? (
              <AdminImagePreview src={service.imageUrl} alt={service.title} />
            ) : (
              <div className="flex h-28 items-center justify-center rounded-[18px] bg-[#F2F4F7] text-sm text-[#667085]">No image</div>
            )}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FD853A]">{service.status}</p>
              <h3 className="mt-2 text-2xl font-semibold">{service.title}</h3>
              <p className="mt-2 text-[#667085]">{service.shortDescription}</p>
              <p className="mt-2 text-sm font-semibold text-[#344054]">Order: {service.order}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href={`/admin/services/edit/${service.id}`} className="rounded-full bg-[#171717] px-4 py-2 text-sm font-semibold text-white">
                Edit
              </Link>
              <AdminButton type="button" variant="danger" onClick={() => setDeleteTarget(service)}>
                Delete
              </AdminButton>
            </div>
          </AdminCard>
        ))}
      </div>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete service?"
        description={`This will permanently delete "${deleteTarget?.title || "this service"}".`}
        loading={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={removeService}
      />
    </div>
  );
}
