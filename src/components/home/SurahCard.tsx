interface SurahCardProps {
    title: string;
    translation: string | undefined;
    number: string | undefined;
    isLoading: boolean;
}

export default function SurahCard({ title, translation, number, isLoading }: SurahCardProps) {
    return (
        <div className="bg-white p-5 mt-5 rounded-2xl shadow-xs shadow-black/30">
            {
                isLoading ? (
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="bg-black/40 p-3 rounded-xl w-40 animate-pulse"></div>
                            <div className="bg-black/40 p-3 rounded-xl mt-2 w-40 animate-pulse"></div>
                        </div>
                        <div className="bg-black/40 p-3 rounded-xl w-5 animate-pulse"></div>
                    </div>
                ) : (
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="font-semibold text-2xl text-black">{title}</h1>
                            <h1 className="font-light text-black text-lg">{translation}</h1>
                        </div>
                        <h1 className="font-bold text-2xl text-[#40E0D0]">{number}</h1>
                    </div>
                )
            }
        </div>
    );
}