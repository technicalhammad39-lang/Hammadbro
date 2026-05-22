"use client";

import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { GenericSlider } from "@/components/ui/GenericSlider";
import { CardData } from "@/data/data";
import { ServiceDoc } from "@/lib/content-types";
import { db } from "@/lib/firebase";

const serviceIconFallback: CardData["icon"] = "Palette";

function serviceToCard(service: ServiceDoc): CardData {
  return {
    title: service.title,
    desc: service.shortDescription,
    imageSrc: service.imageUrl,
    icon: service.icon || serviceIconFallback,
  };
}

export default function ServicesSection() {
  const [items, setItems] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "services"), where("status", "==", "published"), orderBy("order", "asc")),
      (snapshot) => {
        const services = snapshot.docs.map((item) => serviceToCard({ id: item.id, ...item.data() } as ServiceDoc));
        setItems(services);
        setLoading(false);
      },
      (error) => {
        console.error("Services realtime listener failed:", error);
        setItems([]);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="grid w-full place-items-center gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="h-[350px] w-[82vw] max-w-[360px] animate-pulse rounded-[26px] bg-white/10 sm:h-[310px] sm:w-full sm:max-w-[300px] lg:h-[285px] lg:max-w-[270px] xl:h-[270px] xl:max-w-[255px]" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return <div className="rounded-[24px] bg-white/10 px-6 py-5 text-center font-semibold text-white/70">Services will appear here soon.</div>;
  }

  return (
    <GenericSlider
      data={items}
      slidesPerView={5}
      heightClass="h-auto"
      cardType="hover"
    />
  );
}
