import Image from "next/image";
import { Prayer } from "@/types/Prayer";
import { formatCountdown, formatGregorian, formatHijri, getNextPrayer, titleCase } from "@/utils/helper";

interface HeroProps {
    prayer: Prayer | undefined;
    now: Date | null;
    isError: boolean;
}

export default function Hero({ prayer, now, isError }: HeroProps) {
    const next = prayer && now ? getNextPrayer(prayer, now) : null;

    return (
        <section aria-labelledby="hero-title" className="on-dark relative isolate flex min-h-svh items-end overflow-hidden bg-night text-white">
            <Image src="/mosque.png" alt="" fill priority sizes="(orientation: portrait) 300vw, 100vw" className="settle -z-20 object-cover" />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(18,20,24,0.97)_10%,rgba(18,20,24,0.78)_55%,rgba(18,20,24,0.6))] md:bg-[linear-gradient(100deg,rgba(18,20,24,0.94)_25%,rgba(18,20,24,0.45)_70%,rgba(18,20,24,0.2))]" />

            <div className="wrap grid gap-10 pb-14 pt-28 md:pb-20 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16">
                <div>
                    <p className="enter min-h-6 text-white/85">
                        {now ? <>{formatGregorian(now)}<span className="mx-2 text-brand">·</span>{formatHijri(now)}</> : null}
                    </p>
                    <h1 id="hero-title" className="enter enter-2 mt-4 max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                        Jadwal sholat dan <span className="whitespace-nowrap">Al-Qur&apos;an</span> untuk setiap harimu
                    </h1>
                    <p className="enter enter-3 mt-5 max-w-xl text-white/85 md:text-lg">
                        Waktu sholat untuk kota dan kabupaten di seluruh Indonesia, satu ayat untuk direnungkan setiap hari, dan 114 surah lengkap dengan terjemahan.
                    </p>
                    <div className="enter enter-3 mt-8 flex flex-col gap-3 sm:flex-row">
                        <a href="#surah" className="btn btn-primary">Baca Al-Qur&apos;an</a>
                        <a href="#jadwal" className="btn btn-secondary">Lihat jadwal sholat</a>
                    </div>
                </div>

                <div className="enter enter-3 rounded-2xl border border-white/15 bg-night/70 p-6 backdrop-blur-md" aria-live="polite">
                    <p className="text-sm font-semibold uppercase tracking-wider text-brand">Sholat berikutnya</p>
                    {next && prayer ? (
                        <>
                            <p className="mt-3 flex items-baseline justify-between gap-4">
                                <span className="text-2xl font-bold md:text-3xl">{next.label}{next.tomorrow ? " besok" : ""}</span>
                                <span className="text-3xl font-semibold tabular-nums md:text-4xl">{next.time}</span>
                            </p>
                            <p className="mt-2 text-white/85">{formatCountdown(next.minutesLeft)}</p>
                            <p className="mt-5 border-t border-white/15 pt-4 text-sm text-night-muted">
                                {titleCase(prayer.location)}, {titleCase(prayer.region)}
                            </p>
                        </>
                    ) : isError ? (
                        <p className="mt-3 text-white/85">Jadwal belum bisa dimuat. Coba muat ulang halaman.</p>
                    ) : (
                        <div className="mt-3 space-y-3" aria-hidden="true">
                            <div className="h-9 w-3/4 animate-pulse rounded-lg bg-white/15" />
                            <div className="h-5 w-1/2 animate-pulse rounded-lg bg-white/15" />
                            <div className="h-5 w-2/3 animate-pulse rounded-lg bg-white/10" />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
