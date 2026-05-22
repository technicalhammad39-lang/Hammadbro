"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const denied = new URLSearchParams(window.location.search).get("denied");

    if (denied) {
      setError("Access denied. Please use the configured admin email.");
    }
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const token = await credential.user.getIdToken();
      const response = await fetch("/api/admin/session", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        await auth.signOut();
        setError("Access denied. This account is not the configured admin email.");
        return;
      }

      router.replace("/admin");
    } catch (loginError) {
      const message = loginError instanceof Error ? loginError.message : "Login failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#171717] px-5 py-10 text-white">
      <form onSubmit={submit} className="w-full max-w-[460px] rounded-[32px] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-md sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#FD853A]">Admin Login</p>
        <h1 className="mt-3 text-4xl font-semibold">Hammad GFX</h1>
        <p className="mt-3 text-white/70">Sign in with Firebase Email/Password to manage portfolio content.</p>

        <div className="mt-8 flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Admin email"
            className="rounded-[18px] border border-white/10 bg-white px-4 py-3 text-[#171717] outline-none focus:border-[#FD853A]"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className="rounded-[18px] border border-white/10 bg-white px-4 py-3 text-[#171717] outline-none focus:border-[#FD853A]"
            required
          />
        </div>

        {error && <p className="mt-4 rounded-[16px] border border-red-300 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-[#FD853A] px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#e46e24] disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        <Link href="/" className="mt-5 block text-center text-sm font-semibold text-white/70 hover:text-white">
          Back to website
        </Link>
      </form>
    </main>
  );
}
