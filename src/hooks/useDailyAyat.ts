import { ayatService } from "@/services/ayatService";
import { Surah } from "@/types/Surah";
import { dailyVerseRef, todayISO } from "@/utils/helper";
import { useQuery } from "@tanstack/react-query";

/** The verse of the day, picked from the surah list so it is the same for every visitor on one date. */
export const useDailyAyat = (surahs: Surah[] | undefined, date: Date | null) => {
    const ref = surahs && date ? dailyVerseRef(surahs, date) : null;
    return useQuery({
        queryKey: ['dailyAyat', date ? todayISO(date) : null],
        queryFn: () => ayatService.getAyatAt(ref!.surah, ref!.ayah),
        enabled: !!ref,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });
}
