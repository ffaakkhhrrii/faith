import { Location } from "@/types/Location";
import { Prayer } from "@/types/Prayer";
import { BASE_URL } from "@/utils/constant";
import axios from "axios";

export const prayerService = {
    async getPrayerTimes(idLocation: string, date: string): Promise<Prayer> {
        const response = await axios.get(`${BASE_URL}/sholat/jadwal/${idLocation}/${date}`);
        const { lokasi, daerah, jadwal } = response.data.data;
        return {
            location: lokasi,
            region: daerah,
            date: jadwal.date,
            imsak: jadwal.imsak,
            subuh: jadwal.subuh,
            terbit: jadwal.terbit,
            dhuha: jadwal.dhuha,
            dzuhur: jadwal.dzuhur,
            ashar: jadwal.ashar,
            maghrib: jadwal.maghrib,
            isya: jadwal.isya,
        };
    },

    async getAllLocation(): Promise<Location[]> {
        const response = await axios.get(`${BASE_URL}/sholat/kota/semua`);
        return response.data.data;
    }
}
