import Image from "next/image";
import { FaAndroid } from "react-icons/fa";
import { HiBell, HiBookmark, HiDownload, HiViewGrid, HiVolumeUp } from "react-icons/hi";

// Latest release asset: stays valid when a new version is published under the same file name (faith.apk).
// public/android-qr.svg encodes this same URL (regenerate it if the URL changes).
const APK_URL = "https://github.com/ffaakkhhrrii/faith-app/releases/latest/download/faith.apk";
const RELEASES_URL = "https://github.com/ffaakkhhrrii/faith-app/releases";

const FEATURES = [
    { icon: HiBell, title: "Pengingat sholat", text: "Notifikasi di setiap waktu sholat" },
    { icon: HiVolumeUp, title: "Murattal per ayat", text: "Dengarkan bacaan tiap ayat" },
    { icon: HiBookmark, title: "Bookmark ayat", text: "Tersimpan di ponsel, tanpa internet" },
    { icon: HiViewGrid, title: "Widget layar utama", text: "Ayat pilihan, berganti tiap hari" },
];

export default function AndroidApp() {
    return (
        <section id="android" aria-labelledby="android-title" className="bg-paper pb-20 md:pb-28">
            <div className="wrap">
                <div className="grid gap-10 rounded-3xl border border-line bg-surface p-7 md:p-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
                    <div>
                        <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent">
                            <FaAndroid aria-hidden="true" className="h-5 w-5" />
                            Aplikasi Android
                        </p>
                        <h2 id="android-title" className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                            Faith sekarang ada di Android
                        </h2>
                        <p className="mt-3 max-w-xl text-muted md:text-lg">
                            Semua yang ada di sini, ditambah fitur yang hanya bisa di ponsel. Tanpa akun.
                        </p>

                        <ul className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                            {FEATURES.map(({ icon: Icon, title, text }) => (
                                <li key={title} className="flex items-center gap-4">
                                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                                        <Icon aria-hidden="true" className="h-5 w-5" />
                                    </span>
                                    <span>
                                        <span className="block font-semibold">{title}</span>
                                        <span className="block text-sm text-muted">{text}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <a href={APK_URL} className="btn btn-primary">
                                <HiDownload aria-hidden="true" className="h-5 w-5" />
                                Unduh APK
                            </a>
                            <a href={RELEASES_URL} target="_blank" rel="noreferrer" className="link inline-flex min-h-11 items-center justify-center px-2">
                                Lihat rilis di GitHub
                            </a>
                        </div>
                        <p className="mt-4 text-sm text-muted">Versi 1.0.0 · 17 MB · Android 7.0 ke atas</p>
                    </div>

                    <div className="hidden flex-col items-center rounded-2xl bg-sand p-6 text-center lg:flex">
                        <Image src="/android-qr.svg" alt="Kode QR untuk mengunduh APK Faith" width={200} height={200} className="rounded-xl bg-white p-2" />
                        <p className="mt-4 font-semibold">Pindai dengan ponsel</p>
                        <p className="mt-1 max-w-[13rem] text-sm text-muted">Arahkan kamera Android ke kode ini untuk mengunduh APK.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
