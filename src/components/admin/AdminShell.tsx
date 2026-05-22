"use client";

import { signOut } from "firebase/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Projects", href: "/admin/projects" },
  { label: "Blogs", href: "/admin/blogs" },
  { label: "Services", href: "/admin/services" },
  { label: "Experience", href: "/admin/experience" },
  { label: "Notifications", href: "/admin/notifications" },
  { label: "Messages", href: "/admin/messages" },
  { label: "Settings", href: "/admin/settings" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await signOut(auth);
    router.replace("/admin/login");
  };

  return (
    <main className="min-h-screen bg-[#F9FAFB] text-[#171717]">
      <div className="border-b border-white/10 bg-[#171717] px-5 py-5 text-white sm:px-6 lg:px-[71px]">
        <div className="mx-auto flex max-w-[1298px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#FD853A]">Hammad GFX Admin</p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Content Dashboard</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${active ? "bg-[#FD853A] text-white" : "bg-white/10 text-white hover:bg-white/20"}`}
                >
                  {item.label}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={logout}
              className="rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[#171717]"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1298px] px-5 py-8 sm:px-6 lg:px-[71px]">
        {children}
      </div>
    </main>
  );
}
