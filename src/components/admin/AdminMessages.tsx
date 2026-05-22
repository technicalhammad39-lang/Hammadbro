"use client";

import { collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { AdminButton, AdminCard, AdminSkeleton, AdminToast, ConfirmDialog, StatusMessage } from "@/components/admin/AdminUi";
import { getActionErrorMessage, withAdminTimeout } from "@/lib/admin-action";
import { ContactMessageDoc } from "@/lib/content-types";
import { db } from "@/lib/firebase";

function formatDate(value: unknown) {
  if (value && typeof value === "object" && "toDate" in value && typeof value.toDate === "function") {
    return value.toDate().toLocaleString();
  }

  return "No date";
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessageDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"info" | "error" | "success">("success");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ContactMessageDoc | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      query(collection(db, "contactMessages"), orderBy("createdAt", "desc")),
      (snapshot) => {
        setMessages(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })) as ContactMessageDoc[]);
        setLoading(false);
      },
      (error) => {
        console.error("Messages load failed:", error);
        setMessage(error.message || "Messages failed to load.");
        setMessageType("error");
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  const updateStatus = async (item: ContactMessageDoc, status: ContactMessageDoc["status"]) => {
    if (!item.id) return;

    try {
      setUpdatingId(item.id);
      setMessage("");
      await withAdminTimeout(
        updateDoc(doc(db, "contactMessages", item.id), {
          status,
          updatedAt: serverTimestamp(),
        }),
        "Message status update",
      );
      setMessage(`Message marked ${status}.`);
      setMessageType("success");
    } catch (error) {
      console.error("Message status update failed:", error);
      setMessage(getActionErrorMessage(error, "Message status update failed."));
      setMessageType("error");
    } finally {
      setUpdatingId(null);
    }
  };

  const removeMessage = async () => {
    if (!deleteTarget?.id) return;

    try {
      setDeleting(true);
      setMessage("");
      await withAdminTimeout(deleteDoc(doc(db, "contactMessages", deleteTarget.id)), "Message delete");
      setMessage("Message deleted.");
      setMessageType("success");
      setDeleteTarget(null);
    } catch (error) {
      console.error("Message delete failed:", error);
      setMessage(getActionErrorMessage(error, "Message delete failed."));
      setMessageType("error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FD853A]">Contact</p>
        <h2 className="text-4xl font-semibold">Messages</h2>
      </div>

      <AdminToast message={message} type={messageType} />
      <StatusMessage message={message} type={messageType} />

      {loading && <AdminSkeleton rows={4} />}
      {!loading && messages.length === 0 && <AdminCard>No messages yet.</AdminCard>}

      <div className="grid gap-5">
        {messages.map((item) => (
          <AdminCard key={item.id}>
            <div className="flex flex-col justify-between gap-5 lg:flex-row">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#FD853A]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#FD853A]">
                    {item.status}
                  </span>
                  <span className="text-sm text-[#667085]">{formatDate(item.createdAt)}</span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold text-[#171717]">{item.email}</h3>
                {item.name && <p className="mt-1 text-[#344054]">Name: {item.name}</p>}
                {item.phone && <p className="mt-1 text-[#344054]">Phone: {item.phone}</p>}
                {item.subject && <p className="mt-3 font-semibold text-[#171717]">{item.subject}</p>}
                {item.message && <p className="mt-2 whitespace-pre-wrap text-[#667085]">{item.message}</p>}
              </div>
              <div className="flex shrink-0 flex-wrap gap-2 lg:justify-end">
                <AdminButton type="button" variant="light" disabled={updatingId === item.id} onClick={() => updateStatus(item, "read")}>
                  Mark Read
                </AdminButton>
                <AdminButton type="button" variant="dark" disabled={updatingId === item.id} onClick={() => updateStatus(item, "replied")}>
                  Mark Replied
                </AdminButton>
                <AdminButton type="button" variant="danger" onClick={() => setDeleteTarget(item)}>
                  Delete
                </AdminButton>
              </div>
            </div>
          </AdminCard>
        ))}
      </div>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete message?"
        description={`This will permanently delete the message from ${deleteTarget?.email || "this contact"}.`}
        loading={deleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={removeMessage}
      />
    </div>
  );
}
