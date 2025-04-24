import AyatContainer from "@/components/home/AyatContainer";
import PrayerCard from "@/components/home/PrayerCard";
import { ayatService } from "@/services/ayatService";
import { prayerService } from "@/services/prayerService";
import getTimesNow from "@/utils/helper";
import { useQuery } from "@tanstack/react-query";

export default function Home() {

  const { data: ayat,isLoading: isLoadingAyat, isError: isErrorAyat, error: errorAyat } = useQuery({
    queryKey: ['ayat'],
    queryFn: ayatService.getOneAyat,
    refetchOnWindowFocus: false
  });

  const {data: prayerTimes,isLoading: isLoadingPrayerTimes,isError: isErrorPrayer, error: errorPrayer} = useQuery({
    queryKey: ['prayerTimes'],
    queryFn: ()=> prayerService.getPrayerTimes('1301',getTimesNow()),
    refetchOnWindowFocus: false
  });

  return (
    <div>
      <div className="relative h-screen bg-[url('/mosque.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/70 z-0" />

        <div className="relative space-y-3 flex justify-center items-center flex-col text-white text-3xl font-bold pt-[20%] z-10">
          <h1 className="text-white font-bold text-7xl">Faith</h1>
          <p className="text-2xl text-white font-medium">Connect with your faith, one day at a time</p>
        </div>
      </div>

      <div className="bg-[#F5F5F5] py-16 px-10 md:px-30">
        <AyatContainer ayat={ayat} isLoading={isLoadingAyat} isError={isErrorAyat} error={errorAyat?.message} />

        <div className="text-black mt-15">
          <h2 className="text-4xl text-left font-bold">Prayer Time <span className="font-light text-lg text-gray-600">{prayerTimes?.location}</span></h2>
          <div className="grid grid-cols-5 gap-4 mt-10">
            <PrayerCard title="Subuh" time={prayerTimes?.subuh} isLoading={isLoadingPrayerTimes} isError={isErrorPrayer} error={errorPrayer?.message} />
            <PrayerCard title="Dzuhur" time={prayerTimes?.dzuhur} isLoading={isLoadingPrayerTimes} isError={isErrorPrayer} error={errorPrayer?.message} />
            <PrayerCard title="Ashar" time={prayerTimes?.ashar} isLoading={isLoadingPrayerTimes} isError={isErrorPrayer} error={errorPrayer?.message} />
            <PrayerCard title="Maghrib" time={prayerTimes?.maghrib} isLoading={isLoadingPrayerTimes} isError={isErrorPrayer} error={errorPrayer?.message} />
            <PrayerCard title="Isya" time={prayerTimes?.isya} isLoading={isLoadingPrayerTimes} isError={isErrorPrayer} error={errorPrayer?.message} />
          </div>
        </div>
      </div>
    </div>
  );
}