import Navbar from "@/components/Navbar";
import CustomeText from "@/components/ui/CustomeText";
import DualToggleButtons from "@/components/ui/DualButtons";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { iconAndText, skills, reviews } from '../data/data';
import { GenericSlider } from "@/components/ui/GenericSlider";
import ClientOnly from "@/components/ui/ClientOnly";
import Reveal from "@/components/ui/Reveal";
import ExperienceSection from "@/components/sections/ExperienceSection";
import HomePortfolio from "@/components/sections/HomePortfolio";
import HomeBlogSlider from "@/components/sections/HomeBlogSlider";
import ServicesSection from "@/components/sections/ServicesSection";
import ContactForm from "@/components/ContactForm";
import SiteEmail from "@/components/SiteEmail";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

function renderCounterLabel(label: string) {
  const match = label.match(/^(\d+(?:\.\d+)?)(\+)?\s*(.*)$/);

  if (!match) {
    return label;
  }

  const value = Number(match[1]);
  const suffix = `${match[2] || ""}${match[3] ? ` ${match[3]}` : ""}`;
  const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;

  return <AnimatedCounter value={value} decimals={decimals} suffix={suffix} />;
}

function SkillsSlider() {
  return (
    <div className="relative w-full h-[100px] sm:h-[147px] bg-[#FB6514] rounded-tl-4xl rounded-br-4xl overflow-hidden">
      <div className="absolute top-6 sm:top-8 left-0 w-full h-[52px] sm:h-[63px] bg-white -rotate-2 md:-rotate-[1.9deg] z-10 flex items-center overflow-hidden">
        <div className="hidden sm:flex marquee gap-8 w-max">
          {[...skills, ...skills].map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-5 text-[#000000] text-[48px] whitespace-nowrap"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.4828 0.257982L21.715 12.3411L34.2082 16.5003L22.1251 21.7324L17.9659 34.2256L12.7337 22.1425L0.240553 17.9833L12.3237 12.7512L16.4828 0.257982Z"
                  fill="#FD853A"
                />
              </svg>
              {skill}
            </div>
          ))}
        </div>
        <div className="flex sm:hidden w-full justify-center gap-4 overflow-hidden px-6">
          {skills.slice(0, 2).map((skill, index) => (
            <div
              key={index}
              className="flex shrink-0 items-center gap-2 text-[#000000] text-[22px] whitespace-nowrap"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.4828 0.257982L21.715 12.3411L34.2082 16.5003L22.1251 21.7324L17.9659 34.2256L12.7337 22.1425L0.240553 17.9833L12.3237 12.7512L16.4828 0.257982Z"
                  fill="#FD853A"
                />
              </svg>
              {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const heroSocialLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/hammadgfx",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.35 8h4.3v14H.35V8Zm7.2 0h4.12v1.9h.06c.57-1.08 1.98-2.22 4.08-2.22 4.36 0 5.17 2.87 5.17 6.6V22h-4.3v-6.84c0-1.63-.03-3.73-2.27-3.73-2.28 0-2.63 1.78-2.63 3.61V22H7.55V8Z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/923280830815",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path fill="currentColor" d="M20.52 3.48A11.82 11.82 0 0 0 12.1 0C5.54 0 .22 5.31.22 11.86c0 2.09.55 4.14 1.6 5.94L.12 24l6.36-1.67a11.85 11.85 0 0 0 5.62 1.43h.01C18.66 23.76 24 18.45 24 11.9c0-3.18-1.24-6.17-3.48-8.42ZM12.1 21.75h-.01a9.83 9.83 0 0 1-5.01-1.37l-.36-.22-3.77.99 1.01-3.68-.24-.38a9.78 9.78 0 0 1-1.5-5.23C2.22 6.42 6.65 2 12.1 2a9.8 9.8 0 0 1 6.99 2.9 9.78 9.78 0 0 1 2.9 7c0 5.43-4.44 9.85-9.89 9.85Zm5.42-7.37c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48a8.96 8.96 0 0 1-1.66-2.06c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      </svg>
    ),
  },
  {
    label: "Mail",
    href: "mailto:hire@hammadgfx.online",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path fill="currentColor" d="M2.5 5A2.5 2.5 0 0 1 5 2.5h14A2.5 2.5 0 0 1 21.5 5v14A2.5 2.5 0 0 1 19 21.5H5A2.5 2.5 0 0 1 2.5 19V5Zm2.16.65 7.34 5.5 7.34-5.5A.75.75 0 0 0 19 4H5a.75.75 0 0 0-.34 1.65Zm15.34 2.1-7.55 5.66a.75.75 0 0 1-.9 0L4 7.75V19c0 .41.34.75.75.75h14.5c.41 0 .75-.34.75-.75V7.75Z" />
      </svg>
    ),
  },
];

function HeroSocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {heroSocialLinks.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          className="group flex h-10 w-10 items-center justify-center rounded-full border border-[#FD853A]/25 bg-white/75 text-[#171717] shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:border-[#FD853A] hover:bg-[#FD853A] hover:text-white hover:shadow-[0_12px_30px_rgba(253,133,58,0.35)]"
        >
          <span className="transition-transform duration-300 group-hover:scale-105">{item.icon}</span>
        </Link>
      ))}
    </div>
  );
}

function CtaArrow() {
  return (
    <span className="cta-arrow-stack shrink-0" aria-hidden="true">
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-white pt-4 sm:pt-6 pb-0 flex flex-col items-center justify-start">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="group relative flex w-full max-w-[1440px] min-h-[560px] flex-col items-center justify-start overflow-hidden px-5 pt-4 pb-8 sm:min-h-[620px] sm:px-6 sm:pt-6 sm:pb-8 md:block md:min-h-0 md:overflow-visible md:px-8 md:pt-6 md:pb-0 lg:px-[52px] lg:pt-8 xl:px-[71px]">
        <div className="relative mx-auto mt-4 hidden h-[560px] w-full max-w-[1298px] md:block lg:mt-6 lg:h-[640px] xl:h-[650px]">
          <Image
            src="/bottom-shape.webp"
            alt=""
            width={5542}
            height={1748}
            className="hero-bottom-shape hero-load-shape absolute -bottom-7 left-1/2 z-0 !h-[335px] w-[150vw] !max-w-none -translate-x-1/2 object-fill object-bottom lg:!h-[365px] lg:w-[125vw] xl:w-[118vw]"
            priority
            aria-hidden="true"
          />

          <div className="hero-load-left absolute left-0 top-[72px] z-30 lg:top-[52px] xl:top-[40px]">
            <h1 className="font-semibold leading-[0.92] text-[#171717]">
              <span className="block text-[40px] lg:text-[50px] xl:text-[62px]">Hey! I&apos;m</span>
              <span className="block text-[56px] text-[#FD853A] lg:text-[76px] xl:text-[94px]">Hammad</span>
            </h1>

            <div className="mt-6 max-w-[250px] lg:mt-7 lg:max-w-[300px] xl:mt-8 xl:max-w-[340px]">
              <p className="text-[12px] font-semibold leading-snug text-[#344054] lg:text-[14px] xl:text-[16px]">
                I create premium logos, brand identities, social media designs, and marketing visuals that help businesses look trusted, professional, and impossible to ignore.
              </p>
              <HeroSocialLinks className="mt-4" />
            </div>
          </div>

          <div className="hero-load-right absolute right-0 top-[165px] z-30 w-[360px] origin-top-right scale-[0.76] rounded-[32px] bg-white/35 px-4 py-3 backdrop-blur-[8px] lg:right-0 lg:top-[140px] lg:w-[410px] lg:scale-[0.84] lg:bg-white/40 lg:backdrop-blur-[10px] xl:-right-7 xl:top-[125px] xl:w-[430px] xl:scale-100">
            <h2 className="font-semibold leading-[1.04] text-[#171717] text-[34px] lg:text-[42px] xl:text-[58px]">
              <span className="block">Professional</span>
              <span className="hero-rotating-line">
                <span>Graphic Designer</span>
                <span>Brand Designer</span>
                <span>Visual Designer</span>
              </span>
            </h2>

            <div className="hero-load-stats mt-5 flex w-full max-w-[420px] items-center gap-4 rounded-[28px] bg-white/35 px-3 py-2 backdrop-blur-[6px] lg:max-w-[390px] xl:max-w-[420px]">
              <div className="flex flex-col items-start gap-1">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className="lg:h-6 lg:w-6" fill="#FD853A" stroke="#FD853A" />
                  ))}
                </div>
                <h3 className="text-[21px] font-bold leading-none text-[#171717] lg:text-[24px]"><AnimatedCounter value={4} suffix="+ Years" /></h3>
                <p className="text-[12px] font-medium text-[#171717] lg:text-[13px]">Experience</p>
              </div>

              <span className="h-12 w-px shrink-0 bg-[#FD853A]/40" aria-hidden="true" />

              <div className="flex flex-col items-start gap-1">
                <span className="text-[21px] font-bold leading-none text-[#171717] lg:text-[24px]"><AnimatedCounter value={500} suffix="+" /></span>
                <p className="max-w-[110px] text-[12px] font-medium leading-tight text-[#171717] lg:text-[13px]">
                  Projects Delivered
                </p>
                <p className="text-[12px] font-medium leading-none text-[#171717] lg:text-[13px]">Worldwide</p>
              </div>
            </div>
          </div>

          <div className="hero-load-portrait pointer-events-none absolute inset-x-0 top-[48px] z-20 flex justify-center lg:top-[10px] xl:top-[-16px]">
            <Image
              src="/my-pic.webp"
              alt="Hammad graphic designer portrait"
              width={952}
              height={636}
              className="hero-portrait-fade w-[360px] object-contain transition-transform duration-500 group-hover:scale-[1.015] lg:w-[510px] xl:w-[640px]"
              priority
            />
          </div>

          <div className="hero-load-buttons absolute inset-x-0 top-[420px] z-50 w-full px-4 lg:top-[485px]">
            <div className="mx-auto flex max-w-[390px] justify-center">
              <DualToggleButtons />
            </div>
          </div>
        </div>

        <div className="relative w-full min-w-0 flex flex-col items-center justify-start md:hidden">
          <div className="relative w-full max-w-[760px] lg:max-w-[760px] xl:max-w-[800px] aspect-[1.28/1] sm:aspect-[3/2] flex flex-col items-center justify-center -mt-2 sm:-mt-6 lg:-mt-20 mx-auto px-2 sm:px-4">
            <div className="absolute bottom-0 z-0 w-[78%] max-w-[640px] aspect-[2/1] overflow-hidden flex items-center justify-center pointer-events-auto [mask-image:linear-gradient(to_bottom,#000_62%,transparent_100%)]">
              <div className="absolute w-full h-full bg-[#FEB273] rounded-t-full" />
            </div>

            <div className="pointer-events-none absolute inset-x-0 top-[10%] z-10 h-[58%]">
              <span className="absolute left-[8%] top-[14%] text-[clamp(28px,7.8vw,44px)] font-semibold leading-none text-[#171717]">
                I&apos;m
              </span>
              <span className="absolute left-1/2 top-[27%] w-[116%] -translate-x-1/2 text-center text-[clamp(52px,16.5vw,104px)] font-semibold leading-none text-[#FD853A]">
                HAMMAD
              </span>
            </div>

            <div className="absolute bottom-[2%] z-10 hidden w-[78%] max-w-[640px] md:block transition-all duration-500 ease-in-out opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100">
              <Image
                src="/Frame%2068.svg"
                alt="Frame Decoration"
                width={1017}
                height={688}
                className="object-contain w-full h-auto"
                sizes="(max-width: 768px) 78vw, 640px"
                priority
              />
            </div>

            <Image
              src="/my-pic.webp"
              alt="Hammad graphic designer portrait"
              width={952}
              height={636}
              className="hero-portrait-fade hero-load-portrait relative z-20 w-[68%] max-w-[460px] sm:w-[62%] md:w-[56%] lg:w-[50%] xl:w-[48%] h-auto translate-y-8 object-contain mt-0"
              priority
            />

            <div className="absolute bottom-[9%] z-30 w-full hidden md:flex justify-center px-4">
              <DualToggleButtons />
            </div>
          </div>

          <div className="hero-load-left mt-2 flex w-full max-w-[940px] flex-col items-center justify-center transition-transform duration-300 ease-in-out group-hover:scale-[1.01] px-0 sm:px-6">
            <h1 className="flex w-full max-w-full flex-col items-center text-center font-semibold leading-[0.95] text-[clamp(38px,10.8vw,64px)] sm:text-[64px] md:text-[74px] xl:text-[88px] text-[#171717]">
              <span>Professional</span>
              <span className="hero-rotating-line">
                <span>Graphic Designer</span>
                <span>Brand Designer</span>
                <span>Visual Designer</span>
              </span>
            </h1>
            <div className="mt-4 w-full flex flex-col gap-3 md:hidden">
              <a href="#projects" className="premium-cta group flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-center text-base font-semibold text-white shadow-md transition-transform duration-300 active:scale-[0.98]">
                <span>View Portfolio</span>
                <CtaArrow />
              </a>
              <a href="#contact" className="premium-cta-outline group flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-center text-base font-semibold text-[#171717] transition-colors duration-300 hover:text-white active:scale-[0.98]">
                <span>Hire Me</span>
                <CtaArrow />
              </a>
              <HeroSocialLinks className="justify-center pt-1" />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="relative flex flex-col w-full min-h-0 gap-5 sm:gap-7 items-center px-5 sm:px-6 lg:px-[71px] py-9 sm:py-11 lg:py-12 bg-[#171717] rounded-[30px] sm:rounded-[50px] overflow-hidden">
        <Image
          src="/Frame 77.svg"
          alt="image"
          fill
          className="object-cover absolute opacity-50"
        />

        <Reveal className="w-full flex flex-col lg:flex-row items-start justify-between gap-5 relative z-10">
          <div className="flex gap-2.5">
            <CustomeText title="My" className="font-medium text-3xl sm:text-4xl lg:text-5xl text-[#FCFCFD]" />
            <CustomeText title="Services" className="font-medium text-3xl sm:text-4xl lg:text-5xl text-[#FD853A]" />
          </div>
          <p className="w-full lg:w-[578px] font-medium text-base sm:text-lg lg:text-[20px] text-white">
            Premium design services for brands that need clean, trusted, and professional visuals.
          </p>
        </Reveal>

        <div className="relative w-full max-w-[1299px] flex items-start justify-center">
          <ServicesSection />
        </div>
      </section>

      <ExperienceSection />

      {/* Portfolio */}
      <section id="projects" className="w-full flex flex-col items-center px-5 sm:px-6 lg:px-[71px] py-12 sm:py-16 lg:py-20 gap-8 lg:gap-12">
        <Reveal className="w-full flex flex-col sm:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex flex-col items-start max-w-full lg:max-w-[643px]">
            <CustomeText
              title="Lets Have a look at"
              className="font-semibold text-[32px] sm:text-[44px] lg:text-[64px] leading-tight text-[#344054]"
            />
            <div className="flex items-start justify-start gap-4 flex-wrap">
              <CustomeText
                title="my"
                className="font-semibold text-[32px] sm:text-[44px] lg:text-[64px] leading-tight text-[#344054]"
              />
              <CustomeText
                title="Portfolio"
                className="font-semibold text-[32px] sm:text-[44px] lg:text-[64px] leading-tight text-[#FD853A]"
              />
            </div>
          </div>

          <Link href="/portfolio" className="flex h-[52px] w-[118px] shrink-0 items-center justify-center rounded-[60px] bg-[#FD853A] px-6 py-3 text-base font-bold text-white transition-all hover:bg-[#e46e24] sm:h-[60px] sm:w-[144px] sm:text-[18px]">
            See All
          </Link>
        </Reveal>

        <div className="w-full flex flex-col items-center gap-8 lg:gap-12 max-w-[1290px]">
          <HomePortfolio />
        </div>
      </section>

      {/* Hire Me */}
      <section id="about" className="w-full flex flex-col lg:flex-row items-center justify-between px-5 sm:px-6 lg:px-[71px] py-10 sm:py-14 lg:py-20 bg-[#F2F4F7] rounded-[32px] lg:rounded-[50px] gap-7 lg:gap-[58px]">
        <Reveal className="relative w-full max-w-[360px] sm:max-w-[460px] lg:max-w-[500px] aspect-square group mx-auto lg:mx-0">
          <Image
            src="/pic2.webp"
            alt="Hire me"
            fill
            className="object-contain z-10 transition-all duration-300 ease-in-out group-hover:translate-y-3"
            sizes="(max-width: 768px) 90vw, 500px"
            priority
          />

          <Image
            src="/Property%201%3DVariant2.svg"
            alt="Hire me"
            fill
            className="object-contain absolute -translate-y-[15px] transition-all duration-300 ease-in-out opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-110"
            sizes="(max-width: 768px) 90vw, 500px"
            priority
          />
        </Reveal>

        <Reveal className="w-full max-w-xl lg:max-w-2xl flex flex-col items-start gap-5 sm:gap-6" delay={0.08}>
          <div className="flex flex-wrap text-[36px] sm:text-5xl lg:text-6xl font-semibold gap-2 leading-tight">
            <CustomeText title="Why" className="text-[#344054]" />
            <CustomeText title="Hire Me" className="text-[#FD853A]" />
            <CustomeText title="?" className="text-[#344054]" />
          </div>

          <p className="text-[#667085] text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl">
            I create designs that help businesses look trusted, professional, and ready to sell. From brand identity and social media visuals to print-ready marketing designs, my focus is always on clean communication, strong first impressions, and consistent visual branding.
          </p>

          <div className="grid w-full grid-cols-2 gap-2 sm:hidden">
            <div className="rounded-[20px] bg-white p-3 text-center shadow-sm">
              <AnimatedCounter value={100} suffix="+" className="stat-number-glow text-[26px] font-semibold text-[#1D2939]" />
              <p className="mt-1 text-[12px] font-medium leading-tight text-[#667085]">Designs Completed</p>
            </div>
            <div className="rounded-[20px] bg-white p-3 text-center shadow-sm">
              <AnimatedCounter value={3} suffix="+" className="stat-number-glow text-[26px] font-semibold text-[#1D2939]" />
              <p className="mt-1 text-[12px] font-medium leading-tight text-[#667085]">Years Experience</p>
            </div>
          </div>

          <div className="hidden w-full grid-cols-1 gap-3 sm:grid sm:grid-cols-3">
            <div className="rounded-[22px] bg-white p-4 shadow-sm">
              <AnimatedCounter value={500} suffix="+" className="stat-number-glow text-[30px] font-semibold text-[#1D2939]" />
              <p className="mt-1 text-sm font-medium text-[#667085]">Projects Delivered</p>
            </div>
            <div className="rounded-[22px] bg-white p-4 shadow-sm">
              <AnimatedCounter value={3} suffix="+" className="stat-number-glow text-[30px] font-semibold text-[#1D2939]" />
              <p className="mt-1 text-sm font-medium text-[#667085]">Years Experience</p>
            </div>
            <div className="rounded-[22px] bg-white p-4 shadow-sm">
              <AnimatedCounter value={100} suffix="+" className="stat-number-glow text-[30px] font-semibold text-[#1D2939]" />
              <p className="mt-1 text-sm font-medium text-[#667085]">Happy Clients</p>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <a href="#contact" className="premium-cta group flex w-full cursor-pointer items-center justify-center gap-2 rounded-[20px] px-6 py-3.5 text-center text-xl font-semibold text-white transition-transform duration-300 active:scale-[0.98] sm:w-auto sm:text-[22px]">
              <span>Hire Me</span>
              <CtaArrow />
            </a>
            <a href="/HammadGfx-CV.pdf" download className="premium-cta-outline group flex w-full cursor-pointer items-center justify-center gap-2 rounded-[20px] px-6 py-3.5 text-center text-xl font-semibold text-[#151515] transition-all duration-300 hover:text-white active:scale-[0.98] sm:w-auto sm:text-[22px]">
              <span>Open CV</span>
              <CtaArrow />
            </a>
          </div>
        </Reveal>
      </section>

      <div className="w-full -mt-3 mb-8 sm:-mt-5 sm:mb-10 lg:mb-12" data-lenis-prevent-touch>
        <SkillsSlider />
      </div>

      {/* Testimonials */}
      <section className="relative flex flex-col w-full min-h-0 items-center px-5 sm:px-6 lg:px-[71px] py-12 sm:py-16 lg:py-[90px] gap-8 sm:gap-12 bg-[#171717] rounded-[30px] sm:rounded-[40px] lg:rounded-[50px] overflow-hidden">
        <Image
          src="/Frame 77.svg"
          alt="image"
          fill
          className="object-cover absolute opacity-50"
        />

        <Reveal className="flex flex-col w-full max-w-[1299px] items-center gap-4 z-10 px-2">
          <div className="flex flex-col items-center max-w-full lg:max-w-[900px]">
            <CustomeText
              title="Testimonials That Speak to"
              className="font-medium text-[clamp(22px,6.5vw,48px)] text-[#FCFCFD] text-center whitespace-nowrap"
            />
            <div className="flex flex-wrap gap-2.5 justify-center">
              <CustomeText
                title="My Result"
                className="font-medium text-[28px] sm:text-[36px] lg:text-[48px] text-[#FD853A]"
              />
            </div>
          </div>
          <p className="w-full max-w-[742px] text-[16px] sm:text-[18px] lg:text-[20px] text-[#F9FAFB] text-center leading-[1.6] px-2">
            Real feedback from clients who needed professional brand visuals, social media designs, and print-ready marketing materials.
          </p>
        </Reveal>

        <div className="relative w-full z-10">
          <GenericSlider
            data={reviews}
            slidesPerView={3}
            heightClass=""
            cardType="review"
          />
        </div>
      </section>


      {/* Contact */}
      <section id="contact" className="w-full bg-white flex flex-col items-center justify-center py-12 sm:py-16 px-5 sm:px-6 lg:px-[71px] gap-8 sm:gap-10">
        <Reveal className="w-full max-w-4xl text-center flex flex-col items-center gap-3 sm:gap-4">
          <CustomeText
            title="Have an Awesome Project"
            className="font-semibold text-[32px] sm:text-4xl md:text-5xl lg:text-[64px] leading-tight text-[#344054]"
          />
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
            <CustomeText
              title="Idea?"
              className="font-semibold text-[32px] sm:text-4xl md:text-5xl lg:text-[64px] leading-tight text-[#344054]"
            />
            <CustomeText
              title="Let's Discuss"
              className="font-semibold text-[32px] sm:text-4xl md:text-5xl lg:text-[64px] leading-tight text-[#FD853A]"
            />
          </div>
        </Reveal>

        <div className="w-full max-w-5xl rounded-[32px] border border-[#E4E7EC] bg-white p-4 shadow-sm sm:p-5 md:p-7">
          <div className="mb-5 flex items-center gap-3 px-1">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFEAD5] md:h-[50px] md:w-[50px]">
              <Image
                src="/sms.svg"
                alt="message icon"
                width={24}
                height={24}
              />
            </div>
            <p className="text-left text-sm font-semibold text-[#344054] sm:text-base">
              Share your project details and I&apos;ll reply with the next step.
            </p>
          </div>

          <ClientOnly>
            <ContactForm />
          </ClientOnly>
        </div>

        <ClientOnly>
          <SiteEmail className="text-base font-semibold text-[#171717] transition-colors hover:text-[#FD853A]" />
        </ClientOnly>

        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-sm sm:text-base font-medium text-[#000000]">
          {iconAndText.map((data, index) => {
            const Icon = data.icon;
            return (
              <div key={index} className="flex items-center gap-2">
                <Icon size={20} />
                {renderCounterLabel(data.name)}
              </div>
            );
          })}
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="flex flex-col w-full h-fit items-center gap-8 sm:gap-12 px-5 sm:px-6 lg:px-[71px] py-12 sm:py-16 lg:py-[90px] overflow-hidden">
        <Reveal className="w-full max-w-[1298px] h-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-0">
          <h1 className="text-[#344054] w-full lg:w-fit md:min-w-[215px] h-auto font-bold text-[32px] sm:text-4xl md:text-5xl leading-tight">Design Insights From Hammad GFX</h1>
          <Link href="/blog" className="inline-flex w-[118px] h-[52px] items-center justify-center rounded-[60px] bg-[#FD853A] px-6 py-3 text-base font-bold text-white transition-all hover:bg-[#e46e24] sm:w-[144px] sm:h-[60px] sm:text-[18px]">
            See All
          </Link>
        </Reveal>
        <HomeBlogSlider />
      </section>

    </div>
  );
}
