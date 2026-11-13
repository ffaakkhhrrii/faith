export default function SurahCardLoading() {
    return (
        <li aria-hidden="true" className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5">
            <div className="h-11 w-11 animate-pulse rounded-full bg-line" />
            <div className="flex-1 space-y-2">
                <div className="h-5 w-32 animate-pulse rounded-lg bg-line" />
                <div className="h-4 w-24 animate-pulse rounded-lg bg-line" />
            </div>
        </li>
    );
}
