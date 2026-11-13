import Link from "next/link";
import { Surah } from "@/types/Surah";
import { formatRevelation } from "@/utils/helper";

export default function SurahCard({ surah }: { surah: Surah }) {
    return (
        <li>
            <Link
                href={`/surah/${surah.number}`}
                className="card-link flex h-full items-center gap-4 rounded-2xl border border-line bg-surface p-5"
            >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft font-bold text-accent tabular-nums">
                    {surah.number}
                </span>
                <span className="min-w-0 flex-1">
                    <span className="block truncate text-lg font-semibold">{surah.name_id}</span>
                    <span className="block truncate text-muted">{surah.translation_id}</span>
                    <span className="mt-1 block text-sm text-muted">{surah.number_of_verses} ayat · {formatRevelation(surah.revelation_id)}</span>
                </span>
                <span lang="ar" className="arabic shrink-0 pl-1 text-xl text-ink sm:text-2xl">{surah.name_short}</span>
            </Link>
        </li>
    );
}
