import AyatContainer from "@/components/home/AyatContainer";
import Dropdown from "@/components/home/Dropdown";
import PrayerCard from "@/components/home/PrayerCard";
import { ayatService } from "@/services/ayatService";
import { prayerService } from "@/services/prayerService";
import getTimesNow from "@/utils/helper";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

export default function Home() {

  const [idLocation,setIdLocation] = useState<string>('1301');

  const { data: location, isError: isErrorLocation, error: errorLocation } = useQuery({
    queryKey: ['location'],
    queryFn: prayerService.getAllLocation,
    refetchOnWindowFocus: false
  });

  const { data: ayat, isLoading: isLoadingAyat, isError: isErrorAyat, error: errorAyat } = useQuery({
    queryKey: ['ayat'],
    queryFn: ayatService.getOneAyat,
    refetchOnWindowFocus: false
  });

  const { data: prayerTimes, isLoading: isLoadingPrayerTimes, isError: isErrorPrayer, error: errorPrayer } = useQuery({
    queryKey: ['prayerTimes',idLocation],
    queryFn: () => prayerService.getPrayerTimes(idLocation, getTimesNow()),
    refetchOnWindowFocus: false,
    enabled: idLocation !== null
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
          <div className="flex items-center justify-between">
            <h2 className="text-4xl text-left font-bold">Prayer Time</h2>
            <Dropdown isError={isErrorLocation} error={errorLocation?.message} idLocation={idLocation} setIdLocation={setIdLocation} locations={location}/>
          </div>

          <div className="grid grid-cols-5 gap-4 mt-10">
            <PrayerCard title="Subuh" time={prayerTimes?.subuh} isLoading={isLoadingPrayerTimes} isError={isErrorPrayer} error={errorPrayer?.message} />
            <PrayerCard title="Dzuhur" time={prayerTimes?.dzuhur} isLoading={isLoadingPrayerTimes} isError={isErrorPrayer} error={errorPrayer?.message} />
            <PrayerCard title="Ashar" time={prayerTimes?.ashar} isLoading={isLoadingPrayerTimes} isError={isErrorPrayer} error={errorPrayer?.message} />
            <PrayerCard title="Maghrib" time={prayerTimes?.maghrib} isLoading={isLoadingPrayerTimes} isError={isErrorPrayer} error={errorPrayer?.message} />
            <PrayerCard title="Isya" time={prayerTimes?.isya} isLoading={isLoadingPrayerTimes} isError={isErrorPrayer} error={errorPrayer?.message} />
          </div>
        </div>
      </div>

      <div className="bg-[#F5F5F5] py-16 px-10 md:px-30">
        <div className="flex items-center justify-center space-x-30">
        <Image alt="wireframe_app" src={'/wireframe_app.png'} height={300} width={300} />
          <div className="-mt-10 text-left">
            <h1 className="font-bold text-4xl">Get The App</h1>
            <h3 className="font-medium text-2xl">Read the Quran anytime with audio <br /> and get notified for every prayer time</h3>
            <button className="bg-gray-400 cursor-not-allowed text-white rounded-4xl py-4 px-2 w-full text-xl mt-5">Coming Soon</button>
          </div>
        </div>
      </div>
    </div>
  );
}