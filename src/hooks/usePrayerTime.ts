import { prayerService } from "@/services/prayerService";
import getTimesNow from "@/utils/helper";
import { useQuery } from "@tanstack/react-query";

export const usePrayerTimes = (idLocation: string) => {
    return useQuery({
        queryKey: ['prayerTimes', idLocation],
        queryFn: () => prayerService.getPrayerTimes(idLocation, getTimesNow()),
        refetchOnWindowFocus: false,
        enabled: idLocation !== null
    });
}