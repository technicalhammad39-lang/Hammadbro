"use client";

import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { AdminButton, AdminCard, AdminToast, Field, inputClass, StatusMessage } from "@/components/admin/AdminUi";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { BlogDoc } from "@/lib/content-types";
import { getActionErrorMessage, withAdminTimeout } from "@/lib/admin-action";
import { db } from "@/lib/firebase";
import { createSlug, parseList } from "@/lib/slug";
import { uploadAdminFile } from "@/lib/upload-client";
import { sanitizeRichText } from "@/lib/rich-text";

const emptyBlog: BlogDoc = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  featuredImageUrl: "",
  category: "Brand Identity",
  author: "Hammad GFX",
  metaTitle: "",
  metaDescription: "",
  tags: [],
  status: "draft",
};

export default function BlogForm({ mode }: { mode: "new" | "edit" }) {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogDoc>(emptyBlog);
  const [tagsText, setTagsText] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"info" | "error" | "success">("info");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const documentId = params?.id;
  const isEdit = mode === "edit" && Boolean(documentId);
  const canSave = useMemo(() => blog.title.trim() && blog.slug.trim(), [blog.slug, blog.title]);

  useEffect(() => {
    if (!isEdit || !documentId) return;

    const loadBlog = async () => {
      try {
        const snapshot = await getDoc(doc(db, "blogs", documentId));

        if (snapshot.exists()) {
          const data = { id: snapshot.id, ...snapshot.data() } as BlogDoc;
          setBlog(data);
          setTagsText(data.tags?.join("\n") || "");
        }
      } catch (error) {
        console.error("Blog load failed:", error);
        setMessage(error instanceof Error ? error.message : "Blog failed to load.");
        setMessageType("error");
      }
    };

    loadBlog();
  }, [documentId, isEdit]);

  const updateBlog = <K extends keyof BlogDoc>(key: K, value: BlogDoc[K]) => {
    setBlog((current) => ({ ...current, [key]: value }));
  };

  const onTitleChange = (title: string) => {
    setBlog((current) => ({
      ...current,
      title,
      slug: current.slug ? current.slug : createSlug(title),
      metaTitle: current.metaTitle ? current.metaTitle : title,
    }));
  };

  const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage("Uploading featured image...");
    setMessageType("info");

    try {
      const url = await uploadAdminFile(file, "blogs");
      updateBlog("featuredImageUrl", url);
      setMessage("Featured image uploaded.");
      setMessageType("success");
    } catch (uploadError) {
      console.error("Blog image upload failed:", uploadError);
      setMessage(uploadError instanceof Error ? uploadError.message : "Upload failed.");
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
    const payload = {
      ...blog,
      content: sanitizeRichText(blog.content),
      tags: parseList(tagsText),
      updatedAt: serverTimestamp(),
    };

    try {
      if (isEdit && documentId) {
        await withAdminTimeout(updateDoc(doc(db, "blogs", documentId), payload), "Blog update");
      } else {
        await withAdminTimeout(
          addDoc(collection(db, "blogs"), {
            ...payload,
            createdAt: serverTimestamp(),
          }),
          "Blog save",
        );
      }

      setMessage("Blog saved successfully.");
      setMessageType("success");
      window.setTimeout(() => router.push("/admin/blogs"), 700);
    } catch (saveError) {
      console.error("Blog save failed:", saveError);
      setMessage(getActionErrorMessage(saveError, "Blog save failed."));
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
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FD853A]">Blog</p>
          <h2 className="mt-2 text-3xl font-semibold">{isEdit ? "Edit Blog" : "Add Blog"}</h2>
        </div>
        <StatusMessage message={message} type={messageType} />

        <Field label="Title">
          <input className={inputClass} value={blog.title} onChange={(event) => onTitleChange(event.target.value)} required />
        </Field>
        <Field label="Slug">
          <input className={inputClass} value={blog.slug} onChange={(event) => updateBlog("slug", createSlug(event.target.value))} required />
        </Field>
        <Field label="Excerpt">
          <textarea className={inputClass} rows={3} value={blog.excerpt} onChange={(event) => updateBlog("excerpt", event.target.value)} />
        </Field>
        <Field label="Content">
          <RichTextEditor value={blog.content} onChange={(value) => updateBlog("content", value)} minHeight={340} />
        </Field>
        <Field label="Tags (one per line or comma separated)">
          <textarea className={inputClass} rows={4} value={tagsText} onChange={(event) => setTagsText(event.target.value)} />
        </Field>
      </AdminCard>

      <div className="flex flex-col gap-6">
        <AdminCard className="flex flex-col gap-5">
          <Field label="Featured Image URL">
            <input className={inputClass} value={blog.featuredImageUrl} onChange={(event) => updateBlog("featuredImageUrl", event.target.value)} />
          </Field>
          <input type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" onChange={uploadImage} disabled={uploading || saving} />
          {uploading && <p className="text-sm font-semibold text-[#FD853A]">Uploading featured image...</p>}
          {blog.featuredImageUrl && <img src={blog.featuredImageUrl} alt="Blog preview" className="h-auto w-full rounded-[20px]" />}
        </AdminCard>

        <AdminCard className="flex flex-col gap-5">
          <Field label="Category">
            <input className={inputClass} value={blog.category} onChange={(event) => updateBlog("category", event.target.value)} />
          </Field>
          <Field label="Author">
            <input className={inputClass} value={blog.author} onChange={(event) => updateBlog("author", event.target.value)} />
          </Field>
          <Field label="Meta Title">
            <input className={inputClass} value={blog.metaTitle} onChange={(event) => updateBlog("metaTitle", event.target.value)} />
          </Field>
          <Field label="Meta Description">
            <textarea className={inputClass} rows={4} value={blog.metaDescription} onChange={(event) => updateBlog("metaDescription", event.target.value)} />
          </Field>
          <Field label="Status">
            <select className={inputClass} value={blog.status} onChange={(event) => updateBlog("status", event.target.value as "published" | "draft")}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </Field>
          <AdminButton type="submit" disabled={saving || uploading || !canSave}>
            {saving ? "Saving..." : uploading ? "Uploading..." : "Save Blog"}
          </AdminButton>
        </AdminCard>
      </div>
    </form>
  );
}
