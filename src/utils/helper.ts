import { Prayer } from "@/types/Prayer";
import { Surah } from "@/types/Surah";

/** Today's date as YYYY-MM-DD in the visitor's local time zone. */
export function todayISO(date: Date = new Date()): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

const ACRONYMS = new Set(["DKI", "DI", "DIY", "NTB", "NTT"]);

/** "KOTA JAKARTA" -> "Kota Jakarta", "DKI JAKARTA" -> "DKI Jakarta". */
export function titleCase(text: string): string {
    return text
        .split(" ")
        .map((word) => ACRONYMS.has(word) ? word : word.toLowerCase().replace(/(^|[.\-(])([a-z])/g, (_, p, c) => p + c.toUpperCase()))
        .join(" ");
}

export function formatRevelation(revelation: string): string {
    return revelation.replace("Makkiyyah", "Makkiyah").replace("Madaniyyah", "Madaniyah");
}

export const PRAYERS = [
    { key: "subuh", label: "Subuh" },
    { key: "dzuhur", label: "Dzuhur" },
    { key: "ashar", label: "Ashar" },
    { key: "maghrib", label: "Maghrib" },
    { key: "isya", label: "Isya" },
] as const;

export type PrayerKey = (typeof PRAYERS)[number]["key"];

export interface NextPrayer {
    key: PrayerKey;
    label: string;
    time: string;
    minutesLeft: number;
    tomorrow: boolean;
}

const toMinutes = (hhmm: string) => {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
};

/** The first prayer after `now`; after Isya it is tomorrow's Subuh (today's time as the estimate). */
export function getNextPrayer(prayer: Prayer, now: Date): NextPrayer {
    const nowMin = now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60;
    for (const p of PRAYERS) {
        const t = toMinutes(prayer[p.key]);
        if (t > nowMin) return { ...p, time: prayer[p.key], minutesLeft: Math.ceil(t - nowMin), tomorrow: false };
    }
    const subuh = toMinutes(prayer.subuh);
    return { key: "subuh", label: "Subuh", time: prayer.subuh, minutesLeft: Math.ceil(24 * 60 - nowMin + subuh), tomorrow: true };
}

export function formatCountdown(minutes: number): string {
    if (minutes < 1) return "kurang dari 1 menit lagi";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    if (h === 0) return `${m} menit lagi`;
    return m === 0 ? `${h} jam lagi` : `${h} jam ${m} menit lagi`;
}

export function formatGregorian(date: Date): string {
    return new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(date);
}

export function formatHijri(date: Date): string {
    try {
        return new Intl.DateTimeFormat("id-ID-u-ca-islamic-umalqura", { day: "numeric", month: "long", year: "numeric" })
            .format(date)
            .replace(/\s?(SH|AH)$/i, " H");
    } catch {
        return "";
    }
}

/**
 * The verse of the day: the same verse for everyone on one calendar day, a different one the next.
 * Walks the 6,236 verses with a fixed stride so consecutive days land far apart.
 */
export function dailyVerseRef(surahs: Surah[], date: Date = new Date()): { surah: number; ayah: number } {
    const total = surahs.reduce((sum, s) => sum + Number(s.number_of_verses), 0);
    const day = Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000);
    let index = (day * 2963) % total;
    for (const s of surahs) {
        const n = Number(s.number_of_verses);
        if (index < n) return { surah: Number(s.number), ayah: index + 1 };
        index -= n;
    }
    return { surah: 1, ayah: 1 };
}
