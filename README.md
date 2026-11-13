# Faith

> A small Next.js web app for daily worship: today's prayer times for an Indonesian city, a verse of the day, and a Surah reader with Indonesian translation and tafsir.

![Language](https://img.shields.io/badge/language-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Version](https://img.shields.io/badge/version-0.1.0-blue?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-15.3.1-000000?style=flat-square&logo=nextdotjs&logoColor=white)

**Live demo:** <https://faith-sandy-pi.vercel.app>

***Connect with your faith, one day at a time.***

## Overview

Faith puts three things on one page: a verse to read, today's prayer schedule, and a way to browse the Quran. It is a frontend only. All content comes from the public [MyQuran API](https://api.myquran.com/) (v2), called directly from the browser. There is no backend, database, account system, or API key.

## Features

| Feature | Where | What it does |
| --- | --- | --- |
| Next prayer | Home hero | Shows the next prayer for the chosen city with a countdown, plus today's Gregorian and Hijri date. |
| Jadwal sholat | Home page | Today's Subuh, Dzuhur, Ashar, Maghrib, and Isya times (plus Imsak, Terbit, Dhuha), with the next one highlighted. Pick a city from a searchable list; the choice is remembered in the browser (default city ID `1301`, Kota Jakarta). |
| One Day One Ayat | Home page | One verse per calendar day, the same for every visitor on that date: Arabic, transliteration, translation, and a link to the verse in its Surah. |
| Daftar surah | Home page | All 114 Surahs with Arabic name, meaning, verse count, and Makkiyah/Madaniyah. Search by name, meaning, or number. |
| Android app | Home page | Download link for the [Faith Android app](https://github.com/ffaakkhhrrii/faith-app/releases) (latest release APK), with its app-only features: prayer reminders, per-verse audio, bookmarks, and a home-screen widget. |
| Surah detail | `/surah/[id]` | Arabic text, transliteration, and translation for every verse, the Surah's tafsir, previous/next Surah links, a copy button per verse, and `#ayat-n` links. Verses load 30 at a time as you scroll. |

The UI is in Indonesian.

## Getting started

### Prerequisites

- Node.js 18.18 or newer (required by Next.js 15)
- npm (the repository ships a `package-lock.json`)
- Internet access to `https://api.myquran.com`

No environment variables or credentials are needed.

### Installation

```bash
git clone https://github.com/ffaakkhhrrii/faith.git
cd faith
npm ci
```

## Usage

Start the development server:

```bash
npm run dev
```

Open <http://localhost:3000>. You should see the hero with the next prayer for Kota Jakarta, today's prayer times, the verse of the day, and the Surah list. Click a Surah card to open `/surah/<number>`.

### Available scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the Next.js dev server with hot reload. |
| `npm run build` | Creates a production build in `.next/`. |
| `npm start` | Serves the production build (run `npm run build` first). |
| `npm run lint` | Runs ESLint through `next lint`. |

There is no test suite yet.

## How it works

```text
page component ──> React Query hook ──> service (axios) ──> MyQuran API v2
```

| Path | Responsibility |
| --- | --- |
| [src/pages/index.tsx](src/pages/index.tsx) | Home page: hero, prayer times, verse of the day, Surah list. |
| [src/pages/surah/[id].tsx](src/pages/surah/%5Bid%5D.tsx) | Surah detail page with infinite scroll. |
| [src/hooks/](src/hooks/) | React Query hooks (`usePrayerTimes`, `useLocation`, `useDailyAyat`, `useSurah`, `useOneSurah`, `useAllAyat`) and browser state (`useCity`, `useNow`). |
| [src/services/](src/services/) | API calls and response mapping (`ayatService`, `prayerService`). |
| [src/utils/constant.ts](src/utils/constant.ts) | API base URL (`https://api.myquran.com/v2`). |
| [src/utils/helper.ts](src/utils/helper.ts) | Local date, next-prayer and countdown logic, verse-of-the-day selection, name formatting. |
| [src/styles/globals.css](src/styles/globals.css) | Design tokens (colours, fonts), container, buttons, focus ring, motion. |
| [src/components/](src/components/) | Layout, navbar, footer, SEO tags, and the home-page sections. |

MyQuran endpoints used:

| Endpoint | Used for |
| --- | --- |
| `/quran/ayat/{surah}/{ayah}` | Verse of the day |
| `/quran/surat/semua` | All Surahs |
| `/quran/surat/{id}` | One Surah's details and tafsir |
| `/quran/ayat/{id}/{start}-{end}` | A range of verses |
| `/sholat/kota/semua` | Prayer-time city list |
| `/sholat/jadwal/{cityId}/{YYYY-MM-DD}` | Prayer times for one city and date |

## Limitations

- The app depends on MyQuran being up. If a request fails, the section shows the error message in place of its content.
- Prayer times cover only the cities MyQuran lists (Indonesia). The city is not detected from your location; the last choice is kept in `localStorage`.
- The next-prayer countdown uses your device clock. If your device is in a different time zone from the chosen city (for example WIB device, WIT city), the countdown is off by that difference.
- Translation and tafsir text come from the API as-is.

## Deployment

The live demo is hosted on Vercel. Any host that can run `npm run build` and `npm start` works, since the app needs no environment variables.

## Credits

Quran and prayer-time data: [MyQuran API](https://api.myquran.com/).
