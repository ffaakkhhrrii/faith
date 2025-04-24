import { Ayat } from "@/types/Ayat";
import { BASE_URL } from "@/utils/constant";
import axios from "axios";

export const ayatService = {
    async getOneAyat() : Promise<Ayat> {
        const response = await axios.get(`${BASE_URL}/quran/ayat/acak`);
        const data = await response.data;
        const ayat : Ayat = {
            arab: data.data.ayat.arab,
            text: data.data.ayat.text,
            ayah: data.data.ayat.ayah,
            juz: data.data.ayat.juz,
            surat: data.data.info.surat.nama.id
        }
        return ayat;
    }
}