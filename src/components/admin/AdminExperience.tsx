"use client";

import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { FormEvent, useEffect, useState } from "react";
import { AdminButton, AdminCard, AdminSkeleton, AdminToast, ConfirmDialog, Field, inputClass, StatusMessage } from "@/components/admin/AdminUi";
import { experiences as defaultExperiences } from "@/data/data";
import { getActionErrorMessage, withAdminTimeout } from "@/lib/admin-action";
import { WorkExperienceDoc } from "@/lib/content-types";
import { db } from "@/lib/firebase";

const emptyExperience: WorkExperienceDoc = {
  companyName: "",
  role: "",
  location: "",
  startDate: "",
  endDate: "",
  currentlyWorking: false,
  description: "",
  order: 0,
  status: "draft",
};

export default function AdminExperience() {
  const [items, setItems] = useState<WorkExperienceDoc[]>([]);
  const [form, setForm] = useState<WorkExperienceDoc>(emptyExperience);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"info" | "error" | "success">("success");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<WorkExperienceDoc | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      query(collection(db, "workExperience"), orderBy("order", "asc")),
      (snapshot) => {
        setItems(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })) as WorkExperienceDoc[]);
        setLoading(false);
      },
      (error) => {
        console.error("Experience load failed:", error);
        setMessage(error.message || "Work experience failed to load.");
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

      for (const [index, experience] of defaultExperiences.entries()) {
        const [startDate, endDate = ""] = experience.duration.split(" - ");
        await withAdminTimeout(
          addDoc(collection(db, "workExperience"), {
            companyName: experience.company,
            role: experience.role,
            location: "",
            startDate,
            endDate: endDate === "Present" ? "" : endDate,
            currentlyWorking: endDate === "Present",
            description: experience.desc,
            order: index + 1,
            status: "published",
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          }),
          "Default experience save",
        );
      }

      setMessage("Default work experience added.");
      setMessageType("success");
    } catch (error) {
      console.error("Default experience seed failed:", error);
      setMessage(getActionErrorMessage(error, "Default experience seed failed."));
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  };

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setSaving(true);
      setMessage("");

      const payload = {
        ...form,
        order: Number(form.order) || 0,
        updatedAt: serverTimestamp(),
      };

      if (editingId) {
        await withAdminTimeout(updateDoc(doc(db, "workExperience", editingId), payload), "Experience update");
        setMessage("Experience updated.");
      } else {
        await withAdminTimeout(
          addDoc(collection(db, "workExperience"), {
            ...payload,
            createdAt: serverTimestamp(),
          }),
          "Experience save",
        );
        setMessage("Experience added.");
      }

      setMessageType("success");
      setForm(emptyExperience);
      setEditingId(null);
    } catch (error) {
      console.error("Experience save failed:", error);
      setMessage(getActionErrorMessage(error, "Experience save failed."));
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  };

  const edit = (item: WorkExperienceDoc) => {
    setEditingId(item.id || null);
    setForm(item);
  };

  const remove = async () => {
    if (!deleteTarget?.id) return;

    try {
      setDeleting(true);
      setMessage("");
      await withAdminTimeout(deleteDoc(doc(db, "workExperience", deleteTarget.id)), "Experience delete");
      setMessage("Experience deleted.");
      setMessageType("success");
      setDeleteTarget(null);
    } catch (error) {
      console.error("Experience delete failed:", error);
      setMessage(getActionErrorMessage(error, "Experience delete failed."));
      setMessageType("error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <AdminCard>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FD853A]">Work Experience</p>
        <h2 className="mt-2 text-3xl font-semibold">{editingId ? "Edit Experience" : "Add Experience"}</h2>
        <AdminToast message={message} type={messageType} />
        <StatusMessage message={message} type={messageType} />

        <form onSubmit={save} className="mt-6 flex flex-col gap-4">
          <Field label="Company Name">
            <input className={inputClass} value={form.companyName} onChange={(event) => setForm({ ...form, companyName: event.target.value })} required />
          </Field>
          <Field label="Role">
            <input className={inputClass} value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} required />
          </Field>
          <Field label="Location">
            <input className={inputClass} value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Start Date">
              <input className={inputClass} value={form.startDate} onChange={(event) => setForm({ ...form, startDate: event.target.value })} placeholder="Aug 2024" />
            </Field>
            <Field label="End Date">
              <input className={inputClass} value={form.endDate} onChange={(event) => setForm({ ...form, endDate: event.target.value })} placeholder="May 2026" disabled={form.currentlyWorking} />
            </Field>
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input type="checkbox" checked={form.currentlyWorking} onChange={(event) => setForm({ ...form, currentlyWorking: event.target.checked, endDate: event.target.checked ? "" : form.endDate })} />
            Currently working
          </label>
          <Field label="Description">
            <textarea className={inputClass} rows={5} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Order">
              <input type="number" className={inputClass} value={form.order} onChange={(event) => setForm({ ...form, order: Number(event.target.value) })} />
            </Field>
            <Field label="Status">
              <select className={inputClass} value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as "published" | "draft" })}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </Field>
          </div>
          <div className="flex flex-wrap gap-3">
            <AdminButton type="submit" disabled={saving}>{saving ? "Saving..." : editingId ? "Update Experience" : "Add Experience"}</AdminButton>
            {editingId && <AdminButton type="button" variant="light" onClick={() => { setEditingId(null); setForm(emptyExperience); }}>Cancel</AdminButton>}
            {items.length === 0 && <AdminButton type="button" variant="dark" onClick={seedDefaults} disabled={saving}>{saving ? "Saving..." : "Add Default Data"}</AdminButton>}
          </div>
        </form>
      </AdminCard>

      <div className="flex flex-col gap-4">
        {loading && <AdminSkeleton rows={4} />}
        {!loading && items.length === 0 && <AdminCard>No work experience found.</AdminCard>}
        {items.map((item) => (
          <AdminCard key={item.id}>
            <div className="flex flex-col justify-between gap-4 sm:flex-row">
              <div>
                <p className="text-sm font-semibold text-[#FD853A]">{item.companyName}</p>
                <h3 className="mt-1 text-2xl font-semibold">{item.role}</h3>
                <p className="mt-1 text-sm text-[#667085]">{item.startDate} - {item.currentlyWorking ? "Present" : item.endDate}</p>
                <p className="mt-3 text-[#667085]">{item.description}</p>
              </div>
              <div className="flex gap-2">
                <AdminButton type="button" variant="dark" onClick={() => edit(item)}>Edit</AdminButton>
                <AdminButton type="button" variant="danger" onClick={() => setDeleteTarget(item)}>Delete</AdminButton>
              </div>
            </div>
          </AdminCard>
        ))}
      </div>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete experience?"
        description={`This will permanently delete "${deleteTarget?.role || "this experience"}".`}
        loading={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={remove}
      />
    </div>
  );
}
