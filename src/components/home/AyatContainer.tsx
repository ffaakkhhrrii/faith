import { Ayat } from "@/types/Ayat";

interface AyatContainerProps {
    ayat: Ayat | undefined;
    isLoading: boolean;
    isError: boolean;
    error: string | undefined;
}

export default function AyatContainer({ ayat, isLoading, isError, error }: AyatContainerProps) {
    return (
        <div className="text-black flex flex-col justify-center items-center">
            <h2 className="text-4xl text-center font-bold">One Day One Ayat</h2>
            {
                isLoading ?
                    <>
                        <div className="bg-black/15 mt-5 py-5 rounded-lg w-1/4 shadow-black/30 animate-pulse"></div>
                        <div className="bg-black/15 py-3 mt-5 rounded-lg w-1/6 shadow-black/30 animate-pulse"></div>
                        <div className="bg-black/15 py-3 mt-5 rounded-lg w-1/7 shadow-black/30 animate-pulse"></div>
                    </>
                    : isError ? <h1 className="mt-5 text-red-600 font-medium text-lg">{error}</h1> :
                        <>
                            <p className="mt-8 text-center text-3xl md:text-5xl">{ayat?.arab}</p>
                            <p className="mt-5 text-center text:lg md:text-xl">{ayat?.text}</p>
                            <p className="mt-5 text-left text-lg text-gray-400">[{ayat?.surat}, Juz {ayat?.juz} Verse {ayat?.ayah}]</p>
                        </>
            }
        </div>
    );
}