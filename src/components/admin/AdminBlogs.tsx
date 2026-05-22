"use client";

import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminButton, AdminCard, AdminImagePreview, AdminSkeleton, AdminToast, ConfirmDialog, StatusMessage } from "@/components/admin/AdminUi";
import { BlogDoc } from "@/lib/content-types";
import { getActionErrorMessage, withAdminTimeout } from "@/lib/admin-action";
import { db } from "@/lib/firebase";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<BlogDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"info" | "error" | "success">("success");
  const [deleteTarget, setDeleteTarget] = useState<BlogDoc | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      query(collection(db, "blogs"), orderBy("createdAt", "desc")),
      (snapshot) => {
        setBlogs(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })) as BlogDoc[]);
        setLoading(false);
      },
      (error) => {
        console.error("Blogs load failed:", error);
        setMessage(error.message || "Blogs failed to load.");
        setMessageType("error");
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  const removeBlog = async () => {
    if (!deleteTarget?.id) return;

    try {
      setDeleting(true);
      setMessage("");
      await withAdminTimeout(deleteDoc(doc(db, "blogs", deleteTarget.id)), "Blog delete");
      setMessage("Blog deleted.");
      setMessageType("success");
      setDeleteTarget(null);
    } catch (error) {
      console.error("Blog delete failed:", error);
      setMessage(getActionErrorMessage(error, "Blog delete failed."));
      setMessageType("error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FD853A]">Blog</p>
          <h2 className="text-4xl font-semibold">Posts</h2>
        </div>
        <Link href="/admin/blogs/new" className="rounded-full bg-[#FD853A] px-5 py-3 text-sm font-semibold text-white hover:bg-[#e46e24]">
          Add Blog
        </Link>
      </div>

      <AdminToast message={message} type={messageType} />
      <StatusMessage message={message} type={messageType} />

      {loading && <AdminSkeleton rows={4} />}
      {!loading && blogs.length === 0 && <AdminCard>No blogs added yet.</AdminCard>}

      <div className="grid gap-5">
        {blogs.map((blog) => (
          <AdminCard key={blog.id} className="grid gap-5 lg:grid-cols-[160px_1fr_auto] lg:items-center">
            {blog.featuredImageUrl ? (
              <AdminImagePreview src={blog.featuredImageUrl} alt={blog.title} />
            ) : (
              <div className="flex h-28 items-center justify-center rounded-[18px] bg-[#F2F4F7] text-sm text-[#667085]">No image</div>
            )}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FD853A]">{blog.category}</p>
              <h3 className="mt-2 text-2xl font-semibold">{blog.title}</h3>
              <p className="mt-2 text-[#667085]">{blog.excerpt}</p>
              <p className="mt-2 text-sm font-semibold text-[#344054]">Status: {blog.status}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href={`/admin/blogs/edit/${blog.id}`} className="rounded-full bg-[#171717] px-4 py-2 text-sm font-semibold text-white">
                Edit
              </Link>
              <AdminButton type="button" variant="danger" onClick={() => setDeleteTarget(blog)}>
                Delete
              </AdminButton>
            </div>
          </AdminCard>
        ))}
      </div>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete blog?"
        description={`This will permanently delete "${deleteTarget?.title || "this blog"}".`}
        loading={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={removeBlog}
      />
    </div>
  );
}
