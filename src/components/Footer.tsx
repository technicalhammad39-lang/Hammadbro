import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FacebookIcon, InstagramIcon, MessageCircle, TwitterIcon, YoutubeIcon } from "lucide-react";
import CustomeText from "./ui/CustomeText";
import ClientOnly from "./ui/ClientOnly";
import Reveal from "./ui/Reveal";
import ContactForm from "./ContactForm";
import SiteEmail from "./SiteEmail";

const Footer = () => {
    const navigation = [
        { label: "Home", href: "/#home" },
        { label: "About", href: "/#about" },
        { label: "Service", href: "/#services" },
        { label: "Resume", href: "/HammadGfx-CV.pdf", download: true },
        { label: "Project", href: "/portfolio" },
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: "/#contact" },
    ];

    const iconsAndUrl = [
        { icon: FacebookIcon, url: "https://facebook.com" },
        { icon: YoutubeIcon, url: "https://youtube.com/@clyrotechsolutions" },
        { icon: MessageCircle, url: "https://wa.me/923280830815" },
        { icon: InstagramIcon, url: "https://instagram.com/clyrotechpk" },
        { icon: TwitterIcon, url: "https://x.com/clyrotech" },
    ];

    const contact = [
        "WhatsApp: +92 3280830815",
        "Portfolio: hammadgfx.online",
    ];

    return (
        <footer className="w-full bg-[#272727] px-5 py-8 text-white sm:px-6 sm:py-10 lg:px-[71px] lg:py-12 rounded-t-2xl sm:rounded-t-3xl">
            <Reveal>
            <div className="mx-auto flex w-full max-w-[1298px] flex-col gap-8 lg:gap-10">
                <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
                    <h1 className="max-w-3xl text-[34px] font-semibold leading-tight text-[#FCFCFD] sm:text-[46px] lg:text-[64px]">
                        Let&apos;s Build a Premium Visual Identity
                    </h1>
                    <ClientOnly>
                        <Link href="/#contact" className="group flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-[#FD853A] px-5 text-base font-semibold text-white transition-colors hover:bg-[#e46e24] sm:w-[180px] lg:h-[62px] lg:w-[202px] lg:text-lg">
                            Hire Me
                            <ArrowUpRight size={24} className="transition-transform duration-300 group-hover:rotate-45" />
                        </Link>
                    </ClientOnly>
                </div>

                <div className="border border-[#475467]" />

                <div className="grid gap-8 lg:grid-cols-[1.5fr_0.65fr_0.85fr_0.9fr]">
                    <div className="flex flex-col gap-5">
                        <Link href="/#home" className="flex w-fit items-center gap-3">
                            <Image src="/logo.webp" alt="Hammad GFX logo" width={96} height={75} className="h-auto w-14 object-contain" style={{ height: "auto" }} />
                            <span className="text-lg font-bold tracking-wide">Hammad GFX</span>
                        </Link>
                        <p className="max-w-xl text-base leading-relaxed text-[#FCFCFD] sm:text-lg">
                            Premium graphic design, brand identity, social media design, and marketing visuals for businesses that want to look trusted and impossible to ignore.
                        </p>
                        <div className="flex flex-wrap gap-2.5">
                            {iconsAndUrl.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={idx}
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#333333] transition-transform hover:scale-110 hover:bg-[#444444]"
                                    >
                                        <Icon size={18} className="text-[#FD853A]" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <CustomeText title="Navigation" className="text-[20px] font-semibold text-[#FD853A]" />
                        <div className="flex flex-col gap-3">
                            {navigation.map((item) => item.download ? (
                                <a
                                    href={item.href}
                                    download
                                    key={item.label}
                                    className="text-[15px] text-[#FCFCFD] transition-colors hover:text-[#FD853A] sm:text-base"
                                >
                                    {item.label}
                                </a>
                            ) : (
                                <Link
                                    href={item.href}
                                    key={item.label}
                                    className="text-[15px] text-[#FCFCFD] transition-colors hover:text-[#FD853A] sm:text-base"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <CustomeText title="Contact" className="text-[20px] font-semibold text-[#FD853A]" />
                        <div className="flex flex-col gap-3">
                            <ClientOnly>
                                <SiteEmail prefix="Email: " className="break-words text-[15px] text-[#FCFCFD] transition-colors hover:text-[#FD853A] sm:text-base" />
                            </ClientOnly>
                            {contact.map((item) => (
                                <span key={item} className="break-words text-[15px] text-[#FCFCFD] sm:text-base">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex w-full flex-col gap-5">
                        <CustomeText title="Get the latest design insights" className="text-[20px] font-semibold text-[#FD853A]" />
                        <ClientOnly>
                            <ContactForm compact />
                        </ClientOnly>
                    </div>
                </div>

                <div className="border border-[#475467]" />

                <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
                    <p className="text-base text-white sm:text-lg">© 2026 Hammad GFX. All Rights Reserved.</p>
                    <Link href="/#home" className="text-base text-white transition-colors hover:text-[#FD853A] sm:text-lg">Back to top</Link>
                </div>
            </div>
            </Reveal>
        </footer>
    );
};

export default Footer;
