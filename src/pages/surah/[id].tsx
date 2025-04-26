import { useAllAyat, useOneSurah } from "@/hooks/useSurah";
import { useRouter } from "next/router";
import { FaBookOpen, FaLocationDot } from "react-icons/fa6";
import { IoIosInformationCircle } from "react-icons/io";

export default function SurahDetail() {
    const router = useRouter();
    const { id } = router.query;

    const { data } = useOneSurah(id);

    const { data: ayatData } = useAllAyat(id, '1', '30');

    return (
        <div className="bg-[#F5F5F5]">
            <div className="bg-[#1F2125] pt-16 pb-10 px-10 md:px-30">
                <div className="flex flex-col justify-center items-center space-y-3 pt-[4%]">
                    <h1 className="text-5xl font-medium text-white">{data?.name_long}</h1>
                    <h1 className="text-2xl text-white">{data?.translation_en}</h1>
                    <div className="flex items-center space-x-6 text-white">
                        <div className="flex items-center space-x-1">
                            <FaLocationDot />
                            <p className="text-lg">{data?.revelation_id}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                            <IoIosInformationCircle />
                            <p className="text-lg">{data?.number_of_verses}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                            <FaBookOpen />
                            <p className="text-lg">{data?.name_id}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-2 px-10 md:px-30 items-start py-10">
                <div className="bg-white shadow-sm  rounded-lg col-span-2">
                    {
                        ayatData?.map((e) => (
                            <div key={e.ayah} className="border-b border-black py-5 px-5">
                                <div className="flex justify-between items-center space-x-10">
                                    <div className="flex items-center bg-black px-3 py-1 rounded-2xl">
                                        <h1 className="font-bold text-lg text-white">{e.ayah}</h1>
                                    </div>
                                    <div className="flex items-center">
                                        <h1 className="text-4xl font-medium text-black text-right break-words">{e?.arab}</h1>
                                    </div>
                                </div>
                                <p className="text-base mt-4">{e?.text}</p>
                            </div>
                        ))
                    }
                </div>
                <div className="bg-white shadow-sm p-5 rounded-lg sticky top-5">
                    <h1 className="text-xl text-black font-medium">Tafsir</h1>
                    <p className="text-base">{data?.tafsir}</p>
                </div>
            </div>
        </div>
    );
}