import AyatContainer from "@/components/home/AyatContainer";
import Dropdown from "@/components/home/Dropdown";
import PrayerCard from "@/components/home/PrayerCard";
import SurahCard from "@/components/home/SurahCard";
import SurahCardLoading from "@/components/home/SurahCardLoading";
import { useLocation } from "@/hooks/useLocation";
import { useOneAyat } from "@/hooks/useOneAyat";
import { usePrayerTimes } from "@/hooks/usePrayerTime";
import { useSurah } from "@/hooks/useSurah";
import { Surah } from "@/types/Surah";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

export default function Home() {

  const [idLocation, setIdLocation] = useState<string>('1301');
  const [searchText, setSearchText] = useState("");

  const router = useRouter();

  const [visibleCount, setVisibleCount] = useState(15);

  const { data: location, isError: isErrorLocation, error: errorLocation } = useLocation();

  const { data: ayat, isLoading: isLoadingAyat, isError: isErrorAyat, error: errorAyat } = useOneAyat();

  const { data: surah, isLoading: isLoadingSurah, isError: isErrorSurah, error: errorSurah } = useSurah();

  const { data: prayerTimes, isLoading: isLoadingPrayerTimes, isError: isErrorPrayer, error: errorPrayer } = usePrayerTimes(idLocation);

  const surahSearch : Surah[] | undefined = useMemo(() => {
    const filteredSurah = surah?.filter(sur => sur?.name_id.toLowerCase().includes(searchText.toLowerCase()));
    return filteredSurah;
  }, [surah, searchText]);

  return (
    <div>
      <div className="relative h-screen bg-[url('/mosque.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/70 z-0" />

        <div className="relative space-y-3 flex justify-center items-center flex-col text-white text-3xl font-bold text-center pt-[70%] md:pt-[20%] z-10">
          <h1 className="text-white font-bold text-5xl md:text-7xl">Faith</h1>
          <p className="text-2xl text-white font-medium">Connect with your faith, one day at a time</p>
        </div>
      </div>

      <div className="py-16 px-10 md:px-30">
        <AyatContainer ayat={ayat} isLoading={isLoadingAyat} isError={isErrorAyat} error={errorAyat?.message} />

        <div className="text-black mt-15">
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-4xl text-left font-bold">Prayer Time</h2>
            <Dropdown isError={isErrorLocation} error={errorLocation?.message} idLocation={idLocation} setIdLocation={setIdLocation} locations={location} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-10">
            <PrayerCard title="Subuh" time={prayerTimes?.subuh} isLoading={isLoadingPrayerTimes} isError={isErrorPrayer} error={errorPrayer?.message} />
            <PrayerCard title="Dzuhur" time={prayerTimes?.dzuhur} isLoading={isLoadingPrayerTimes} isError={isErrorPrayer} error={errorPrayer?.message} />
            <PrayerCard title="Ashar" time={prayerTimes?.ashar} isLoading={isLoadingPrayerTimes} isError={isErrorPrayer} error={errorPrayer?.message} />
            <PrayerCard title="Maghrib" time={prayerTimes?.maghrib} isLoading={isLoadingPrayerTimes} isError={isErrorPrayer} error={errorPrayer?.message} />
            <PrayerCard title="Isya" time={prayerTimes?.isya} isLoading={isLoadingPrayerTimes} isError={isErrorPrayer} error={errorPrayer?.message} />
          </div>
        </div>
      </div>

      <div className="py-16 px-10 md:px-30 bg-[#F5F5F5]">
        <h2 className="text-4xl text-left font-bold">Browse Surah</h2>
        <input onChange={(e) => setSearchText(e.target.value)} type="text" className="my-3 bg-white border border-gray-300 rounded-lg p-2 pl-4 outline-none w-full" placeholder="Search Surah"></input>
        <div className="grid md:grid-cols-3 gap-4">
          {
            isLoadingSurah ? (
              <SurahCardLoading />
            ) : isErrorSurah ? (
              <h1 className="mt-5 text-red-600 font-medium text-lg">{errorSurah.message}</h1>
            )
              :
              surahSearch?.slice(0, visibleCount).map((sur) => (
                <SurahCard onClick={() => {
                  router.push(`/surah/${sur.number}`);
                }} key={sur.number} title={sur.name_id} number={sur.number} translation={sur.translation_en} />
              ))
          }
          {surahSearch && visibleCount < surahSearch.length && (
            <div className="col-span-full text-center mt-6">
              <button
                onClick={() => setVisibleCount((prev) => prev + 30)}
                className="px-4 py-2 cursor-pointer bg-black text-white rounded-md"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="py-16 px-10 md:px-30">
        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-30">
          <Image alt="wireframe_app" src={'/wireframe_app.png'} height={300} width={300} />
          <div className="md:-mt-10 text-left">
            <h1 className="font-bold text-2xl md:text-4xl">Get The App</h1>
            <h3 className="font-medium text-xl md:text-2xl">Read the Quran anytime with audio <br /> and get notified for every prayer time</h3>
            <button className="bg-gray-400 cursor-not-allowed text-white rounded-4xl py-4 px-2 w-full text-xl mt-5">Coming Soon</button>
          </div>
        </div>
      </div>
    </div>
  );
}