import { ayatService } from "@/services/ayatService"
import { useQuery } from "@tanstack/react-query"

export const useSurah = ()=>{
    return useQuery({
        queryKey: ['surah'],
        queryFn: ayatService.getAllSurah,
        refetchOnWindowFocus: false
    });
}