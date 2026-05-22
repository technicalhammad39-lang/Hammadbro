"use client";

import React from 'react';
import ArrowButton from './ArrowButton';
import { Blog as BlogType } from '../../data/data'; 
import Link from 'next/link';
import { normalizeImageUrl } from '@/lib/image-url';

interface BlogProps extends BlogType {
  priority?: boolean;
  sourceHash?: string;
}

const Blog: React.FC<BlogProps> = ({ image, button, name, date, title, slug, excerpt, sourceHash }) => {
  const detailHref = sourceHash ? `/blog/${slug}?from=${encodeURIComponent(sourceHash)}` : `/blog/${slug}`;

  const preserveSectionBeforeNavigation = () => {
    if (sourceHash && window.location.pathname === "/") {
      window.history.replaceState(null, "", `/#${sourceHash}`);
    }
  };

  return (
    <Link href={detailHref} onClick={preserveSectionBeforeNavigation} className="flex w-full max-w-[416px] flex-col items-start gap-5 sm:gap-[24px]">
      <div className="relative h-[220px] w-full overflow-hidden rounded-[18px] bg-[#171717] sm:h-[330px] lg:h-[360px] group">
        {image ? (
          <img src={normalizeImageUrl(image)} alt={title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#FD853A]/80 via-[#171717] to-[#171717]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#1D2939] transition-all duration-300 group-hover:bg-[#FD853A] sm:h-16 sm:w-16 lg:h-20 lg:w-20">
          <ArrowButton
            className="transition-all duration-300 stroke-white -rotate-45"
            height={48}
            width={48}
          />
        </div>
      </div>

      <div className="flex w-full flex-col items-start gap-4 sm:gap-5">
        <span className="flex h-[42px] w-auto min-w-[132px] items-center justify-center rounded-3xl bg-[#F2F4F7] px-5 py-2.5 text-base text-[#000000] transition-colors duration-300 hover:bg-[#FD853A] hover:text-white sm:text-[18px]">
          {button}
        </span>

        <div className="flex flex-wrap items-start gap-3 sm:gap-[24px]">
          <div className="flex items-center gap-2.5">
            <span className="bg-[#FD853A] w-[9px] h-[9px] rounded-full"></span>
            <span className="text-[#344054] text-sm sm:text-[18px] lg:text-[20px]">{name}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="bg-[#FD853A] w-[9px] h-[9px] rounded-full"></span>
            <span className="text-[#344054] text-sm sm:text-[18px] lg:text-[20px]">{date}</span>
          </div>
        </div>

        <h3 className="w-full h-auto text-[24px] sm:text-[28px] lg:text-[31px] leading-tight text-[#344054]">
          {title ?? 'Design Unraveled: Behind the Scenes of UI/UX Magic'}
        </h3>
        <p className="text-sm leading-relaxed text-[#667085] sm:text-base">{excerpt}</p>
      </div>
    </Link>
  );
};

export default Blog;
