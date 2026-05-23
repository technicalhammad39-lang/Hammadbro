import { adminDb } from "@/lib/firebase-admin";
import {
  BlogDoc,
  NotificationDoc,
  PortfolioProjectDoc,
  WorkExperienceDoc,
} from "@/lib/content-types";

const FIRESTORE_READ_TIMEOUT_MS = 5000;

async function withReadTimeout<T>(operation: Promise<T>, fallback: T, timeoutMs = FIRESTORE_READ_TIMEOUT_MS) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  try {
    return await Promise.race([
      operation,
      new Promise<T>((resolve) => {
        timeoutId = setTimeout(() => resolve(fallback), timeoutMs);
      }),
    ]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}

async function getPublishedCollection<T>(collectionName: string, orderField = "order") {
  try {
    const snapshot = await withReadTimeout(
      adminDb
        .collection(collectionName)
        .where("status", "==", "published")
        .orderBy(orderField, "asc")
        .get(),
      null,
    );

    if (!snapshot) {
      return [];
    }

    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as T[];
  } catch {
    return [];
  }
}

export async function getPublishedProjects(limitCount?: number, timeoutMs = FIRESTORE_READ_TIMEOUT_MS) {
  try {
    let query = adminDb
      .collection("portfolioProjects")
      .where("status", "==", "published")
      .orderBy("order", "asc");

    if (limitCount) {
      query = query.limit(limitCount);
    }

    const snapshot = await withReadTimeout(query.get(), null, timeoutMs);

    if (!snapshot) {
      return [];
    }

    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as PortfolioProjectDoc[];
  } catch {
    return [];
  }
}

export async function getHomeProjects(timeoutMs = FIRESTORE_READ_TIMEOUT_MS) {
  try {
    const snapshot = await withReadTimeout(
      adminDb
        .collection("portfolioProjects")
        .where("status", "==", "published")
        .where("showOnHome", "==", true)
        .orderBy("order", "asc")
        .limit(3)
        .get(),
      null,
      timeoutMs,
    );

    if (!snapshot) {
      return [];
    }

    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as PortfolioProjectDoc[];
  } catch {
    return [];
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const snapshot = await withReadTimeout(
      adminDb
        .collection("portfolioProjects")
        .where("slug", "==", slug)
        .where("status", "==", "published")
        .limit(1)
        .get(),
      null,
    );

    if (!snapshot || snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as PortfolioProjectDoc;
  } catch {
    return null;
  }
}

export async function getPublishedExperiences(timeoutMs = FIRESTORE_READ_TIMEOUT_MS) {
  try {
    const snapshot = await withReadTimeout(
      adminDb
        .collection("workExperience")
        .where("status", "==", "published")
        .orderBy("order", "asc")
        .get(),
      null,
      timeoutMs,
    );

    if (!snapshot) {
      return [];
    }

    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as WorkExperienceDoc[];
  } catch {
    return [];
  }
}

export async function getPublishedBlogs() {
  return getPublishedCollection<BlogDoc>("blogs", "createdAt");
}

export async function getBlogBySlug(slug: string) {
  try {
    const snapshot = await withReadTimeout(
      adminDb
        .collection("blogs")
        .where("slug", "==", slug)
        .where("status", "==", "published")
        .limit(1)
        .get(),
      null,
    );

    if (!snapshot || snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as BlogDoc;
  } catch {
    return null;
  }
}

export async function getActiveNotifications() {
  try {
    const snapshot = await withReadTimeout(
      adminDb
        .collection("notifications")
        .where("active", "==", true)
        .orderBy("createdAt", "desc")
        .limit(3)
        .get(),
      null,
    );

    if (!snapshot) {
      return [];
    }

    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as NotificationDoc[];
  } catch {
    return [];
  }
}
