import { Prayer } from "@/types/Prayer"
import { BASE_URL } from "@/utils/constant"
import axios from "axios"

export const prayerService = {
    async getPrayerTimes (idLocation: string,date:string): Promise<Prayer>{
        const response = await axios.get(`${BASE_URL}/sholat/jadwal/${idLocation}/${date}`);
        const data = await response.data;
        const prayer: Prayer = {
            location: data.data.lokasi,
            subuh: data.data.jadwal.subuh,
            dzuhur: data.data.jadwal.dzuhur,
            ashar: data.data.jadwal.ashar,
            maghrib: data.data.jadwal.maghrib,
            isya: data.data.jadwal.isya
        }
        return prayer;
    }
}