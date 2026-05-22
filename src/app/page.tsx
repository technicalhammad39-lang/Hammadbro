import Navbar from "@/components/Navbar";
import CustomeText from "@/components/ui/CustomeText";
import DualToggleButtons from "@/components/ui/DualButtons";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { experiences, iconAndText, skills, blogs, portfolioData, cardData, reviews } from '../data/data';
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

          <Image
            src="/my-pic.webp"
            alt="Hammad graphic designer portrait"
            width={952}
            height={636}
            className="hero-portrait-fade hero-load-portrait absolute left-[45%] top-[48px] z-20 w-[360px] -translate-x-1/2 object-contain transition-transform duration-500 group-hover:scale-[1.015] lg:left-[49.5%] lg:top-[10px] lg:w-[510px] xl:left-[51.5%] xl:top-[-16px] xl:w-[640px]"
            priority
          />

          <div className="hero-load-buttons absolute left-1/2 top-[420px] z-50 w-full -translate-x-1/2 px-4 lg:top-[485px]">
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
              <a href="#projects" className="w-full rounded-full bg-[#FD853A] px-6 py-3.5 text-center text-base font-semibold text-white shadow-md transition-colors hover:bg-[#e4752f]">
                View Portfolio
              </a>
              <a href="#contact" className="w-full rounded-full border border-[#171717] px-6 py-3.5 text-center text-base font-semibold text-[#171717] transition-colors hover:bg-[#171717] hover:text-white">
                Hire Me
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="relative flex flex-col w-full min-h-0 gap-8 sm:gap-10 lg:gap-12 items-center px-5 sm:px-6 lg:px-[71px] py-12 sm:py-14 lg:py-[72px] bg-[#171717] rounded-[30px] sm:rounded-[50px] overflow-hidden">
        <Image
          src="/Frame 77.svg"
          alt="image"
          fill
          className="object-cover absolute opacity-50"
        />

        <Reveal className="w-full flex flex-col lg:flex-row items-start justify-between gap-6 relative z-10">
          <div className="flex gap-2.5">
            <CustomeText title="My" className="font-medium text-3xl sm:text-4xl lg:text-5xl text-[#FCFCFD]" />
            <CustomeText title="Services" className="font-medium text-3xl sm:text-4xl lg:text-5xl text-[#FD853A]" />
          </div>
          <p className="w-full lg:w-[578px] font-medium text-base sm:text-lg lg:text-[20px] text-white">
            Premium design services for brands that need clean, trusted, and professional visuals.
          </p>
        </Reveal>

        <div className="relative w-full max-w-[1299px] flex items-start justify-center">
          <ServicesSection fallback={cardData} />
        </div>
      </section>

      <ExperienceSection fallback={experiences} />

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
          <HomePortfolio fallback={portfolioData} />
        </div>
      </section>

      {/* Hire Me */}
      <section id="about" className="w-full flex flex-col lg:flex-row items-center justify-between px-5 sm:px-6 lg:px-[71px] py-12 sm:py-16 lg:py-[96px] bg-[#F2F4F7] rounded-[32px] lg:rounded-[50px] gap-8 lg:gap-[76px]">
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

        <Reveal className="w-full max-w-xl flex flex-col items-start gap-6 sm:gap-8" delay={0.08}>
          <div className="flex flex-wrap text-[36px] sm:text-5xl lg:text-6xl font-semibold gap-2 leading-tight">
            <CustomeText title="Why" className="text-[#344054]" />
            <CustomeText title="Hire Me" className="text-[#FD853A]" />
            <CustomeText title="?" className="text-[#344054]" />
          </div>

          <p className="text-[#667085] text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl">
            I create designs that help businesses look trusted, professional, and ready to sell. From brand identity and social media visuals to print-ready marketing designs, my focus is always on clean communication, strong first impressions, and consistent visual branding.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 w-full">
            <div className="flex flex-col">
              <AnimatedCounter value={100} suffix="+" className="text-[32px] sm:text-[36px] font-medium text-[#1D2939]" />
              <CustomeText
                title="Designs Completed"
                className="text-lg text-[#667085]"
              />
            </div>
            <div className="flex flex-col">
              <AnimatedCounter value={3} suffix="+" className="text-[32px] sm:text-[36px] font-medium text-[#1D2939]" />
              <CustomeText
                title="Years Experience"
                className="text-lg text-[#667085]"
              />
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <a href="#contact" className="w-full cursor-pointer sm:w-auto px-6 py-3.5 rounded-[20px] border border-[#151515] bg-[#151515] text-white font-semibold text-xl sm:text-[22px] transition-all duration-300 hover:bg-[#FD853A] hover:border-[#FD853A] text-center">
              Hire Me
            </a>
            <a href="/HammadGfx-CV.pdf" download className="w-full cursor-pointer sm:w-auto px-6 py-3.5 rounded-[20px] border border-[#151515] text-[#151515] font-semibold text-xl sm:text-[22px] transition-all duration-300 hover:bg-[#151515] hover:text-white text-center">
              Open CV
            </a>
          </div>
        </Reveal>
      </section>

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

        <div className="w-full max-w-3xl rounded-[28px] border border-[#E4E7EC] bg-white p-3 shadow-sm sm:p-4 md:p-5">
          <div className="mb-3 flex items-center gap-3 px-1">
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

      {/* Skills Slider */}
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

      {/* Blog */}
      <section id="blog" className="flex flex-col w-full h-fit items-center gap-8 sm:gap-12 px-5 sm:px-6 lg:px-[71px] py-12 sm:py-16 lg:py-[90px] overflow-hidden">
        <Reveal className="w-full max-w-[1298px] h-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-0">
          <h1 className="text-[#344054] w-full lg:w-fit md:min-w-[215px] h-auto font-bold text-[32px] sm:text-4xl md:text-5xl leading-tight">Design Insights From Hammad GFX</h1>
          <Link href="/blog" className="inline-flex w-[118px] h-[52px] items-center justify-center rounded-[60px] bg-[#FD853A] px-6 py-3 text-base font-bold text-white transition-all hover:bg-[#e46e24] sm:w-[144px] sm:h-[60px] sm:text-[18px]">
            See All
          </Link>
        </Reveal>
        <HomeBlogSlider fallback={blogs} />
      </section>

    </div>
  );
}
