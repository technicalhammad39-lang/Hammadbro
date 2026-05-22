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
    <div className="group relative flex w-full max-w-[255px] min-h-[236px] flex-col justify-between overflow-hidden rounded-[24px] border border-white/25 bg-white/10 p-4 backdrop-blur-[15px] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#FD853A]">
      <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[#FD853A]/20 blur-2xl transition-colors duration-300 group-hover:bg-white/20" aria-hidden="true" />
      <div className="absolute -bottom-14 left-8 h-32 w-32 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />

      <div className="relative z-10 flex items-start justify-between gap-3 border-b border-white/20 pb-3">
        <h1 className="max-w-[170px] text-[18px] font-semibold leading-tight text-white sm:text-[20px]">
          {title}
        </h1>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FD853A] text-white transition-colors duration-300 group-hover:bg-white group-hover:text-[#FD853A]">
          <Icon size={20} />
        </div>
      </div>

      <div className="relative z-10 mt-4 flex flex-col gap-3">
        {imageSrc && (
          <div className="flex h-[96px] items-center justify-center overflow-hidden rounded-[18px] bg-white/10">
            <img
              src={normalizeImageUrl(imageSrc)}
              alt={title}
              className="h-full w-full rounded-[18px] object-contain"
              loading={priority ? "eager" : "lazy"}
              decoding="async"
            />
          </div>
        )}
        <p className="line-clamp-2 text-[13px] font-medium leading-snug text-white/85">
          {desc}
        </p>
      </div>
    </div>
  );
}
