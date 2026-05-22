"use client";

import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminCard, AdminSkeleton, StatusMessage } from "@/components/admin/AdminUi";
import { ContactMessageDoc } from "@/lib/content-types";
import { db } from "@/lib/firebase";

const metrics = [
  { label: "Total portfolio projects", collectionName: "portfolioProjects" },
  { label: "Total blog posts", collectionName: "blogs" },
  { label: "Total work experiences", collectionName: "workExperience" },
  { label: "Total notifications", collectionName: "notifications" },
  { label: "Total services", collectionName: "services" },
  { label: "Contact messages", collectionName: "contactMessages" },
];

const actions = [
  { label: "Add Project", href: "/admin/projects/new" },
  { label: "Add Blog", href: "/admin/blogs/new" },
  { label: "Add Experience", href: "/admin/experience" },
  { label: "Add Notification", href: "/admin/notifications" },
  { label: "Add Service", href: "/admin/services/new" },
  { label: "View Messages", href: "/admin/messages" },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [activeNotifications, setActiveNotifications] = useState(0);
  const [recentMessages, setRecentMessages] = useState<ContactMessageDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    const unsubscribers = metrics.map((metric) =>
      onSnapshot(
        collection(db, metric.collectionName),
        (snapshot) => {
          setCounts((current) => ({ ...current, [metric.collectionName]: snapshot.size }));
          setLoading(false);
        },
        (snapshotError) => {
          console.error(`Dashboard count failed for ${metric.collectionName}:`, snapshotError);
          setError(snapshotError.message || "Dashboard counts failed to load.");
          setLoading(false);
        },
      ),
    );

    const unsubscribeActive = onSnapshot(
      query(collection(db, "notifications"), where("active", "==", true)),
      (snapshot) => setActiveNotifications(snapshot.size),
      (snapshotError) => {
        console.error("Active notification count failed:", snapshotError);
        setError(snapshotError.message || "Active notifications failed to load.");
      },
    );

    const unsubscribeMessages = onSnapshot(
      query(collection(db, "contactMessages"), orderBy("createdAt", "desc"), limit(5)),
      (snapshot) => setRecentMessages(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })) as ContactMessageDoc[]),
      (snapshotError) => {
        console.error("Recent messages failed:", snapshotError);
        setRecentMessages([]);
      },
    );

    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
      unsubscribeActive();
      unsubscribeMessages();
    };
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <AdminCard key={metric.collectionName}>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FD853A]">{metric.label}</p>
            <p className="mt-5 text-5xl font-semibold text-[#171717]">{loading ? "-" : counts[metric.collectionName] ?? 0}</p>
          </AdminCard>
        ))}
      </div>

      <StatusMessage message={error} type="error" />

      {loading && <AdminSkeleton rows={4} />}

      <AdminCard className="bg-[#171717] text-white">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold">Quick actions</h2>
            <p className="mt-2 text-white/70">Create new content, upload Hostinger images, and publish updates.</p>
          </div>
          <p className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-[#FD853A]">
            Active notifications: {activeNotifications}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {actions.map((action) => (
            <Link key={action.href} href={action.href} className="rounded-full bg-[#FD853A] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e46e24]">
              {action.label}
            </Link>
          ))}
        </div>
      </AdminCard>

      <AdminCard>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FD853A]">Contact</p>
            <h2 className="mt-2 text-3xl font-semibold">Recent Messages</h2>
          </div>
          <Link href="/admin/messages" className="rounded-full bg-[#171717] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2a2a2a]">
            Open Messages
          </Link>
        </div>

        <div className="mt-5 grid gap-3">
          {recentMessages.length === 0 && <p className="rounded-[18px] bg-[#F9FAFB] p-4 text-[#667085]">No messages yet.</p>}
          {recentMessages.map((item) => (
            <div key={item.id} className="rounded-[18px] border border-[#E4E7EC] p-4">
              <p className="font-semibold text-[#171717]">{item.email}</p>
              <p className="mt-1 text-sm text-[#667085]">{item.subject || item.message || "Website contact form"}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#FD853A]">{item.status}</p>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
