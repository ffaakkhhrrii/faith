interface LogoProps {
    className?: string;
}

/** The Faith mark: an upright crescent in the brand teal, then the name. */
export default function Logo({ className = "" }: LogoProps) {
    return (
        <span className={`inline-flex items-center gap-2 font-bold text-xl tracking-tight ${className}`}>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 shrink-0">
                <path fill="#40E0D0" d="M15.5 2.6A9.5 9.5 0 1 0 21.4 17a8 8 0 0 1-5.9-14.4Z" />
            </svg>
            Faith
        </span>
    );
}
