"use client";

import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminButton, AdminCard, AdminSkeleton, AdminToast, ConfirmDialog, StatusMessage } from "@/components/admin/AdminUi";
import { PortfolioProjectDoc } from "@/lib/content-types";
import { getActionErrorMessage, withAdminTimeout } from "@/lib/admin-action";
import { db } from "@/lib/firebase";

export default function AdminProjects() {
  const [projects, setProjects] = useState<PortfolioProjectDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"info" | "error" | "success">("success");
  const [deleteTarget, setDeleteTarget] = useState<PortfolioProjectDoc | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      query(collection(db, "portfolioProjects"), orderBy("order", "asc")),
      (snapshot) => {
        setProjects(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })) as PortfolioProjectDoc[]);
        setLoading(false);
      },
      (error) => {
        console.error("Projects load failed:", error);
        setMessage(error.message || "Projects failed to load.");
        setMessageType("error");
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  const removeProject = async () => {
    if (!deleteTarget?.id) return;

    try {
      setDeleting(true);
      setMessage("");
      await withAdminTimeout(deleteDoc(doc(db, "portfolioProjects", deleteTarget.id)), "Project delete");
      setMessage("Project deleted.");
      setMessageType("success");
      setDeleteTarget(null);
    } catch (error) {
      console.error("Project delete failed:", error);
      setMessage(getActionErrorMessage(error, "Project delete failed."));
      setMessageType("error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FD853A]">Portfolio</p>
          <h2 className="text-4xl font-semibold">Projects</h2>
        </div>
        <Link href="/admin/projects/new" className="rounded-full bg-[#FD853A] px-5 py-3 text-sm font-semibold text-white hover:bg-[#e46e24]">
          Add Project
        </Link>
      </div>

      <AdminToast message={message} type={messageType} />
      <StatusMessage message={message} type={messageType} />

      {loading && <AdminSkeleton rows={4} />}

      {!loading && projects.length === 0 && <AdminCard>No projects yet. Add your first project.</AdminCard>}

      <div className="grid gap-5">
        {projects.map((project) => (
          <AdminCard key={project.id} className="grid gap-5 lg:grid-cols-[160px_1fr_auto] lg:items-center">
            {project.mainImageUrl ? (
              <img src={project.mainImageUrl} alt={project.title} className="h-auto w-full rounded-[18px]" />
            ) : (
              <div className="flex h-28 items-center justify-center rounded-[18px] bg-[#F2F4F7] text-sm text-[#667085]">No image</div>
            )}
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FD853A]">{project.category}</p>
              <h3 className="mt-2 text-2xl font-semibold">{project.title}</h3>
              <p className="mt-2 text-[#667085]">{project.shortDescription}</p>
              <p className="mt-2 text-sm font-semibold text-[#344054]">Status: {project.status}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href={`/admin/projects/edit/${project.id}`} className="rounded-full bg-[#171717] px-4 py-2 text-sm font-semibold text-white">
                Edit
              </Link>
              <AdminButton type="button" variant="danger" onClick={() => setDeleteTarget(project)}>
                Delete
              </AdminButton>
            </div>
          </AdminCard>
        ))}
      </div>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete project?"
        description={`This will permanently delete "${deleteTarget?.title || "this project"}".`}
        loading={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={removeProject}
      />
    </div>
  );
}
