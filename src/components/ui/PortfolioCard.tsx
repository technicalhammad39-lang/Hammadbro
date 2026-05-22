"use client";

import Image from 'next/image';
import Link from 'next/link';
import ArrowButton from './ArrowButton';
import { PortfolioItem } from '@/data/data';

interface PortfolioCardProps extends Pick<PortfolioItem, 'image' | 'title' | 'href' | 'desc'> {
  category?: string;
  priority?: boolean;
  sourceHash?: string;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ image, title, href, desc, category, priority = false, sourceHash }) => {
  const detailHref = sourceHash ? `${href}?from=${encodeURIComponent(sourceHash)}` : href;

  const preserveSectionBeforeNavigation = () => {
    if (sourceHash && window.location.pathname === "/") {
      window.history.replaceState(null, "", `/#${sourceHash}`);
    }
  };

  return (
    <Link
      href={detailHref}
      onClick={preserveSectionBeforeNavigation}
      className="relative group 
        w-full 
        max-w-[633px] h-[230px] sm:h-[300px] md:h-[371px]
        md:max-w-none 
        rounded-[16px] md:rounded-[20px] 
        overflow-hidden transition-all duration-300 cursor-pointer bg-[#171717]
        shadow-md block"
      style={{
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      }}
    >
      <Image
        src={image}
        alt={title}
        fill
        priority={priority}
        sizes="(max-width: 768px) calc(100vw - 40px), (max-width: 1280px) 50vw, 633px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />

      <div className="absolute inset-0 z-10 bg-black/0 transition-colors duration-500 ease-out md:group-hover:bg-black/55 md:group-focus-visible:bg-black/55" />
      <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-black/40 to-transparent opacity-80 md:opacity-0 md:transition-opacity md:duration-500 md:group-hover:opacity-100" />

      <div className="absolute bottom-3 right-3 z-20 flex items-center gap-2 rounded-full bg-[#FD853A] px-4 py-2 text-sm font-semibold text-white shadow-lg md:hidden">
        View Project
        <ArrowButton className="stroke-white -rotate-45" height={24} width={24} />
      </div>

      <div className="absolute inset-x-4 bottom-4 z-20 hidden translate-y-4 rounded-[18px] border border-white/20 bg-black/45 px-5 py-4 opacity-0 backdrop-blur-md transition-all duration-500 ease-out md:block md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus-visible:translate-y-0 md:group-focus-visible:opacity-100">
        {category && (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FD853A]">
            {category}
          </p>
        )}
        <div className="mt-2 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-[24px] font-bold leading-tight text-white lg:text-[30px]">
              {title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/85">
              {desc}
            </p>
            <span className="mt-3 inline-flex text-sm font-semibold text-white">
              View Project
            </span>
          </div>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FD853A]">
            <ArrowButton className="stroke-white -rotate-45" height={40} width={40} />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PortfolioCard;
