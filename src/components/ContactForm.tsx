"use client";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FormEvent, useState } from "react";
import { db } from "@/lib/firebase";
import { getActionErrorMessage, withAdminTimeout } from "@/lib/admin-action";

export default function ContactForm({ compact = false }: { compact?: boolean }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [messageText, setMessageText] = useState("");
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "info">("info");
  const [saving, setSaving] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      setStatus("Please enter your email address.");
      setStatusType("error");
      return;
    }

    if (!compact && !messageText.trim()) {
      setStatus("Please write a short message.");
      setStatusType("error");
      return;
    }

    try {
      setSaving(true);
      setStatus("");
      await withAdminTimeout(
        addDoc(collection(db, "contactMessages"), {
          ...(name.trim() ? { name: name.trim() } : {}),
          email: email.trim(),
          ...(messageText.trim() ? { message: messageText.trim() } : {}),
          source: "website",
          status: "new",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        }),
        "Contact submit",
      );
      setName("");
      setEmail("");
      setMessageText("");
      setStatus("Thanks! I'll get back to you soon.");
      setStatusType("success");
    } catch (error) {
      console.error("Contact submit failed:", error);
      setStatus(getActionErrorMessage(error, "Message could not be sent. Please try again."));
      setStatusType("error");
    } finally {
      setSaving(false);
    }
  };

  const statusClass =
    statusType === "success" ? "text-green-600" : statusType === "error" ? "text-red-600" : "text-[#667085]";

  if (compact) {
    return (
      <form onSubmit={submit} className="relative h-[50px] w-full">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email Address"
          className="h-full w-full rounded-[10px] border-none bg-white px-4 py-3 pr-14 text-[15px] text-black outline-none"
          disabled={saving}
        />
        <button
          type="submit"
          disabled={saving}
          className="absolute right-0 top-0 flex h-full w-[50px] items-center justify-center rounded-r-[10px] bg-[#FD853A] transition-colors hover:bg-[#e46e24] disabled:opacity-60"
          aria-label="Send email"
        >
          <svg width="22" height="22" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.29602 3.48708C3.91012 2.38589 1.36183 4.66673 2.19279 7.15964L3.45424 10.9007C3.59136 11.3074 3.97267 11.5812 4.40182 11.5812H13C13.5523 11.5812 14 12.0289 14 12.5812C14 13.1335 13.5523 13.5812 13 13.5812H4.40182C3.97267 13.5812 3.59136 13.855 3.45424 14.2617L2.19281 18.0028C1.36183 20.4957 3.91012 22.7765 6.29603 21.6754L20.0983 15.3051C22.422 14.2326 22.422 10.9299 20.0983 9.85737L6.29602 3.48708Z" fill="#FCFCFD" />
          </svg>
        </button>
        {status && <p className={`mt-2 text-sm font-semibold ${statusClass}`}>{status}</p>}
      </form>
    );
  }

  return (
    <form onSubmit={submit} className="grid w-full gap-3">
      <div className="grid gap-3 sm:grid-cols-[0.8fr_1fr]">
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
          className="w-full rounded-full bg-[#F9FAFB] px-5 py-3 text-base text-[#1D2939] outline-none placeholder:text-[#667085] focus:ring-2 focus:ring-[#FD853A]/30"
          disabled={saving}
        />
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email Address"
          className="w-full rounded-full bg-[#F9FAFB] px-5 py-3 text-base text-[#1D2939] outline-none placeholder:text-[#667085] focus:ring-2 focus:ring-[#FD853A]/30"
          disabled={saving}
          required
        />
      </div>

      <textarea
        value={messageText}
        onChange={(event) => setMessageText(event.target.value)}
        placeholder="Tell me about your project"
        className="min-h-[132px] w-full resize-none rounded-[24px] bg-[#F9FAFB] px-5 py-4 text-base leading-relaxed text-[#1D2939] outline-none placeholder:text-[#667085] focus:ring-2 focus:ring-[#FD853A]/30"
        disabled={saving}
        required
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {status && <p className={`text-center text-sm font-semibold sm:text-left ${statusClass}`}>{status}</p>}
        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-full bg-[#FD853A] px-8 py-3 text-base font-semibold text-white transition duration-300 hover:bg-[#e4752f] disabled:opacity-60 sm:ml-auto sm:w-fit sm:text-lg"
        >
          {saving ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}
