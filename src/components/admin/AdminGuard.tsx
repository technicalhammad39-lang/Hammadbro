"use client";

import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";

type AdminGuardProps = {
  children: React.ReactNode;
};

export default function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const verifyUser = async (user: User | null) => {
      if (!user) {
        router.replace("/admin/login");
        return;
      }

      try {
        const token = await user.getIdToken();
        const response = await fetch("/api/admin/session", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          await signOut(auth);
          router.replace("/admin/login?denied=1");
          return;
        }

        setAllowed(true);
      } catch {
        await signOut(auth);
        router.replace("/admin/login?denied=1");
      } finally {
        setChecking(false);
      }
    };

    return onAuthStateChanged(auth, verifyUser);
  }, [router]);

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#171717] px-5 text-white">
        <div className="rounded-[28px] border border-white/10 bg-white/10 p-8 text-center backdrop-blur-md">
          <p className="text-lg font-semibold text-[#FD853A]">Checking admin access...</p>
          <p className="mt-2 text-sm text-white/70">Please wait while we verify your session.</p>
        </div>
      </main>
    );
  }

  return allowed ? <>{children}</> : null;
}
