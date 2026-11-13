import { Location } from "@/types/Location";
import { Prayer } from "@/types/Prayer";
import { formatGregorian, getNextPrayer, PRAYERS, titleCase } from "@/utils/helper";
import CityPicker from "./CityPicker";

interface PrayerSectionProps {
    prayer: Prayer | undefined;
    locations: Location[] | undefined;
    city: string | null;
    onCityChange: (id: string) => void;
    now: Date | null;
    isLoading: boolean;
    error: string | undefined;
}

export default function PrayerSection({ prayer, locations, city, onCityChange, now, isLoading, error }: PrayerSectionProps) {
    const next = prayer && now ? getNextPrayer(prayer, now) : null;

    return (
        <section id="jadwal" aria-labelledby="jadwal-title" className="bg-paper py-20 md:py-28">
            <div className="wrap">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h2 id="jadwal-title" className="text-3xl font-bold tracking-tight md:text-4xl">Jadwal sholat hari ini</h2>
                        <p className="mt-2 min-h-6 text-muted">
                            {now ? formatGregorian(now) : ""}{prayer ? ` · ${titleCase(prayer.location)}` : ""}
                        </p>
                    </div>
                    <CityPicker locations={locations} value={city} onChange={onCityChange} />
                </div>

                {error ? (
                    <p role="alert" className="mt-10 rounded-xl border border-danger/30 bg-danger/5 p-5 text-danger">
                        Jadwal sholat belum bisa dimuat ({error}). Coba muat ulang halaman.
                    </p>
                ) : (
                    <ol className="mt-10 grid grid-cols-1 gap-3 lg:grid-cols-5">
                        {PRAYERS.map((p) => {
                            const isNext = next?.key === p.key && !next.tomorrow;
                            return (
                                <li
                                    key={p.key}
                                    className={`flex items-center justify-between rounded-2xl border p-5 lg:flex-col lg:items-start lg:gap-6 ${isNext ? "on-dark border-night bg-night text-white" : "border-line bg-surface"}`}
                                >
                                    <span className="flex items-center gap-2 font-semibold">
                                        {p.label}
                                        {isNext && <span className="rounded-full bg-brand px-2 py-0.5 text-xs font-bold text-night">Berikutnya</span>}
                                    </span>
                                    {isLoading || !prayer ? (
                                        <span aria-hidden="true" className="h-8 w-20 animate-pulse rounded-lg bg-line" />
                                    ) : (
                                        <span className="text-3xl font-semibold tabular-nums">{prayer[p.key]}</span>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                )}

                {prayer && (
                    <p className="mt-6 text-muted">
                        Imsak <span className="font-semibold text-ink tabular-nums">{prayer.imsak}</span>
                        <span aria-hidden="true" className="mx-2">·</span>
                        Terbit <span className="font-semibold text-ink tabular-nums">{prayer.terbit}</span>
                        <span aria-hidden="true" className="mx-2">·</span>
                        Dhuha <span className="font-semibold text-ink tabular-nums">{prayer.dhuha}</span>
                    </p>
                )}
            </div>
        </section>
    );
}
