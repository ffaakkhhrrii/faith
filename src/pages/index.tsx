import Seo from "@/components/Seo";
import DailyAyat from "@/components/home/DailyAyat";
import AndroidApp from "@/components/home/AndroidApp";
import Hero from "@/components/home/Hero";
import PrayerSection from "@/components/home/PrayerSection";
import SurahList from "@/components/home/SurahList";
import { useCity } from "@/hooks/useCity";
import { useDailyAyat } from "@/hooks/useDailyAyat";
import { useLocation } from "@/hooks/useLocation";
import { useNow } from "@/hooks/useNow";
import { usePrayerTimes } from "@/hooks/usePrayerTime";
import { useSurah } from "@/hooks/useSurah";

export default function Home() {
  const [city, setCity] = useCity();
  const now = useNow();

  const { data: locations } = useLocation();
  const prayer = usePrayerTimes(city);
  const surahs = useSurah();
  const ayat = useDailyAyat(surahs.data, now);

  return (
    <>
      <Seo
        title="Faith"
        description="Waktu sholat untuk kota di seluruh Indonesia, satu ayat setiap hari, dan 114 surah Al-Qur'an dengan terjemahan bahasa Indonesia."
      />
      <Hero prayer={prayer.data} now={now} isError={prayer.isError} />
      <PrayerSection
        prayer={prayer.data}
        locations={locations}
        city={city}
        onCityChange={setCity}
        now={now}
        isLoading={prayer.isLoading || !city}
        error={prayer.error?.message}
      />
      <DailyAyat ayat={ayat.data} isLoading={ayat.isLoading || !ayat.data} error={ayat.error?.message ?? surahs.error?.message} />
      <SurahList surahs={surahs.data} isLoading={surahs.isLoading} error={surahs.error?.message} />
      <AndroidApp />
    </>
  );
}
