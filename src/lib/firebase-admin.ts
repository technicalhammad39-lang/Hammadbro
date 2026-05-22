import "server-only";

import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import type { App } from "firebase-admin/app";
import type { Auth } from "firebase-admin/auth";
import type { Firestore } from "firebase-admin/firestore";

type FirebaseServiceAccount = {
  projectId: string;
  clientEmail: string;
  privateKey: string;
};

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing ${name}`);
  }

  return value;
}

function getPrivateKey() {
  const encoded = getRequiredEnv("FIREBASE_PRIVATE_KEY_BASE64");

  try {
    const privateKey = Buffer.from(encoded, "base64").toString("utf8").replace(/\\n/g, "\n");

    if (
      !privateKey.includes("-----BEGIN PRIVATE KEY-----") ||
      !privateKey.includes("-----END PRIVATE KEY-----")
    ) {
      throw new Error("Decoded value is not a Firebase private key");
    }

    return privateKey;
  } catch {
    throw new Error("Invalid FIREBASE_PRIVATE_KEY_BASE64");
  }
}

function getJsonFallbackServiceAccount(): FirebaseServiceAccount | null {
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

  if (!serviceAccountJson) {
    return null;
  }

  try {
    const parsed = JSON.parse(serviceAccountJson) as {
      project_id?: string;
      projectId?: string;
      client_email?: string;
      clientEmail?: string;
      private_key?: string;
      privateKey?: string;
    };

    const projectId = parsed.project_id || parsed.projectId;
    const clientEmail = parsed.client_email || parsed.clientEmail;
    const privateKey = (parsed.private_key || parsed.privateKey || "").replace(/\\n/g, "\n");

    if (!projectId || !clientEmail || !privateKey) {
      throw new Error("Incomplete FIREBASE_SERVICE_ACCOUNT_JSON");
    }

    return { projectId, clientEmail, privateKey };
  } catch {
    throw new Error("Invalid FIREBASE_SERVICE_ACCOUNT_JSON fallback");
  }
}

function getServiceAccount(): FirebaseServiceAccount {
  if (process.env.FIREBASE_PRIVATE_KEY_BASE64) {
    return {
      projectId: getRequiredEnv("FIREBASE_PROJECT_ID"),
      clientEmail: getRequiredEnv("FIREBASE_CLIENT_EMAIL"),
      privateKey: getPrivateKey(),
    };
  }

  const fallbackServiceAccount = getJsonFallbackServiceAccount();

  if (fallbackServiceAccount) {
    return fallbackServiceAccount;
  }

  throw new Error("Missing FIREBASE_PRIVATE_KEY_BASE64");
}

let cachedAdminApp: App | null = null;
let cachedAdminAuth: Auth | null = null;
let cachedAdminDb: Firestore | null = null;
let loggedAdminInitError = false;

function getAdminApp() {
  if (cachedAdminApp) {
    return cachedAdminApp;
  }

  if (admin.apps.length) {
    cachedAdminApp = admin.apps[0]!;
    return cachedAdminApp;
  }

  try {
    const serviceAccount = getServiceAccount();

    cachedAdminApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: serviceAccount.projectId,
    });

    return cachedAdminApp;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Firebase Admin error";

    if (!loggedAdminInitError) {
      console.error(`Firebase Admin initialization failed: ${message}`);
      loggedAdminInitError = true;
    }

    throw new Error("Firebase Admin initialization failed. Check server environment variables.");
  }
}

function getAdminAuth() {
  if (!cachedAdminAuth) {
    cachedAdminAuth = admin.auth(getAdminApp());
  }

  return cachedAdminAuth;
}

function getAdminDb() {
  if (!cachedAdminDb) {
    cachedAdminDb = getFirestore(
      getAdminApp(),
      process.env.FIREBASE_FIRESTORE_DATABASE_ID ||
        process.env.NEXT_PUBLIC_FIREBASE_FIRESTORE_DATABASE_ID ||
        "default",
    );
  }

  return cachedAdminDb;
}

export const adminApp = new Proxy({} as App, {
  get(_target, property) {
    const app = getAdminApp();
    const value = Reflect.get(app, property, app);
    return typeof value === "function" ? value.bind(app) : value;
  },
});

export const adminAuth = new Proxy({} as Auth, {
  get(_target, property) {
    const auth = getAdminAuth();
    const value = Reflect.get(auth, property, auth);
    return typeof value === "function" ? value.bind(auth) : value;
  },
});

export const adminDb = new Proxy({} as Firestore, {
  get(_target, property) {
    const db = getAdminDb();
    const value = Reflect.get(db, property, db);
    return typeof value === "function" ? value.bind(db) : value;
  },
});

export function getAdminEmail() {
  return process.env.ADMIN_EMAIL || "";
}

export async function verifyAdminToken(idToken: string) {
  const decoded = await adminAuth.verifyIdToken(idToken);
  const adminEmail = getAdminEmail();

  if (!adminEmail || decoded.email?.toLowerCase() !== adminEmail.toLowerCase()) {
    return null;
  }

  return decoded;
}
