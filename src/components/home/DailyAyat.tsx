import Link from "next/link";
import { Ayat } from "@/types/Ayat";

interface DailyAyatProps {
    ayat: Ayat | undefined;
    isLoading: boolean;
    error: string | undefined;
}

export default function DailyAyat({ ayat, isLoading, error }: DailyAyatProps) {
    return (
        <section id="ayat" aria-labelledby="ayat-title" className="bg-sand py-20 md:py-28">
            <div className="wrap grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
                <div>
                    <h2 id="ayat-title" className="text-3xl font-bold tracking-tight md:text-4xl">One Day One Ayat</h2>
                    <p className="mt-3 max-w-sm text-muted">Satu ayat yang sama untuk semua orang hari ini. Besok, ayat berikutnya.</p>
                    {ayat && (
                        <dl className="mt-8 grid max-w-xs grid-cols-3 gap-4 border-t border-line pt-6">
                            <div><dt className="text-sm text-muted">Surah</dt><dd className="font-semibold">{ayat.surahName}</dd></div>
                            <div><dt className="text-sm text-muted">Ayat</dt><dd className="font-semibold">{ayat.ayah}</dd></div>
                            <div><dt className="text-sm text-muted">Juz</dt><dd className="font-semibold">{ayat.juz}</dd></div>
                        </dl>
                    )}
                </div>

                <figure className="rounded-2xl border border-line bg-surface p-6 md:p-10">
                    {error ? (
                        <p role="alert" className="text-danger">Ayat hari ini belum bisa dimuat ({error}).</p>
                    ) : isLoading || !ayat ? (
                        <div className="space-y-4" aria-hidden="true">
                            <div className="ml-auto h-12 w-4/5 animate-pulse rounded-lg bg-line" />
                            <div className="h-5 w-full animate-pulse rounded-lg bg-line" />
                            <div className="h-5 w-2/3 animate-pulse rounded-lg bg-line" />
                        </div>
                    ) : (
                        <>
                            <p lang="ar" className="arabic text-right text-3xl md:text-4xl">{ayat.arab}</p>
                            <p className="mt-6 italic text-muted">{ayat.latin}</p>
                            <blockquote className="mt-4 text-lg leading-relaxed md:text-xl">{ayat.text}</blockquote>
                            <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                                <cite className="font-semibold not-italic">QS. {ayat.surahName} {ayat.surah}:{ayat.ayah}</cite>
                                <Link href={`/surah/${ayat.surah}#ayat-${ayat.ayah}`} className="link flex min-h-11 items-center">
                                    Baca surah {ayat.surahName} →
                                </Link>
                            </figcaption>
                        </>
                    )}
                </figure>
            </div>
        </section>
    );
}
