export default function SurahCardLoading() {
    return (
        <div className="bg-white p-5 mt-5 rounded-2xl shadow-xs shadow-black/30">
            <div className="flex items-center justify-between">
                <div>
                    <div className="bg-black/40 p-3 rounded-xl w-40 animate-pulse"></div>
                    <div className="bg-black/40 p-3 rounded-xl mt-2 w-40 animate-pulse"></div>
                </div>
                <div className="bg-black/40 p-3 rounded-xl w-5 animate-pulse"></div>
            </div>
        </div>
    );
}