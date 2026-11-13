import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import Logo from "./Logo";

const LINKS = [
    { href: "/#jadwal", label: "Jadwal sholat" },
    { href: "/#ayat", label: "One Day One Ayat" },
    { href: "/#surah", label: "Al-Qur'an" },
    { href: "/#android", label: "Android" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [showTop, setShowTop] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 24);
            setShowTop(window.scrollY > 900);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    const solid = scrolled || open;

    return (
        <>
            <a href="#konten" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-surface focus:px-5 focus:py-3 focus:font-semibold focus:text-ink">
                Langsung ke konten
            </a>
            <header
                className={`fixed inset-x-0 top-0 z-50 transition-colors duration-200 ${solid ? "bg-paper/95 text-ink shadow-[0_1px_0_var(--color-line)] backdrop-blur" : "on-dark bg-transparent text-white"}`}
            >
                <nav aria-label="Navigasi utama" className="wrap flex h-16 items-center justify-between">
                    <Link href="/" className="flex min-h-11 items-center" onClick={() => setOpen(false)}>
                        <Logo />
                    </Link>
                    <ul className="hidden items-center gap-8 md:flex">
                        {LINKS.map((l) => (
                            <li key={l.href}>
                                <Link href={l.href} className="flex min-h-11 items-center font-medium opacity-90 transition-opacity hover:opacity-100">
                                    {l.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <button
                        type="button"
                        className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full md:hidden"
                        aria-expanded={open}
                        aria-controls="menu-utama"
                        aria-label={open ? "Tutup menu" : "Buka menu"}
                        onClick={() => setOpen((v) => !v)}
                    >
                        {open ? <HiX className="h-6 w-6" /> : <HiMenuAlt3 className="h-6 w-6" />}
                    </button>
                </nav>
                <div id="menu-utama" hidden={!open} className="md:hidden">
                    <ul className="wrap flex h-[calc(100svh-4rem)] flex-col gap-2 pt-6">
                        {LINKS.map((l) => (
                            <li key={l.href}>
                                <Link href={l.href} onClick={() => setOpen(false)} className="flex min-h-14 items-center border-b border-line text-2xl font-semibold">
                                    {l.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </header>
            <button
                type="button"
                aria-label="Kembali ke atas"
                onClick={() => window.scrollTo({ top: 0 })}
                className={`fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-night text-brand shadow-lg transition-all duration-200 hover:-translate-y-0.5 ${showTop ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
                tabIndex={showTop ? 0 : -1}
            >
                <IoIosArrowUp className="h-6 w-6" />
            </button>
        </>
    );
}
