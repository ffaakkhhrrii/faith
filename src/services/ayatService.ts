import { Ayat } from "@/types/Ayat";
import { AyatDetail } from "@/types/AyatDetail";
import { Surah } from "@/types/Surah";
import { BASE_URL } from "@/utils/constant";
import axios from "axios";

export const ayatService = {
    async getAyatAt(surah: number, ayah: number): Promise<Ayat> {
        const res = await axios.get(`${BASE_URL}/quran/ayat/${surah}/${ayah}`);
        const verse = res.data.data[0];
        return {
            arab: verse.arab,
            latin: verse.latin,
            text: verse.text,
            ayah: verse.ayah,
            juz: verse.juz,
            surah: verse.surah,
            surahName: res.data.info.surat.nama.id,
        };
    },
    async getAllSurah(): Promise<Surah[]> {
        const res = await axios.get(`${BASE_URL}/quran/surat/semua`);
        return res.data.data;
    },
    async getOneSurah(id: string | undefined | string[]): Promise<Surah> {
        const res = await axios.get(`${BASE_URL}/quran/surat/${id}`);
        return res.data.data;
    },
    async getAyat(idSurah: string | undefined | string[], range: string): Promise<AyatDetail[]> {
        const res = await axios.get(`${BASE_URL}/quran/ayat/${idSurah}/${range}`);
        return res.data.data;
    }
}
