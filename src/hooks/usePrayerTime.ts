import { prayerService } from "@/services/prayerService";
import { todayISO } from "@/utils/helper";
import { useQuery } from "@tanstack/react-query";

export const usePrayerTimes = (idLocation: string | null) => {
    return useQuery({
        queryKey: ['prayerTimes', idLocation, todayISO()],
        queryFn: () => prayerService.getPrayerTimes(idLocation!, todayISO()),
        refetchOnWindowFocus: false,
        enabled: !!idLocation
    });
}
