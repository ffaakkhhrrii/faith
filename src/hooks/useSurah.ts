import { ayatService } from "@/services/ayatService"
import { useQuery } from "@tanstack/react-query"

export const useSurah = ()=>{
    return useQuery({
        queryKey: ['surah'],
        queryFn: ayatService.getAllSurah,
        refetchOnWindowFocus: false
    });
}

export const useOneSurah = (id: string | undefined | string[])=>{
    return useQuery({
        queryKey: ['surahDetail'],
        queryFn: ()=> ayatService.getOneSurah(id),
        enabled: !!id
    });
}

export const useAllAyat = (idSurah: string | undefined | string[],start: string,end:string)=>{
    return useQuery({
        queryKey: ['ayat_all'],
        queryFn: ()=> ayatService.getAyat(idSurah,start,end),
        enabled: !!idSurah
    })
}