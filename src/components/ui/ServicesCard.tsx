import { FileText, Monitor, Palette, PenTool, Printer, Share2 } from 'lucide-react';
import { normalizeImageUrl } from '@/lib/image-url';

const serviceIcons = {
  Palette,
  Share2,
  PenTool,
  Printer,
  Monitor,
  FileText,
};

interface HoverCardProps {
  title: string;
  imageSrc: string;
  desc: string;
  icon: keyof typeof serviceIcons;
  priority?: boolean;
}

export default function ServicesCard({ title, desc, icon, imageSrc, priority = false }: HoverCardProps) {
  const Icon = serviceIcons[icon];

  return (
    <div className="group relative flex w-[82vw] max-w-[360px] min-h-[350px] flex-col overflow-hidden rounded-[26px] border border-white/25 bg-white/10 p-5 backdrop-blur-[10px] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#FD853A] sm:w-full sm:max-w-[300px] sm:min-h-[310px] sm:p-4 lg:max-w-[270px] lg:min-h-[285px] xl:max-w-[255px] xl:min-h-[270px]">
      <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[#FD853A]/18 blur-2xl transition-colors duration-300 group-hover:bg-white/20" aria-hidden="true" />
      <div className="absolute -bottom-14 left-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <h1 className="max-w-[230px] text-[22px] font-semibold leading-tight text-white sm:max-w-[210px] sm:text-[20px] lg:max-w-[180px] lg:text-[19px] xl:text-[18px]">
          {title}
        </h1>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FD853A] text-white transition-colors duration-300 group-hover:bg-white group-hover:text-[#FD853A] sm:h-10 sm:w-10">
          <Icon size={21} />
        </div>
      </div>

      <div className="relative z-10 mt-5 flex flex-1 flex-col gap-4 sm:mt-4 sm:gap-3">
        {imageSrc && (
          <div className="flex h-[165px] items-center justify-center overflow-hidden rounded-[20px] bg-white/10 sm:h-[136px] lg:h-[124px] xl:h-[116px]">
            <img
              src={normalizeImageUrl(imageSrc)}
              alt={title}
              className="h-full w-full rounded-[20px] object-contain"
              loading={priority ? "eager" : "lazy"}
              decoding="async"
            />
          </div>
        )}
        <p className="line-clamp-3 text-[14px] font-medium leading-relaxed text-white/85 sm:text-[13px] sm:leading-snug">
          {desc}
        </p>
      </div>
    </div>
  );
}
