import { adminDb } from "@/lib/firebase-admin";
import {
  BlogDoc,
  NotificationDoc,
  PortfolioProjectDoc,
  WorkExperienceDoc,
} from "@/lib/content-types";

async function getPublishedCollection<T>(collectionName: string, orderField = "order") {
  try {
    const snapshot = await adminDb
      .collection(collectionName)
      .where("status", "==", "published")
      .orderBy(orderField, "asc")
      .get();

    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as T[];
  } catch {
    return [];
  }
}

export async function getPublishedProjects(limitCount?: number) {
  try {
    let query = adminDb
      .collection("portfolioProjects")
      .where("status", "==", "published")
      .orderBy("order", "asc");

    if (limitCount) {
      query = query.limit(limitCount);
    }

    const snapshot = await query.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as PortfolioProjectDoc[];
  } catch {
    return [];
  }
}

export async function getHomeProjects() {
  try {
    const snapshot = await adminDb
      .collection("portfolioProjects")
      .where("status", "==", "published")
      .where("showOnHome", "==", true)
      .orderBy("order", "asc")
      .limit(3)
      .get();

    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as PortfolioProjectDoc[];
  } catch {
    return [];
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const snapshot = await adminDb
      .collection("portfolioProjects")
      .where("slug", "==", slug)
      .where("status", "==", "published")
      .limit(1)
      .get();

    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as PortfolioProjectDoc;
  } catch {
    return null;
  }
}

export async function getPublishedExperiences() {
  return getPublishedCollection<WorkExperienceDoc>("workExperience");
}

export async function getPublishedBlogs() {
  return getPublishedCollection<BlogDoc>("blogs", "createdAt");
}

export async function getBlogBySlug(slug: string) {
  try {
    const snapshot = await adminDb
      .collection("blogs")
      .where("slug", "==", slug)
      .where("status", "==", "published")
      .limit(1)
      .get();

    if (snapshot.empty) {
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
    const snapshot = await adminDb
      .collection("notifications")
      .where("active", "==", true)
      .orderBy("createdAt", "desc")
      .limit(3)
      .get();

    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as NotificationDoc[];
  } catch {
    return [];
  }
}
