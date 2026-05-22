import { getAnalytics, isSupported } from "firebase/analytics";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
  console.log(
    "[Firebase] NEXT_PUBLIC_FIREBASE_API_KEY exists:",
    typeof process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "undefined" &&
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY.length > 0,
  );
}

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(
  firebaseApp,
  process.env.NEXT_PUBLIC_FIREBASE_FIRESTORE_DATABASE_ID || "default",
);

export async function getFirebaseAnalytics() {
  if (typeof window === "undefined") {
    return null;
  }

  const supported = await isSupported();
  return supported ? getAnalytics(firebaseApp) : null;
}
