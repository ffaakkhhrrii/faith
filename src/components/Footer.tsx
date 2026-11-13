import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
    return (
        <footer className="on-dark bg-night text-white">
            <div className="wrap grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
                <div>
                    <Logo />
                    <p className="mt-4 max-w-sm text-night-muted">
                        Jadwal sholat harian, satu ayat setiap hari, dan 114 surah Al-Qur&apos;an dengan terjemahan bahasa Indonesia.
                    </p>
                </div>
                <div>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-night-muted">Halaman</h2>
                    <ul className="mt-3">
                        <li><Link href="/#jadwal" className="flex min-h-11 items-center hover:text-brand">Jadwal sholat</Link></li>
                        <li><Link href="/#ayat" className="flex min-h-11 items-center hover:text-brand">One Day One Ayat</Link></li>
                        <li><Link href="/#surah" className="flex min-h-11 items-center hover:text-brand">Daftar surah</Link></li>
                        <li><Link href="/#android" className="flex min-h-11 items-center hover:text-brand">Aplikasi Android</Link></li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-night-muted">Sumber data</h2>
                    <p className="mt-2">
                        <a href="https://api.myquran.com/" target="_blank" rel="noreferrer" className="link inline-flex min-h-11 items-center">MyQuran API</a>
                    </p>
                    <p className="mt-2 text-night-muted">Jadwal sholat, teks Al-Qur&apos;an, terjemahan, dan tafsir.</p>
                </div>
            </div>
            <div className="border-t border-night-line">
                <p className="wrap py-5 text-sm text-night-muted">
                    © {new Date().getFullYear()} Faith · Dibuat oleh{" "}
                    <a href="https://fkzn.vercel.app" target="_blank" rel="noreferrer" className="link">Fakhri Zain</a>
                </p>
            </div>
        </footer>
    );
}
