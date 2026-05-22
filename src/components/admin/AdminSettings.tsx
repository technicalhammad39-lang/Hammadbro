"use client";

import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { FormEvent, useEffect, useState } from "react";
import { AdminButton, AdminCard, AdminToast, Field, inputClass, StatusMessage } from "@/components/admin/AdminUi";
import { getActionErrorMessage, withAdminTimeout } from "@/lib/admin-action";
import { SiteSettingsDoc } from "@/lib/content-types";
import { db } from "@/lib/firebase";
import { parseList } from "@/lib/slug";

const defaultSettings: SiteSettingsDoc = {
  heroTitle: "Professional",
  heroAnimatedWords: ["Graphic Designer", "Brand Designer", "Visual Designer"],
  heroDescription: "I create premium logos, brand identities, social media designs, and marketing visuals that help businesses look trusted, professional, and impossible to ignore.",
  whatsapp: "+92 3280830815",
  email: "hire@hammadgfx.online",
  linkedin: "",
  behance: "",
  instagram: "https://instagram.com/clyrotechpk",
  footerText: "Premium graphic design, brand identity, social media design, and marketing visuals for businesses that want to look trusted and impossible to ignore.",
  cvUrl: "/HammadGfx-CV.pdf",
};

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSettingsDoc>(defaultSettings);
  const [wordsText, setWordsText] = useState(defaultSettings.heroAnimatedWords.join("\n"));
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"info" | "error" | "success">("success");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "siteSettings", "main"),
      (snapshot) => {
        if (!snapshot.exists()) return;

        const data = snapshot.data() as SiteSettingsDoc;
        setSettings({ ...defaultSettings, ...data });
        setWordsText(data.heroAnimatedWords?.join("\n") || "");
      },
      (error) => {
        console.error("Settings load failed:", error);
        setMessage(error.message || "Settings failed to load.");
        setMessageType("error");
      },
    );

    return unsubscribe;
  }, []);

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      await withAdminTimeout(
        setDoc(
          doc(db, "siteSettings", "main"),
          {
            ...settings,
            heroAnimatedWords: parseList(wordsText),
            updatedAt: serverTimestamp(),
          },
          { merge: true },
        ),
        "Settings save",
      );
      setMessage("Settings saved.");
      setMessageType("success");
    } catch (error) {
      console.error("Settings save failed:", error);
      setMessage(getActionErrorMessage(error, "Settings save failed."));
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminCard className="mx-auto max-w-4xl">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FD853A]">Site Settings</p>
      <h2 className="mt-2 text-3xl font-semibold">Global Content</h2>
      <AdminToast message={message} type={messageType} />
      <StatusMessage message={message} type={messageType} />

      <form onSubmit={save} className="mt-6 grid gap-5">
        <Field label="Hero Title">
          <input className={inputClass} value={settings.heroTitle} onChange={(event) => setSettings({ ...settings, heroTitle: event.target.value })} />
        </Field>
        <Field label="Hero Animated Words">
          <textarea className={inputClass} rows={4} value={wordsText} onChange={(event) => setWordsText(event.target.value)} />
        </Field>
        <Field label="Hero Description">
          <textarea className={inputClass} rows={4} value={settings.heroDescription} onChange={(event) => setSettings({ ...settings, heroDescription: event.target.value })} />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="WhatsApp">
            <input className={inputClass} value={settings.whatsapp} onChange={(event) => setSettings({ ...settings, whatsapp: event.target.value })} />
          </Field>
          <Field label="Email">
            <input className={inputClass} value={settings.email} onChange={(event) => setSettings({ ...settings, email: event.target.value })} />
          </Field>
          <Field label="LinkedIn">
            <input className={inputClass} value={settings.linkedin} onChange={(event) => setSettings({ ...settings, linkedin: event.target.value })} />
          </Field>
          <Field label="Behance">
            <input className={inputClass} value={settings.behance} onChange={(event) => setSettings({ ...settings, behance: event.target.value })} />
          </Field>
          <Field label="Instagram">
            <input className={inputClass} value={settings.instagram} onChange={(event) => setSettings({ ...settings, instagram: event.target.value })} />
          </Field>
          <Field label="CV URL">
            <input className={inputClass} value={settings.cvUrl} onChange={(event) => setSettings({ ...settings, cvUrl: event.target.value })} />
          </Field>
        </div>
        <Field label="Footer Text">
          <textarea className={inputClass} rows={4} value={settings.footerText || ""} onChange={(event) => setSettings({ ...settings, footerText: event.target.value })} />
        </Field>
        <AdminButton type="submit" disabled={saving}>{saving ? "Saving..." : "Save Settings"}</AdminButton>
      </form>
    </AdminCard>
  );
}
