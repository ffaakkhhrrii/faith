interface SurahCardProps {
    title: string;
    translation: string | undefined;
    number: string | undefined;
}

export default function SurahCard({ title, translation, number }: SurahCardProps) {
    return (
        <div className="bg-white p-5 mt-5 rounded-2xl shadow-xs shadow-black/30 border border-gray-400 hover:border hover:border-[#40E0D0]/40 cursor-pointer">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-semibold text-2xl text-black">{title}</h1>
                    <h1 className="font-light text-black text-lg">{translation}</h1>
                </div>
                <div>
                    <h1 className="font-bold text-2xl text-[#40E0D0]">{number}</h1>
                </div>
            </div>
        </div>
    );
}