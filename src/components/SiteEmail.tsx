"use client";

import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { SiteSettingsDoc } from "@/lib/content-types";
import { db } from "@/lib/firebase";

const fallbackEmail = "hire@hammadgfx.online";

export default function SiteEmail({ className = "", prefix = "" }: { className?: string; prefix?: string }) {
  const [email, setEmail] = useState(fallbackEmail);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "siteSettings", "main"),
      (snapshot) => {
        if (!snapshot.exists()) {
          setEmail(fallbackEmail);
          return;
        }

        const settings = snapshot.data() as Partial<SiteSettingsDoc>;
        setEmail(settings.email || fallbackEmail);
      },
      () => {
        setEmail(fallbackEmail);
      },
    );

    return unsubscribe;
  }, []);

  return (
    <a href={`mailto:${email}`} className={className}>
      {prefix}{email}
    </a>
  );
}
