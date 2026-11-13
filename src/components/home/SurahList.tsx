import { Surah } from "@/types/Surah";
import { useMemo, useState } from "react";
import { HiSearch } from "react-icons/hi";
import SurahCard from "./SurahCard";
import SurahCardLoading from "./SurahCardLoading";

const FIRST = 12;

interface SurahListProps {
    surahs: Surah[] | undefined;
    isLoading: boolean;
    error: string | undefined;
}

export default function SurahList({ surahs, isLoading, error }: SurahListProps) {
    const [query, setQuery] = useState("");
    const [showAll, setShowAll] = useState(false);

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!surahs) return [];
        if (!q) return surahs;
        return surahs.filter((s) =>
            s.number === q ||
            s.name_id.toLowerCase().includes(q) ||
            s.translation_id.toLowerCase().includes(q)
        );
    }, [surahs, query]);

    const searching = query.trim() !== "";
    const visible = searching || showAll ? results : results.slice(0, FIRST);

    return (
        <section id="surah" aria-labelledby="surah-title" className="bg-paper py-20 md:py-28">
            <div className="wrap">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h2 id="surah-title" className="text-3xl font-bold tracking-tight md:text-4xl">114 surah Al-Qur&apos;an</h2>
                        <p className="mt-2 max-w-md text-muted">Teks Arab, transliterasi, terjemahan bahasa Indonesia, dan tafsir singkat setiap surah.</p>
                    </div>
                    <div className="w-full md:w-80">
                        <label htmlFor="cari-surah" className="mb-1.5 block text-sm font-medium text-muted">Cari surah</label>
                        <div className="flex items-center gap-2 rounded-xl border border-line bg-surface px-4 transition-colors focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/25">
                            <HiSearch aria-hidden="true" className="h-5 w-5 text-muted" />
                            <input
                                id="cari-surah"
                                type="search"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Nama, arti, atau nomor"
                                className="min-h-12 w-full bg-transparent outline-none placeholder:text-muted"
                            />
                        </div>
                    </div>
                </div>

                {error ? (
                    <p role="alert" className="mt-10 rounded-xl border border-danger/30 bg-danger/5 p-5 text-danger">
                        Daftar surah belum bisa dimuat ({error}). Coba muat ulang halaman.
                    </p>
                ) : (
                    <>
                        <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {isLoading
                                ? Array.from({ length: 6 }, (_, i) => <SurahCardLoading key={i} />)
                                : visible.map((s) => <SurahCard key={s.number} surah={s} />)}
                        </ul>

                        {searching && results.length === 0 && (
                            <div className="mt-6 rounded-2xl border border-dashed border-line p-8 text-center">
                                <p className="font-semibold">Tidak ada surah yang cocok dengan &ldquo;{query}&rdquo;.</p>
                                <button type="button" onClick={() => setQuery("")} className="btn btn-secondary mt-4">Hapus pencarian</button>
                            </div>
                        )}

                        {!searching && !isLoading && results.length > FIRST && (
                            <div className="mt-10 flex justify-center">
                                <button type="button" onClick={() => setShowAll((v) => !v)} className="btn btn-secondary" aria-expanded={showAll}>
                                    {showAll ? "Tampilkan lebih sedikit" : `Tampilkan ${results.length - FIRST} surah lainnya`}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
