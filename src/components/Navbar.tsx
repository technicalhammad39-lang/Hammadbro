"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const menuItems = [
    { label: "Home", href: "/#home", sectionId: "home" },
    { label: "About", href: "/#about", sectionId: "about" },
    { label: "Service", href: "/#services", sectionId: "services" },
    { label: "Resume", href: "/HammadGfx-CV.pdf", download: true },
    { label: "Project", href: "/#projects", sectionId: "projects" },
    { label: "Contact", href: "/#contact", sectionId: "contact" },
];

const Navbar = () => {
    const [selected, setSelected] = useState("Home");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isNavVisible, setIsNavVisible] = useState(true);
    const lastScrollY = useRef(0);
    const isNavVisibleRef = useRef(true);
    const ticking = useRef(false);
    const frame = useRef<number | null>(null);
    const scrollStopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        lastScrollY.current = window.scrollY;

        const updateNavVisibility = (visible: boolean) => {
            if (isNavVisibleRef.current === visible) {
                return;
            }

            isNavVisibleRef.current = visible;
            setIsNavVisible(visible);
        };

        const showAfterScrollStops = () => {
            if (scrollStopTimer.current) {
                clearTimeout(scrollStopTimer.current);
            }

            scrollStopTimer.current = setTimeout(() => {
                updateNavVisibility(true);
            }, 180);
        };

        const handleScroll = () => {
            if (ticking.current) {
                return;
            }

            ticking.current = true;

            frame.current = requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;

                if (currentScrollY <= 12 || currentScrollY < lastScrollY.current - 4) {
                    updateNavVisibility(true);
                } else if (currentScrollY > lastScrollY.current + 6) {
                    updateNavVisibility(false);
                    setIsMobileMenuOpen((open) => (open ? false : open));
                }

                lastScrollY.current = currentScrollY;
                ticking.current = false;
                frame.current = null;
                showAfterScrollStops();
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (frame.current) {
                cancelAnimationFrame(frame.current);
            }
            if (scrollStopTimer.current) {
                clearTimeout(scrollStopTimer.current);
            }
        };
    }, []);

    useEffect(() => {
        const sectionItems = menuItems.filter((item) => item.sectionId);
        const sections = sectionItems
            .map((item) => ({ ...item, element: document.getElementById(item.sectionId!) }))
            .filter((item): item is typeof item & { element: HTMLElement } => Boolean(item.element));

        if (!sections.length) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                if (!visible) {
                    return;
                }

                const activeItem = sections.find((item) => item.element === visible.target);
                if (activeItem) {
                    setSelected(activeItem.label);
                }
            },
            {
                rootMargin: "-34% 0px -48% 0px",
                threshold: [0.12, 0.25, 0.45, 0.65],
            },
        );

        sections.forEach((item) => observer.observe(item.element));

        return () => observer.disconnect();
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleMenuClick = (label: string) => {
        setSelected(label);
        setIsMobileMenuOpen(false);
        setIsNavVisible(true);
    };

    return (
        <>
        <nav className={`site-nav-load fixed left-4 right-4 top-4 mx-auto h-[58px] w-auto max-w-[1298px] bg-[#171717] px-5 text-white sm:top-6 sm:h-[64px] sm:px-8 md:h-[66px] md:px-2.5 lg:h-[72px] rounded-[25px] sm:rounded-[35px] lg:rounded-[50px] backdrop-blur-[15px] border border-white flex items-center justify-between z-50 transition-transform duration-300 ease-out ${isNavVisible ? 'translate-y-0' : '-translate-y-[140%]'}`}>
            {/* Left Menu (Desktop) */}
            <div className="hidden md:flex flex-1 justify-start gap-1 lg:gap-2.5">
                {menuItems.slice(0, 3).map((item) => (
                    <a
                        key={item.label}
                        className={`w-[90px] lg:w-[128px] h-[50px] lg:h-[56px] flex items-center justify-center rounded-[60px] text-sm lg:text-base font-medium transition-all duration-300 ease-out ${selected === item.label ? 'scale-[1.02] bg-[#FD853A] font-bold shadow-[0_0_22px_rgba(253,133,58,0.35)]' : 'bg-transparent hover:bg-[#232323]'}`}
                        href={item.href}
                        download={item.download}
                        onClick={() => handleMenuClick(item.label)}
                    >
                        {item.label}
                    </a>
                ))}
            </div>

            {/* Logo */}
            <Link href="/#home" onClick={() => handleMenuClick("Home")} className="flex items-center justify-center flex-shrink-0 cursor-pointer">
                <Image
                    src="/logo.webp"
                    alt="Hammad GFX logo"
                    width={96}
                    height={75}
                    className="h-auto w-12 object-contain sm:w-14 lg:w-16"
                    style={{ height: 'auto' }}
                    priority
                />
            </Link>

            {/* Right Menu (Desktop) */}
            <div className="hidden md:flex flex-1 justify-end gap-1 lg:gap-4">
                {menuItems.slice(3).map((item) => (
                    <a
                        key={item.label}
                        className={`w-[90px] lg:w-[128px] h-[50px] lg:h-[56px] flex items-center justify-center rounded-[60px] text-sm lg:text-base font-medium transition-all duration-300 ease-out ${selected === item.label ? 'scale-[1.02] bg-[#FD853A] font-bold shadow-[0_0_22px_rgba(253,133,58,0.35)]' : 'bg-transparent hover:bg-[#232323]'}`}
                        href={item.href}
                        download={item.download}
                        onClick={() => handleMenuClick(item.label)}
                    >
                        {item.label}
                    </a>
                ))}
            </div>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[#FD853A] hover:bg-[#e67a2e] transition-colors"
                onClick={toggleMobileMenu}
            >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="absolute top-[100%] left-0 right-0 mt-2 bg-[#171717] rounded-[25px] border border-white backdrop-blur-[15px] md:hidden z-40"
                    data-lenis-prevent-touch
                >
                    <div className="flex flex-col p-4 gap-2">
                        {menuItems.map((item) => (
                            <a
                                key={item.label}
                                className={`w-full h-[50px] flex items-center justify-center rounded-[25px] text-base font-medium transition-all duration-300 ease-out ${selected === item.label ? 'bg-[#FD853A] font-bold shadow-[0_0_18px_rgba(253,133,58,0.3)]' : 'bg-transparent hover:bg-[#232323]'}`}
                                href={item.href}
                                download={item.download}
                                onClick={() => handleMenuClick(item.label)}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
        <div className="h-[58px] w-full shrink-0 sm:h-[64px] md:h-[66px] lg:h-[72px]" aria-hidden="true" />
        </>
    )
}

export default Navbar;
