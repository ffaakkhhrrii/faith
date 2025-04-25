import { prayerService } from "@/services/prayerService";
import { useQuery } from "@tanstack/react-query";

export const useLocation = () => {
    return useQuery({
        queryKey: ['location'],
        queryFn: prayerService.getAllLocation,
        refetchOnWindowFocus: false
    });
}