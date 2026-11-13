import Seo from "@/components/Seo";
import { useAllAyat, useOneSurah, useSurah } from "@/hooks/useSurah";
import { AyatDetail } from "@/types/AyatDetail";
import { Surah } from "@/types/Surah";
import { formatRevelation } from "@/utils/helper";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { HiCheck, HiChevronLeft, HiChevronRight, HiOutlineClipboardCopy } from "react-icons/hi";
import { useInView } from "react-intersection-observer";

const BISMILLAH = "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ";

function Neighbour({ surah, dir }: { surah: Surah | undefined; dir: "prev" | "next" }) {
    if (!surah) return <span />;
    const prev = dir === "prev";
    return (
        <Link
            href={`/surah/${surah.number}`}
            className={`flex min-h-11 items-center gap-1 font-semibold text-white/85 hover:text-brand ${prev ? "" : "justify-end text-right"}`}
        >
            {prev && <HiChevronLeft aria-hidden="true" className="h-5 w-5" />}
            <span><span className="sr-only">{prev ? "Surah sebelumnya: " : "Surah berikutnya: "}</span>{surah.number}. {surah.name_id}</span>
            {!prev && <HiChevronRight aria-hidden="true" className="h-5 w-5" />}
        </Link>
    );
}

function Verse({ verse, surahName, surahNumber }: { verse: AyatDetail; surahName: string; surahNumber: string }) {
    const [copied, setCopied] = useState(false);
    const copy = async () => {
        try {
            await navigator.clipboard.writeText(`${verse.arab}\n\n${verse.text}\n(QS. ${surahName} ${surahNumber}:${verse.ayah})`);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
        } catch { /* clipboard blocked */ }
    };

    return (
        <article id={`ayat-${verse.ayah}`} className="scroll-mt-24 border-b border-line py-8 first:pt-2 target:bg-accent-soft/60">
            <div className="flex items-center justify-between gap-4">
                <a
                    href={`#ayat-${verse.ayah}`}
                    aria-label={`Tautan ke ayat ${verse.ayah}`}
                    className="flex h-11 min-w-11 items-center justify-center rounded-full border border-accent/40 px-3 font-bold text-accent tabular-nums hover:bg-accent-soft"
                >
                    {verse.ayah}
                </a>
                <button type="button" onClick={copy} className="flex min-h-11 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-muted hover:bg-sand hover:text-ink">
                    {copied ? <HiCheck aria-hidden="true" className="h-5 w-5 text-accent" /> : <HiOutlineClipboardCopy aria-hidden="true" className="h-5 w-5" />}
                    <span aria-live="polite">{copied ? "Tersalin" : "Salin"}</span>
                </button>
            </div>
            <p lang="ar" className="arabic mt-4 text-right text-3xl md:text-4xl">{verse.arab}</p>
            <p className="mt-5 italic text-muted">{verse.latin}</p>
            <p className="mt-3 text-lg leading-relaxed">{verse.text}</p>
        </article>
    );
}

export default function SurahDetail() {
    const router = useRouter();
    const { id } = router.query;

    const { data: surah, isLoading: isLoadingSurah, isError: isErrorSurah, error: errorSurah } = useOneSurah(id);
    const { data: allSurah } = useSurah();
    const totalAyat = Number(surah?.number_of_verses);
    const number = Number(id);
    const prev = allSurah?.find((s) => Number(s.number) === number - 1);
    const next = allSurah?.find((s) => Number(s.number) === number + 1);

    const {
        data: ayatPages,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isError: isErrorAyat,
        error: errorAyat,
        isLoading: isLoadingAyat
    } = useAllAyat(id, totalAyat);

    const verses = ayatPages?.pages.flatMap((page) => page.data) ?? [];
    const { ref: loaderRef, inView } = useInView({ rootMargin: "600px" });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    // A link to #ayat-n loads pages until verse n exists, then scrolls to it once.
    const scrolledTo = useRef<string | null>(null);
    useEffect(() => {
        const match = window.location.hash.match(/^#ayat-(\d+)$/);
        if (!match || scrolledTo.current === window.location.hash) return;
        const wanted = Number(match[1]);
        if (verses.length >= wanted) {
            document.getElementById(`ayat-${wanted}`)?.scrollIntoView();
            scrolledTo.current = window.location.hash;
        } else if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [verses.length, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const name = surah?.name_id ?? "";
    const showBismillah = surah && number !== 1 && number !== 9;

    if (isErrorSurah) {
        return (
            <section className="wrap flex min-h-[70svh] flex-col items-start justify-center gap-4 pt-24">
                <h1 className="text-3xl font-bold">Surah belum bisa dimuat</h1>
                <p role="alert" className="text-danger">{errorSurah?.message || "Terjadi kesalahan."}</p>
                <Link href="/#surah" className="btn btn-secondary">Kembali ke daftar surah</Link>
            </section>
        );
    }

    return (
        <>
            <Seo
                title={surah ? `Surah ${surah.name_id} (${surah.number}): teks, terjemahan, dan tafsir · Faith` : "Surah · Faith"}
                description={surah ? `Baca Surah ${surah.name_id} (${surah.translation_id}), ${surah.number_of_verses} ayat, ${formatRevelation(surah.revelation_id)}, lengkap dengan terjemahan bahasa Indonesia dan tafsir.` : "Baca surah Al-Qur'an dengan terjemahan bahasa Indonesia."}
            />

            <section aria-labelledby="surah-title" className="on-dark bg-night text-white">
                <div className="wrap pb-10 pt-24 md:pb-14 md:pt-28">
                    <nav aria-label="Lokasi halaman">
                        <Link href="/#surah" className="link inline-flex min-h-11 items-center">← Semua surah</Link>
                    </nav>
                    {isLoadingSurah || !surah ? (
                        <div className="mt-6 space-y-4" aria-hidden="true">
                            <div className="h-14 w-56 animate-pulse rounded-lg bg-white/15" />
                            <div className="h-6 w-72 animate-pulse rounded-lg bg-white/10" />
                        </div>
                    ) : (
                        <div className="enter mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                            <div>
                                <h1 id="surah-title" className="text-4xl font-bold tracking-tight md:text-6xl">{surah.name_id}</h1>
                                {surah.translation_id !== surah.name_id && <p className="mt-2 text-xl text-white/85">{surah.translation_id}</p>}
                                <p className="mt-5 flex flex-wrap gap-2 text-sm">
                                    <span className="rounded-full border border-night-line px-3 py-1">Surah ke-{surah.number}</span>
                                    <span className="rounded-full border border-night-line px-3 py-1">{formatRevelation(surah.revelation_id)}</span>
                                    <span className="rounded-full border border-night-line px-3 py-1">{surah.number_of_verses} ayat</span>
                                </p>
                            </div>
                            <p lang="ar" className="arabic text-5xl text-brand md:text-7xl">{surah.name_long}</p>
                        </div>
                    )}
                    <div className="mt-10 grid grid-cols-2 gap-4 border-t border-night-line pt-4">
                        <Neighbour surah={prev} dir="prev" />
                        <Neighbour surah={next} dir="next" />
                    </div>
                </div>
            </section>

            <section aria-label={`Ayat surah ${name}`} className="bg-paper py-12 md:py-16">
                <div className="wrap grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12">
                    <div>
                        {surah && (
                            <details className="mb-6 rounded-2xl border border-line bg-surface lg:hidden">
                                <summary className="flex min-h-12 cursor-pointer items-center px-5 font-semibold">Tentang surah {name}</summary>
                                <p className="px-5 pb-5 leading-relaxed text-muted">{surah.tafsir}</p>
                            </details>
                        )}

                        {showBismillah && (
                            <p lang="ar" className="arabic pb-4 text-center text-3xl text-accent">{BISMILLAH}</p>
                        )}

                        {isErrorAyat ? (
                            <p role="alert" className="rounded-xl border border-danger/30 bg-danger/5 p-5 text-danger">
                                Ayat belum bisa dimuat ({errorAyat.message}).
                            </p>
                        ) : isLoadingAyat || !surah ? (
                            <div className="space-y-6" aria-hidden="true">
                                {[0, 1, 2].map((i) => (
                                    <div key={i} className="space-y-3 border-b border-line py-8">
                                        <div className="ml-auto h-10 w-3/4 animate-pulse rounded-lg bg-line" />
                                        <div className="h-5 w-full animate-pulse rounded-lg bg-line" />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            verses.map((v) => <Verse key={v.ayah} verse={v} surahName={name} surahNumber={surah.number} />)
                        )}

                        <div ref={loaderRef} className="py-8 text-center text-muted" aria-live="polite">
                            {isFetchingNextPage ? "Memuat ayat berikutnya…" : !hasNextPage && verses.length > 0 ? `Akhir surah ${name}.` : ""}
                        </div>

                        {!hasNextPage && verses.length > 0 && (
                            <div className="grid gap-3 sm:grid-cols-2">
                                {prev ? (
                                    <Link href={`/surah/${prev.number}`} className="card-link rounded-2xl border border-line bg-surface p-5">
                                        <span className="text-sm text-muted">Surah sebelumnya</span>
                                        <span className="mt-1 block text-lg font-semibold">{prev.number}. {prev.name_id}</span>
                                    </Link>
                                ) : <span />}
                                {next && (
                                    <Link href={`/surah/${next.number}`} className="card-link rounded-2xl border border-line bg-surface p-5 text-right">
                                        <span className="text-sm text-muted">Surah berikutnya</span>
                                        <span className="mt-1 block text-lg font-semibold">{next.number}. {next.name_id}</span>
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>

                    {surah && (
                        <aside aria-labelledby="tafsir-title" className="hidden lg:block">
                            <div className="sticky top-24 max-h-[calc(100svh-8rem)] overflow-y-auto rounded-2xl border border-line bg-surface p-6">
                                <h2 id="tafsir-title" className="text-xl font-bold">Tentang surah {name}</h2>
                                <p className="mt-3 leading-relaxed text-muted">{surah.tafsir}</p>
                            </div>
                        </aside>
                    )}
                </div>
            </section>
        </>
    );
}
