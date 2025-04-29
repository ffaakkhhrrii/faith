import { Ayat } from "@/types/Ayat";
import { AyatDetail } from "@/types/AyatDetail";
import { Surah } from "@/types/Surah";
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
    },
    async getAllSurah(): Promise<Surah[]>{
        const res = await axios.get(`${BASE_URL}/quran/surat/semua`);
        const data = await res.data;
        const surah: Surah[] = data.data;
        return surah;
    },
    async getOneSurah(id: string | undefined | string[]): Promise<Surah>{
        const res = await axios.get(`${BASE_URL}/quran/surat/${id}`);
        const data = await res.data;
        const surah: Surah = data.data;
        return surah;
    },
    async getAyat(idSurah: string| undefined | string[], range: string): Promise<AyatDetail[]>{
        const res = await axios.get(`${BASE_URL}/quran/ayat/${idSurah}/${range}`);
        const data = await res.data;
        const ayat: AyatDetail[] = data.data;
        return ayat;
    }
}