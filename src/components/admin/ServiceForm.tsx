"use client";

import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { AdminButton, AdminCard, AdminImagePreview, AdminToast, Field, inputClass, StatusMessage } from "@/components/admin/AdminUi";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { cardData } from "@/data/data";
import { getActionErrorMessage, withAdminTimeout } from "@/lib/admin-action";
import { ServiceDoc } from "@/lib/content-types";
import { db } from "@/lib/firebase";
import { createSlug } from "@/lib/slug";
import { uploadAdminFile } from "@/lib/upload-client";
import { sanitizeRichText } from "@/lib/rich-text";

const emptyService: ServiceDoc = {
  title: "",
  slug: "",
  shortDescription: "",
  fullDescription: "",
  imageUrl: "",
  icon: "Palette",
  order: 0,
  status: "draft",
};

const iconOptions: NonNullable<ServiceDoc["icon"]>[] = ["Palette", "Share2", "PenTool", "Printer", "Monitor", "FileText"];

export default function ServiceForm({ mode }: { mode: "new" | "edit" }) {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [service, setService] = useState<ServiceDoc>(emptyService);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"info" | "error" | "success">("info");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const documentId = params?.id;
  const isEdit = mode === "edit" && Boolean(documentId);
  const canSave = useMemo(() => service.title.trim() && service.slug.trim(), [service.slug, service.title]);

  useEffect(() => {
    if (!isEdit || !documentId) return;

    const loadService = async () => {
      try {
        const snapshot = await getDoc(doc(db, "services", documentId));

        if (snapshot.exists()) {
          setService({ id: snapshot.id, ...snapshot.data() } as ServiceDoc);
        }
      } catch (error) {
        console.error("Service load failed:", error);
        setMessage(error instanceof Error ? error.message : "Service failed to load.");
        setMessageType("error");
      }
    };

    loadService();
  }, [documentId, isEdit]);

  const updateService = <K extends keyof ServiceDoc>(key: K, value: ServiceDoc[K]) => {
    setService((current) => ({ ...current, [key]: value }));
  };

  const onTitleChange = (title: string) => {
    setService((current) => ({
      ...current,
      title,
      slug: current.slug ? current.slug : createSlug(title),
    }));
  };

  const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setMessage("Uploading service image...");
      setMessageType("info");
      const url = await uploadAdminFile(file, "services");
      updateService("imageUrl", url);
      setMessage("Service image uploaded. Preview is shown below.");
      setMessageType("success");
    } catch (error) {
      console.error("Service image upload failed:", error);
      setMessage(error instanceof Error ? error.message : "Service image upload failed.");
      setMessageType("error");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSave) {
      setMessage("Title and slug are required.");
      setMessageType("error");
      return;
    }

    try {
      setSaving(true);
      setMessage("");
      const payload = {
        ...service,
        fullDescription: sanitizeRichText(service.fullDescription || ""),
        order: Number(service.order) || 0,
        updatedAt: serverTimestamp(),
      };

      if (isEdit && documentId) {
        await withAdminTimeout(updateDoc(doc(db, "services", documentId), payload), "Service update");
      } else {
        await withAdminTimeout(
          addDoc(collection(db, "services"), {
            ...payload,
            createdAt: serverTimestamp(),
          }),
          "Service save",
        );
      }

      setMessage("Service saved successfully.");
      setMessageType("success");
      window.setTimeout(() => router.push("/admin/services"), 700);
    } catch (error) {
      console.error("Service save failed:", error);
      setMessage(getActionErrorMessage(error, "Service save failed."));
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  };

  const fillDefault = (title: string) => {
    const selected = cardData.find((item) => item.title === title);
    if (!selected) return;

    setService((current) => ({
      ...current,
      title: selected.title,
      slug: createSlug(selected.title),
      shortDescription: selected.desc,
      imageUrl: current.imageUrl || selected.imageSrc,
      icon: selected.icon,
    }));
  };

  return (
    <form onSubmit={save} className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <AdminToast message={message} type={messageType} />
      <AdminCard className="flex flex-col gap-5">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FD853A]">Services</p>
          <h2 className="mt-2 text-3xl font-semibold">{isEdit ? "Edit Service" : "Add Service"}</h2>
        </div>

        <StatusMessage message={message} type={messageType} />

        <Field label="Use Default Service">
          <select className={inputClass} defaultValue="" onChange={(event) => fillDefault(event.target.value)}>
            <option value="">Select default content</option>
            {cardData.map((item) => (
              <option key={item.title} value={item.title}>{item.title}</option>
            ))}
          </select>
        </Field>

        <Field label="Title">
          <input className={inputClass} value={service.title} onChange={(event) => onTitleChange(event.target.value)} required />
        </Field>

        <Field label="Slug">
          <input className={inputClass} value={service.slug} onChange={(event) => updateService("slug", createSlug(event.target.value))} required />
        </Field>

        <Field label="Short Description">
          <textarea className={inputClass} rows={3} value={service.shortDescription} onChange={(event) => updateService("shortDescription", event.target.value)} required />
        </Field>

        <Field label="Full Description">
          <RichTextEditor value={service.fullDescription || ""} onChange={(value) => updateService("fullDescription", value)} minHeight={220} />
        </Field>
      </AdminCard>

      <div className="flex flex-col gap-6">
        <AdminCard className="flex flex-col gap-5">
          <Field label="Image URL">
            <input className={inputClass} value={service.imageUrl} onChange={(event) => updateService("imageUrl", event.target.value)} />
          </Field>
          <input type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" onChange={uploadImage} disabled={uploading || saving} />
          {uploading && <p className="text-sm font-semibold text-[#FD853A]">Uploading service image...</p>}
          {service.imageUrl && <AdminImagePreview src={service.imageUrl} alt="Service preview" />}
        </AdminCard>

        <AdminCard className="flex flex-col gap-5">
          <Field label="Icon">
            <select className={inputClass} value={service.icon || "Palette"} onChange={(event) => updateService("icon", event.target.value as ServiceDoc["icon"])}>
              {iconOptions.map((icon) => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>
          </Field>
          <Field label="Display Order">
            <input type="number" className={inputClass} value={service.order} onChange={(event) => updateService("order", Number(event.target.value))} />
          </Field>
          <Field label="Status">
            <select className={inputClass} value={service.status} onChange={(event) => updateService("status", event.target.value as "published" | "draft")}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </Field>
          <AdminButton type="submit" disabled={saving || uploading || !canSave}>
            {saving ? "Saving..." : uploading ? "Uploading..." : "Save Service"}
          </AdminButton>
        </AdminCard>
      </div>
    </form>
  );
}
