interface PrayerCardProps {
    title: string;
    time: string | undefined;
    isLoading: boolean;
    isError: boolean;
    error: string | undefined
}

export default function PrayerCard({ title, time, isLoading, isError, error }: PrayerCardProps) {
    return (
        <div className="bg-[#1F2125] p-5 rounded-2xl shadow-lg shadow-black/30">
            <h1 className="font-bold text-lg text-[#40E0D0]">{title}</h1>
            {
                isLoading == true ?
                    <div className="bg-white/40 p-3 rounded-2xl shadow-lg shadow-black/30 animate-pulse"></div>
                    : isError == true ? <h1 className="mt-5 text-red-600 font-medium text-lg">{error}</h1> :
                        <h1 className="font-medium text-white text-2xl">{time}</h1>
            }
        </div>
    );
}