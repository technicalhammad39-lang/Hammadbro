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

export default function ServicesSection({ fallback }: { fallback: CardData[] }) {
  const [items, setItems] = useState<CardData[]>(fallback);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "services"), where("status", "==", "published"), orderBy("order", "asc")),
      (snapshot) => {
        const services = snapshot.docs.map((item) => serviceToCard({ id: item.id, ...item.data() } as ServiceDoc));
        setItems(services.length ? services : fallback);
      },
      (error) => {
        console.error("Services realtime listener failed:", error);
        setItems(fallback);
      },
    );

    return unsubscribe;
  }, [fallback]);

  return (
    <GenericSlider
      data={items}
      slidesPerView={3}
      heightClass="h-auto"
      cardType="hover"
    />
  );
}
