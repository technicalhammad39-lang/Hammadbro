"use client";

import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { NotificationDoc } from "@/lib/content-types";
import { db } from "@/lib/firebase";

export default function NotificationBanner() {
  const [notification, setNotification] = useState<NotificationDoc | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "notifications"), where("active", "==", true), orderBy("createdAt", "desc")),
      (snapshot) => {
        const item = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))[0] as NotificationDoc | undefined;

        if (item && localStorage.getItem(`notification-${item.id}`) !== "dismissed") {
          setNotification(item);
        } else {
          setNotification(null);
        }
      },
      () => {
        setNotification(null);
      },
    );

    return unsubscribe;
  }, []);

  if (!notification) return null;

  const dismiss = () => {
    if (notification.id) {
      localStorage.setItem(`notification-${notification.id}`, "dismissed");
    }
    setNotification(null);
  };

  return (
    <div className="fixed bottom-4 left-1/2 z-[70] w-[calc(100%_-_32px)] max-w-3xl -translate-x-1/2 rounded-[24px] border border-white/20 bg-[#171717]/95 p-4 text-white shadow-2xl backdrop-blur-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FD853A]">{notification.type}</p>
          <h2 className="mt-1 text-lg font-semibold">{notification.title}</h2>
          <p className="mt-1 text-sm text-white/75">{notification.message}</p>
        </div>
        <button type="button" onClick={dismiss} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" aria-label="Dismiss notification">
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
