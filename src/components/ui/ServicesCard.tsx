import { FileText, Monitor, Palette, PenTool, Printer, Share2 } from 'lucide-react';

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

export default function ServicesCard({ title, desc, icon, imageSrc }: HoverCardProps) {
  const Icon = serviceIcons[icon];

  return (
    <div className="group relative flex w-full max-w-[360px] lg:max-w-[416px] min-h-[250px] sm:min-h-[270px] lg:min-h-[286px] flex-col justify-between overflow-hidden rounded-[30px] sm:rounded-[37px] lg:rounded-[40px] border border-white/30 bg-white/10 p-5 sm:p-6 backdrop-blur-[15px] transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#FD853A]">
      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#FD853A]/20 blur-2xl transition-colors duration-300 group-hover:bg-white/20" aria-hidden="true" />
      <div className="absolute -bottom-16 left-8 h-40 w-40 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-0 right-0 h-24 w-24 rounded-tl-[70px] bg-white/5" aria-hidden="true" />

      <div className="relative z-10 flex items-start justify-between gap-4 border-b border-white/25 pb-5">
        <h1 className="max-w-[260px] text-[24px] font-semibold leading-tight text-white sm:text-[28px] lg:text-[30px]">
          {title}
        </h1>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FD853A] text-white transition-colors duration-300 group-hover:bg-white group-hover:text-[#FD853A]">
          <Icon size={24} />
        </div>
      </div>

      <div className="relative z-10 mt-5 flex flex-col gap-4">
        {imageSrc && (
          <div className="overflow-hidden rounded-[22px] bg-white/10">
            <img src={imageSrc} alt={title} className="h-auto w-full rounded-[22px] object-contain" />
          </div>
        )}
        <p className="text-[15px] font-medium leading-snug text-white/85 sm:text-base">
          {desc}
        </p>
      </div>
    </div>
  );
}
