"use client";

import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import CustomeText from "@/components/ui/CustomeText";
import { Experience } from "@/data/data";
import { experienceDocToExperience, WorkExperienceDoc } from "@/lib/content-types";
import { db } from "@/lib/firebase";

export default function ExperienceSection({ initialItems = [] }: { initialItems?: Experience[] }) {
  const [items, setItems] = useState<Experience[]>(initialItems);
  const [loading, setLoading] = useState(initialItems.length === 0);

  useEffect(() => {
    let settled = false;
    const failOpenTimer = window.setTimeout(() => {
      if (!settled) {
        settled = true;
        setLoading(false);
      }
    }, 5500);

    const unsubscribe = onSnapshot(
      query(collection(db, "workExperience"), where("status", "==", "published"), orderBy("order", "asc")),
      (snapshot) => {
        settled = true;
        window.clearTimeout(failOpenTimer);
        const firestoreItems = snapshot.docs.map((doc) => experienceDocToExperience({ id: doc.id, ...doc.data() } as WorkExperienceDoc));
        setItems(firestoreItems);
        setLoading(false);
      },
      () => {
        settled = true;
        window.clearTimeout(failOpenTimer);
        setItems((currentItems) => currentItems);
        setLoading(false);
      },
    );

    return () => {
      window.clearTimeout(failOpenTimer);
      unsubscribe();
    };
  }, []);

  return (
    <section className="relative isolate w-full min-h-0 flex flex-col items-start mx-auto overflow-hidden px-5 sm:px-6 lg:px-[71px] py-8 sm:py-10 lg:py-14">
      <div className="experience-side-element pointer-events-none absolute right-0 top-1/2 z-0 hidden h-60 w-60 -translate-y-1/2 opacity-55 xl:block 2xl:right-12 2xl:h-72 2xl:w-72" aria-hidden="true">
        <span className="experience-side-glow absolute inset-6 rounded-full bg-[#FD853A]/20" />
        <Image
          src="/side2.png"
          alt=""
          fill
          className="relative z-10 object-contain drop-shadow-[0_22px_32px_rgba(253,133,58,0.20)]"
          sizes="(min-width: 1536px) 288px, 240px"
        />
      </div>

      <Reveal className="flex w-full flex-col items-center justify-center gap-1 text-center lg:hidden mb-6">
        <CustomeText title="My" className="font-medium text-[clamp(30px,9vw,36px)] text-[#344054]" />
        <div className="flex items-center justify-center gap-2 whitespace-nowrap">
          <CustomeText title="Work" className="font-medium text-[clamp(30px,9vw,36px)] text-[#344054]" />
          <CustomeText title="Experience" className="font-medium text-[clamp(30px,9vw,36px)] text-[#FD853A]" />
        </div>
      </Reveal>

      <Reveal className="relative z-10 hidden w-full max-w-[980px] h-auto lg:flex flex-wrap lg:flex-row items-start justify-start gap-x-2.5 mb-6 lg:mb-6 text-left">
        <CustomeText title="My" className="font-medium text-4xl sm:text-5xl lg:text-6xl text-[#344054]" />
        <CustomeText title="Work" className="font-medium text-4xl sm:text-5xl lg:text-6xl text-[#FD853A]" />
        <CustomeText title="Experience" className="font-medium text-4xl sm:text-5xl lg:text-6xl text-[#FD853A]" />
      </Reveal>

      {loading && (
        <div className="grid w-full gap-5 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-[150px] animate-pulse rounded-[24px] bg-[#F2F4F7]" />
          ))}
        </div>
      )}

      {!loading && items.length === 0 && (
        <div className="w-full rounded-[28px] bg-[#F2F4F7] p-8 text-center text-[#667085]">Experience details will appear here soon.</div>
      )}

      {!loading && items.length > 0 && <div className="relative w-full lg:hidden">
        <div className="timeline-flow-line absolute left-3 top-3 bottom-3 w-[2px] rounded-full bg-[#171717]/20" aria-hidden="true" />
        {items.map((exp) => (
          <div key={`${exp.company}-${exp.role}`} className="relative z-10 mb-7 last:mb-0">
            <div className="flex items-start gap-4">
              <div className="relative flex-shrink-0 mt-2">
                <div className="w-6 h-6 rounded-full border-2 border-dashed border-[#1D2939] bg-white shadow-[0_0_0_5px_#fff]" />
                <div className={`absolute top-1 left-1 w-4 h-4 rounded-full ${exp.dotColor}`} />
              </div>

              <div className="flex-1">
                <CustomeText title={exp.company} className="font-semibold text-[#1D2939] text-[20px] sm:text-[24px] mb-1" />
                <CustomeText title={exp.duration} className="text-[#98A2B3] text-[14px] sm:text-[16px] mb-2" />
                <CustomeText title={exp.role} className="font-semibold text-[#1D2939] text-[18px] sm:text-[20px] mb-2" />
                {exp.desc && (
                  <CustomeText title={exp.desc} className="text-[#98A2B3] text-[14px] sm:text-[16px] leading-relaxed" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>}

      {!loading && items.length > 0 && <Reveal className="relative z-10 hidden w-full justify-start lg:flex">
        <div className="grid w-full max-w-[980px] grid-cols-[minmax(260px,360px)_56px_minmax(320px,460px)] gap-x-7 gap-y-8">
          {items.map((exp, index) => (
            <Fragment key={`${exp.company}-${exp.role}`}>
              <div className="flex min-h-[132px] flex-col gap-3">
                <CustomeText title={exp.company} className="font-semibold text-[#1D2939] text-[30px] xl:text-[36px] leading-tight" />
                <CustomeText title={exp.duration} className="text-lg xl:text-xl text-[#98A2B3]" />
              </div>

              <div className="relative flex justify-center pt-1">
                {index < items.length - 1 && (
                  <div className="timeline-flow-line absolute left-1/2 top-7 -bottom-11 w-[2px] -translate-x-1/2 rounded-full bg-[#171717]/20" />
                )}
                <div className="relative flex h-12 w-12 items-center justify-center">
                  <div className="absolute h-12 w-12 rounded-full border-2 border-dashed border-[#1D2939] bg-white shadow-[0_0_0_7px_#fff]" />
                  <div className={`z-10 h-9 w-9 rounded-full ${exp.dotColor}`} />
                </div>
              </div>

              <div className="flex min-h-[132px] flex-col gap-3">
                <CustomeText title={exp.role} className="font-semibold text-[#1D2939] text-[30px] xl:text-[36px] leading-tight" />
                {exp.desc && (
                  <CustomeText title={exp.desc} className="text-base xl:text-lg leading-relaxed text-[#98A2B3]" />
                )}
              </div>
            </Fragment>
          ))}
        </div>
      </Reveal>}
    </section>
  );
}
