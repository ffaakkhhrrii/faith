import { useEffect, useState } from "react";

/** The current time, ticking every `intervalMs`. null on the server and before mount. */
export const useNow = (intervalMs = 30_000) => {
    const [now, setNow] = useState<Date | null>(null);
    useEffect(() => {
        setNow(new Date());
        const id = window.setInterval(() => setNow(new Date()), intervalMs);
        return () => window.clearInterval(id);
    }, [intervalMs]);
    return now;
}
