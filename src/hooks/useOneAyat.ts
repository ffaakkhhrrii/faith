import { ayatService } from "@/services/ayatService";
import { useQuery } from "@tanstack/react-query";

export const useOneAyat = ()=>{
    return useQuery({
        queryKey: ['ayat'],
        queryFn: ayatService.getOneAyat,
        refetchOnWindowFocus: false
      });
}