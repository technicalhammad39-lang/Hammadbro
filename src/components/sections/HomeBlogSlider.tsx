"use client";

import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { GenericSlider } from "@/components/ui/GenericSlider";
import { Blog } from "@/data/data";
import { blogDocToBlog, BlogDoc } from "@/lib/content-types";
import { db } from "@/lib/firebase";

export default function HomeBlogSlider() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let settled = false;
    const failOpenTimer = window.setTimeout(() => {
      if (!settled) {
        settled = true;
        setLoading(false);
      }
    }, 5500);

    const unsubscribe = onSnapshot(
      query(collection(db, "blogs"), where("status", "==", "published"), orderBy("createdAt", "desc")),
      (snapshot) => {
        settled = true;
        window.clearTimeout(failOpenTimer);
        const items = snapshot.docs.map((doc) => blogDocToBlog({ id: doc.id, ...doc.data() } as BlogDoc)).slice(0, 6);
        setBlogs(items);
        setLoading(false);
      },
      () => {
        settled = true;
        window.clearTimeout(failOpenTimer);
        setBlogs([]);
        setLoading(false);
      },
    );

    return () => {
      window.clearTimeout(failOpenTimer);
      unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="grid w-full gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-[360px] animate-pulse rounded-[24px] bg-[#F2F4F7]" />
        ))}
      </div>
    );
  }

  if (blogs.length === 0) {
    return <div className="w-full rounded-[28px] bg-[#F2F4F7] p-8 text-center text-[#667085]">Blog posts will appear here soon.</div>;
  }

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
