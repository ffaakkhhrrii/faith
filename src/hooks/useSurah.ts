import { ayatService } from "@/services/ayatService"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"

const LIMIT = 30;

export const useSurah = () => {
    return useQuery({
        queryKey: ['surah'],
        queryFn: ayatService.getAllSurah,
        refetchOnWindowFocus: false
    });
}

export const useOneSurah = (id: string | undefined | string[]) => {
    return useQuery({
        queryKey: ['surahDetail', id],
        queryFn: () => ayatService.getOneSurah(id),
        enabled: !!id
    });
}

export const useAllAyat = (idSurah: string | undefined | string[], totalAyat?: number) => {
    return useInfiniteQuery({
        queryKey: ['ayat_all', idSurah],
        queryFn: async ({ pageParam = 1 }) => {
            const start = pageParam;
            const end = Math.min(start + LIMIT - 1, totalAyat ?? Infinity);
            const range = `${start}-${end}`;
            const ayat = await ayatService.getAyat(idSurah, range);
            return {
                data: ayat,
                nextStart: end + 1,
                hasMore: end < (totalAyat ?? Infinity),
            };
        },
        getNextPageParam: (lastPage) => {
            return lastPage.hasMore ? lastPage.nextStart : undefined;
        },
        initialPageParam: 1,
        enabled: !!idSurah && !!totalAyat,
    });
};