import { useAllAyat, useOneSurah } from "@/hooks/useSurah";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaBookOpen, FaLocationDot } from "react-icons/fa6";
import { IoIosInformationCircle } from "react-icons/io";
import { useInView } from "react-intersection-observer";

export default function SurahDetail() {
    const router = useRouter();
    const { id } = router.query;

    const { data: surahData, isLoading: isLoadinSurahData, isError: isErrorSurahData, error: errorSurahData } = useOneSurah(id);
    const totalAyat = surahData?.number_of_verses;

    const {
        data: ayatPages,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isError: isErrorAyatData,
        error: errorAyatData,
        isLoading: isLoadingAyatData
    } = useAllAyat(id, Number(totalAyat));

    const ayatData = ayatPages?.pages.flatMap((page) => page.data);

    const { ref: loaderRef, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (isErrorSurahData) {
        return (
            <div className="min-h-screen flex justify-center items-center text-red-600 text-xl font-semibold">
                Gagal memuat data surah: {errorSurahData?.message || 'Terjadi kesalahan.'}
            </div>
        );
    }

    return (
        <div className="bg-[#F5F5F5] min-h-screen">
            <div className="bg-[#1F2125] pt-16 pb-10 px-10 md:px-30">
                <div className="flex flex-col justify-center items-center space-y-3 pt-[20%] md:pt-[4%]">
                    {
                        isLoadinSurahData ? (<div className="space-y-3">
                            <div className="bg-white/40 px-2 py-5 rounded-xl w-40 animate-pulse"></div>
                            <div className="bg-white/40 px-2 py-5 rounded-xl w-40 animate-pulse"></div>
                            <div className="bg-white/40 px-2 py-5 rounded-xl w-40 animate-pulse"></div>
                        </div>) : (
                            <>
                                <h1 className="text-5xl font-medium text-white">{surahData?.name_long}</h1>
                                <h1 className="text-2xl text-white">{surahData?.translation_en}</h1>
                                <div className="flex items-center space-x-6 text-white">
                                    <div className="flex items-center space-x-1">
                                        <FaLocationDot />
                                        <p className="text-lg">{surahData?.revelation_id}</p>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <IoIosInformationCircle />
                                        <p className="text-lg">{surahData?.number_of_verses}</p>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <FaBookOpen />
                                        <p className="text-lg">{surahData?.name_id}</p>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
            <div className="flex flex-col-reverse md:grid md:grid-cols-3 md:gap-2 px-10 md:px-30 items-start py-10">
                <div className="bg-white shadow-sm mt-5 md:mt-0 rounded-lg col-span-2">
                    {
                        isErrorAyatData ? (<h1 className="mt-5 text-red-600 text-center font-medium text-lg">{errorAyatData.message}</h1>)
                            : isLoadingAyatData ? (
                                <div className="flex items-center justify-center mt-4">
                                    <div className="bg-black/40 px-2 text-center py-3 rounded-xl w-40 animate-pulse"></div>
                                </div>
                            ) :
                                ayatData?.map((e) => (
                                    <div key={e?.ayah} className="border-b border-black py-5 px-5">
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0 md:space-x-10">

                                            <div className="flex-1">
                                                <h1 className="text-2xl md:text-4xl font-medium text-black text-right break-words leading-relaxed">
                                                    {e?.arab}
                                                </h1>
                                            </div>

                                            <div className="self-end md:self-center md:order-first">
                                                <div className="flex items-center justify-center bg-black px-4 py-2 rounded-full w-fit">
                                                    <span className="font-bold text-white text-lg">{e?.ayah}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-base mt-4">{e?.text}</p>
                                    </div>
                                ))
                    }
                    <div ref={loaderRef} className="text-center py-5 text-gray-500">
                        {isFetchingNextPage ? 'Memuat...' : hasNextPage ? 'Scroll untuk memuat lagi...' : 'Semua ayat telah dimuat'}
                    </div>
                </div>
                <div className="bg-white shadow-sm p-5 rounded-lg md:sticky top-5">
                    <h1 className="text-xl text-black font-medium">Tafsir</h1>
                    <p className="text-base">{surahData?.tafsir}</p>
                </div>
            </div>
        </div>
    );
}