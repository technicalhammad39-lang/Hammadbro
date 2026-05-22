"use client";

import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { FormEvent, useEffect, useState } from "react";
import { AdminButton, AdminCard, AdminSkeleton, AdminToast, ConfirmDialog, Field, inputClass, StatusMessage } from "@/components/admin/AdminUi";
import { getActionErrorMessage, withAdminTimeout } from "@/lib/admin-action";
import { NotificationDoc } from "@/lib/content-types";
import { db } from "@/lib/firebase";

const emptyNotification: NotificationDoc = {
  title: "",
  message: "",
  type: "info",
  active: true,
};

export default function AdminNotifications() {
  const [items, setItems] = useState<NotificationDoc[]>([]);
  const [form, setForm] = useState<NotificationDoc>(emptyNotification);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"info" | "error" | "success">("success");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<NotificationDoc | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      query(collection(db, "notifications"), orderBy("createdAt", "desc")),
      (snapshot) => {
        setItems(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })) as NotificationDoc[]);
        setLoading(false);
      },
      (error) => {
        console.error("Notifications load failed:", error);
        setMessage(error.message || "Notifications failed to load.");
        setMessageType("error");
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setSaving(true);
      setMessage("");

      const payload = {
        ...form,
        updatedAt: serverTimestamp(),
      };

      if (editingId) {
        await withAdminTimeout(updateDoc(doc(db, "notifications", editingId), payload), "Notification update");
        setMessage("Notification updated.");
      } else {
        await withAdminTimeout(
          addDoc(collection(db, "notifications"), {
            ...payload,
            createdAt: serverTimestamp(),
          }),
          "Notification save",
        );
        setMessage("Notification added.");
      }

      setMessageType("success");
      setForm(emptyNotification);
      setEditingId(null);
    } catch (error) {
      console.error("Notification save failed:", error);
      setMessage(getActionErrorMessage(error, "Notification save failed."));
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  };

  const edit = (item: NotificationDoc) => {
    setEditingId(item.id || null);
    setForm(item);
  };

  const remove = async () => {
    if (!deleteTarget?.id) return;

    try {
      setDeleting(true);
      setMessage("");
      await withAdminTimeout(deleteDoc(doc(db, "notifications", deleteTarget.id)), "Notification delete");
      setMessage("Notification deleted.");
      setMessageType("success");
      setDeleteTarget(null);
    } catch (error) {
      console.error("Notification delete failed:", error);
      setMessage(getActionErrorMessage(error, "Notification delete failed."));
      setMessageType("error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <AdminCard>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FD853A]">Notifications</p>
        <h2 className="mt-2 text-3xl font-semibold">{editingId ? "Edit Notification" : "Add Notification"}</h2>
        <AdminToast message={message} type={messageType} />
        <StatusMessage message={message} type={messageType} />

        <form onSubmit={save} className="mt-6 flex flex-col gap-4">
          <Field label="Title">
            <input className={inputClass} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required />
          </Field>
          <Field label="Message">
            <textarea className={inputClass} rows={5} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} required />
          </Field>
          <Field label="Type">
            <select className={inputClass} value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value as NotificationDoc["type"] })}>
              <option value="info">Info</option>
              <option value="update">Update</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
            </select>
          </Field>
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input type="checkbox" checked={form.active} onChange={(event) => setForm({ ...form, active: event.target.checked })} />
            Active
          </label>
          <div className="flex flex-wrap gap-3">
            <AdminButton type="submit" disabled={saving}>{saving ? "Saving..." : editingId ? "Update Notification" : "Add Notification"}</AdminButton>
            {editingId && <AdminButton type="button" variant="light" onClick={() => { setEditingId(null); setForm(emptyNotification); }}>Cancel</AdminButton>}
          </div>
        </form>
      </AdminCard>

      <div className="flex flex-col gap-4">
        {loading && <AdminSkeleton rows={4} />}
        {!loading && items.length === 0 && <AdminCard>No notifications found.</AdminCard>}
        {items.map((item) => (
          <AdminCard key={item.id}>
            <div className="flex flex-col justify-between gap-4 sm:flex-row">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FD853A]">{item.type}</p>
                <h3 className="mt-1 text-2xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-[#667085]">{item.message}</p>
                <p className="mt-2 text-sm font-semibold text-[#344054]">Active: {item.active ? "Yes" : "No"}</p>
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
        title="Delete notification?"
        description={`This will permanently delete "${deleteTarget?.title || "this notification"}".`}
        loading={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={remove}
      />
    </div>
  );
}
