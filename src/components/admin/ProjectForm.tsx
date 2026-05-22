"use client";

import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { AdminButton, AdminCard, AdminImagePreview, AdminToast, Field, inputClass, StatusMessage } from "@/components/admin/AdminUi";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { portfolioCategories } from "@/data/data";
import { getActionErrorMessage, withAdminTimeout } from "@/lib/admin-action";
import { PortfolioProjectDoc } from "@/lib/content-types";
import { db } from "@/lib/firebase";
import { createSlug, parseList } from "@/lib/slug";
import { uploadAdminFile } from "@/lib/upload-client";
import { sanitizeRichText } from "@/lib/rich-text";

const emptyProject: PortfolioProjectDoc = {
  title: "",
  slug: "",
  category: "Brand Identity",
  shortDescription: "",
  fullDescription: "",
  servicesUsed: [],
  mainImageUrl: "",
  images: [],
  order: 0,
  featured: false,
  showOnHome: true,
  status: "draft",
};

export default function ProjectForm({ mode }: { mode: "new" | "edit" }) {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [project, setProject] = useState<PortfolioProjectDoc>(emptyProject);
  const [servicesText, setServicesText] = useState("");
  const [galleryText, setGalleryText] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"info" | "error" | "success">("info");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const documentId = params?.id;
  const isEdit = mode === "edit" && Boolean(documentId);

  useEffect(() => {
    if (!isEdit || !documentId) return;

    const loadProject = async () => {
      try {
        const snapshot = await getDoc(doc(db, "portfolioProjects", documentId));

        if (snapshot.exists()) {
          const data = { id: snapshot.id, ...snapshot.data() } as PortfolioProjectDoc;
          setProject(data);
          setServicesText(data.servicesUsed?.join("\n") || "");
          setGalleryText(data.images?.join("\n") || "");
        }
      } catch (error) {
        console.error("Project load failed:", error);
        setMessage(error instanceof Error ? error.message : "Project failed to load.");
        setMessageType("error");
      }
    };

    loadProject();
  }, [documentId, isEdit]);

  const canSave = useMemo(() => project.title.trim() && project.slug.trim(), [project.slug, project.title]);

  const updateProject = <K extends keyof PortfolioProjectDoc>(key: K, value: PortfolioProjectDoc[K]) => {
    setProject((current) => ({ ...current, [key]: value }));
  };

  const onTitleChange = (title: string) => {
    setProject((current) => ({
      ...current,
      title,
      slug: current.slug ? current.slug : createSlug(title),
    }));
  };

  const uploadImage = async (event: ChangeEvent<HTMLInputElement>, target: "main" | "gallery") => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage("Uploading image...");
    setMessageType("info");

    try {
      const url = await uploadAdminFile(file, "portfolio");

      if (target === "main") {
        updateProject("mainImageUrl", url);
      } else {
        const nextImages = [...(project.images || []), url];
        updateProject("images", nextImages);
        setGalleryText(nextImages.join("\n"));
      }

      setMessage("Image uploaded successfully. Preview is shown below.");
      setMessageType("success");
    } catch (uploadError) {
      console.error("Project image upload failed:", uploadError);
      setMessage(uploadError instanceof Error ? uploadError.message : "Image upload failed.");
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

    setSaving(true);
    setMessage("");

    const payload = {
      ...project,
      fullDescription: sanitizeRichText(project.fullDescription),
      servicesUsed: parseList(servicesText),
      images: galleryText.split(/\n/).map((item) => item.trim()).filter(Boolean),
      order: Number(project.order) || 0,
      updatedAt: serverTimestamp(),
    };

    try {
      if (isEdit && documentId) {
        await withAdminTimeout(updateDoc(doc(db, "portfolioProjects", documentId), payload), "Project update");
      } else {
        await withAdminTimeout(
          addDoc(collection(db, "portfolioProjects"), {
            ...payload,
            createdAt: serverTimestamp(),
          }),
          "Project save",
        );
      }

      setMessage("Project saved successfully.");
      setMessageType("success");
      window.setTimeout(() => router.push("/admin/projects"), 700);
    } catch (saveError) {
      console.error("Project save failed:", saveError);
      setMessage(getActionErrorMessage(saveError, "Project save failed."));
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={save} className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <AdminToast message={message} type={messageType} />
      <AdminCard className="flex flex-col gap-5">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FD853A]">Portfolio Project</p>
          <h2 className="mt-2 text-3xl font-semibold">{isEdit ? "Edit Project" : "Add Project"}</h2>
        </div>

        <StatusMessage message={message} type={messageType} />

        <Field label="Title">
          <input className={inputClass} value={project.title} onChange={(event) => onTitleChange(event.target.value)} required />
        </Field>

        <Field label="Slug">
          <input className={inputClass} value={project.slug} onChange={(event) => updateProject("slug", createSlug(event.target.value))} required />
        </Field>

        <Field label="Category">
          <select className={inputClass} value={project.category} onChange={(event) => updateProject("category", event.target.value)}>
            {portfolioCategories.filter((category) => category !== "All").map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </Field>

        <Field label="Short Description">
          <textarea className={inputClass} rows={3} value={project.shortDescription} onChange={(event) => updateProject("shortDescription", event.target.value)} />
        </Field>

        <Field label="Full Description">
          <RichTextEditor value={project.fullDescription} onChange={(value) => updateProject("fullDescription", value)} minHeight={260} />
        </Field>

        <Field label="Services Used (one per line or comma separated)">
          <textarea className={inputClass} rows={5} value={servicesText} onChange={(event) => setServicesText(event.target.value)} />
        </Field>
      </AdminCard>

      <div className="flex flex-col gap-6">
        <AdminCard className="flex flex-col gap-5">
          <Field label="Main Image URL">
            <input className={inputClass} value={project.mainImageUrl} onChange={(event) => updateProject("mainImageUrl", event.target.value)} />
          </Field>
          <input type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" onChange={(event) => uploadImage(event, "main")} disabled={uploading || saving} />
          {uploading && <p className="text-sm font-semibold text-[#FD853A]">Uploading image, please wait...</p>}
          {project.mainImageUrl && <AdminImagePreview src={project.mainImageUrl} alt="Project preview" />}
        </AdminCard>

        <AdminCard className="flex flex-col gap-5">
          <Field label="Gallery Image URLs (one per line)">
            <textarea className={inputClass} rows={6} value={galleryText} onChange={(event) => setGalleryText(event.target.value)} />
          </Field>
          <input type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" onChange={(event) => uploadImage(event, "gallery")} disabled={uploading || saving} />
          <div className="grid grid-cols-2 gap-3">
            {galleryText.split(/\n/).filter(Boolean).map((url) => (
              <AdminImagePreview key={url} src={url} alt="Project gallery preview" />
            ))}
          </div>
        </AdminCard>

        <AdminCard className="flex flex-col gap-5">
          <Field label="Display Order">
            <input type="number" className={inputClass} value={project.order} onChange={(event) => updateProject("order", Number(event.target.value))} />
          </Field>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex items-center gap-2 text-sm font-semibold">
              <input type="checkbox" checked={project.featured} onChange={(event) => updateProject("featured", event.target.checked)} />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold">
              <input type="checkbox" checked={project.showOnHome} onChange={(event) => updateProject("showOnHome", event.target.checked)} />
              Show on home
            </label>
          </div>

          <Field label="Status">
            <select className={inputClass} value={project.status} onChange={(event) => updateProject("status", event.target.value as "published" | "draft")}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </Field>

          <AdminButton type="submit" disabled={saving || uploading || !canSave}>
            {saving ? "Saving..." : uploading ? "Uploading..." : "Save Project"}
          </AdminButton>
        </AdminCard>
      </div>
    </form>
  );
}
