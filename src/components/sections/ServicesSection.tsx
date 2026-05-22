import { GenericSlider } from "@/components/ui/GenericSlider";
import { CardData } from "@/data/data";

const staticServices: CardData[] = [
  {
    title: "Logo Design",
    desc: "Clean and memorable logos for strong first impressions.",
    imageSrc: "/Frame%2026.svg",
    icon: "PenTool",
  },
  {
    title: "Brand Identity Design",
    desc: "Logo, colors, typography, and complete visual direction.",
    imageSrc: "/Frame%2077.svg",
    icon: "Palette",
  },
  {
    title: "Social Media Design",
    desc: "Posts, ads, banners, covers, carousels, and campaign creatives.",
    imageSrc: "/Frame%2060.svg",
    icon: "Share2",
  },
  {
    title: "Print Design",
    desc: "Flyers, posters, brochures, business cards, and print-ready layouts.",
    imageSrc: "/Rectangle%206.svg",
    icon: "Printer",
  },
  {
    title: "Business Profile Design",
    desc: "Company profiles, pitch decks, portfolios, and corporate layouts.",
    imageSrc: "/Frame%2026.svg",
    icon: "FileText",
  },
  {
    title: "Website Graphics",
    desc: "Hero banners, thumbnails, icons, web sections, and digital visuals.",
    imageSrc: "/Rectangle%206%20%281%29.svg",
    icon: "Monitor",
  },
  {
    title: "YouTube Thumbnails",
    desc: "High-click thumbnails with bold layouts and clear visual hierarchy.",
    imageSrc: "/Rectangle%207.svg",
    icon: "Monitor",
  },
  {
    title: "Banner & Flex Design",
    desc: "Shop boards, roll-ups, flex, event banners, and outdoor graphics.",
    imageSrc: "/Frame%2077.svg",
    icon: "Printer",
  },
  {
    title: "Packaging & Label Design",
    desc: "Product labels, boxes, stickers, and packaging visuals.",
    imageSrc: "/Rectangle%206.svg",
    icon: "Palette",
  },
  {
    title: "Brochure & Catalog Design",
    desc: "Product catalogs, company brochures, menus, and multi-page layouts.",
    imageSrc: "/Frame%2026.svg",
    icon: "FileText",
  },
  {
    title: "Photo Editing",
    desc: "Retouching, background cleanup, product edits, and polished visuals.",
    imageSrc: "/pic.webp",
    icon: "Palette",
  },
  {
    title: "Vector Tracing",
    desc: "Clean vector redraws for logos, icons, print files, and brand assets.",
    imageSrc: "/Property%201%3DDefault.svg",
    icon: "PenTool",
  },
];

export default function ServicesSection() {
  return (
    <GenericSlider
      data={staticServices}
      slidesPerView={4}
      heightClass="h-auto"
      cardType="hover"
    />
  );
}
