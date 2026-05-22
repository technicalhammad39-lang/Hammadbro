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
    <div className="group relative flex w-[86vw] max-w-[360px] min-h-[324px] flex-col overflow-hidden rounded-[26px] border border-white/25 bg-white/10 p-5 backdrop-blur-[10px] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#FD853A] sm:w-full sm:max-w-[340px] sm:min-h-[328px] sm:p-5 lg:max-w-[330px] lg:min-h-[338px] xl:max-w-[340px] xl:min-h-[350px]">
      <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[#FD853A]/18 blur-2xl transition-colors duration-300 group-hover:bg-white/20" aria-hidden="true" />
      <div className="absolute -bottom-14 left-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />

      <div className="relative z-10 flex items-start justify-between gap-4">
        <h1 className="max-w-[230px] text-[21px] font-semibold leading-tight text-white sm:max-w-[240px] sm:text-[20px] lg:max-w-[245px] lg:text-[20px] xl:text-[21px]">
          {title}
        </h1>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FD853A] text-white transition-colors duration-300 group-hover:bg-white group-hover:text-[#FD853A] sm:h-11 sm:w-11">
          <Icon size={18} />
        </div>
      </div>

      <div className="relative z-10 mt-3 flex flex-col gap-2.5 sm:mt-3">
        {imageSrc && (
          <div className="flex h-[180px] items-center justify-center overflow-hidden rounded-[20px] sm:h-[166px] lg:h-[176px] xl:h-[188px]">
            <img
              src={normalizeImageUrl(imageSrc)}
              alt={title}
              className="h-full w-full rounded-[20px] object-cover"
              loading={priority ? "eager" : "lazy"}
              decoding="async"
            />
          </div>
        )}
        <p className="line-clamp-2 text-[14px] font-medium leading-relaxed text-white/85 sm:text-[14px] lg:text-[15px]">
          {desc}
        </p>
      </div>
    </div>
  );
}
