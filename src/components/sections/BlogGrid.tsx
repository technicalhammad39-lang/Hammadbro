"use client";

import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import BlogCard from "@/components/ui/Blog";
import { Blog } from "@/data/data";
import { blogDocToBlog, BlogDoc } from "@/lib/content-types";
import { db } from "@/lib/firebase";

export default function BlogGrid({ limitCount }: { limitCount?: number }) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "blogs"), where("status", "==", "published"), orderBy("createdAt", "desc")),
      (snapshot) => {
        let items = snapshot.docs.map((doc) => blogDocToBlog({ id: doc.id, ...doc.data() } as BlogDoc));

        if (limitCount) {
          items = items.slice(0, limitCount);
        }

        setBlogs(items);
        setLoading(false);
      },
      (error) => {
        console.error("Blog grid realtime listener failed:", error);
        setBlogs([]);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [limitCount]);

  if (loading) {
    return (
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: limitCount || 6 }).map((_, index) => (
          <div key={index} className="h-[360px] animate-pulse rounded-[24px] bg-[#F2F4F7]" />
        ))}
      </div>
    );
  }

  if (blogs.length === 0) {
    return <div className="rounded-[28px] bg-[#F2F4F7] p-8 text-center text-[#667085]">No blogs added yet.</div>;
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {blogs.map((post, index) => (
        <BlogCard key={post.slug} {...post} priority={index === 0} sourceHash="blog" />
      ))}
    </div>
  );
}
