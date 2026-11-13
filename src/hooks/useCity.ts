import { useCallback, useEffect, useState } from "react";

const KEY = "faith:city";
export const DEFAULT_CITY = "1301";

/** The chosen city id, remembered in this browser. null until the stored choice has been read. */
export const useCity = () => {
    const [city, setCityState] = useState<string | null>(null);

    useEffect(() => {
        let stored: string | null = null;
        try { stored = window.localStorage.getItem(KEY); } catch { /* storage blocked */ }
        setCityState(stored || DEFAULT_CITY);
    }, []);

    const setCity = useCallback((id: string) => {
        setCityState(id);
        try { window.localStorage.setItem(KEY, id); } catch { /* storage blocked */ }
    }, []);

    return [city, setCity] as const;
}
