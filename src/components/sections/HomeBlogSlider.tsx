"use client";

import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { GenericSlider } from "@/components/ui/GenericSlider";
import { Blog } from "@/data/data";
import { blogDocToBlog, BlogDoc } from "@/lib/content-types";
import { db } from "@/lib/firebase";

export default function HomeBlogSlider({ fallback }: { fallback: Blog[] }) {
  const [blogs, setBlogs] = useState<Blog[]>(fallback);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "blogs"), where("status", "==", "published"), orderBy("createdAt", "desc")),
      (snapshot) => {
        const items = snapshot.docs.map((doc) => blogDocToBlog({ id: doc.id, ...doc.data() } as BlogDoc)).slice(0, 6);
        setBlogs(items.length ? items : fallback);
      },
      (error) => {
        console.error("Home blog realtime listener failed:", error);
        setBlogs(fallback);
      },
    );

    return unsubscribe;
  }, [fallback]);

  return (
    <GenericSlider
      data={blogs}
      slidesPerView={3}
      heightClass=""
      cardType="blog"
      sourceHash="blog"
    />
  );
}
