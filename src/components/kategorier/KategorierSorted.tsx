import { partition } from 'lodash';
import { ApiKategori } from '../../services/kategori/KategoriService';

export const KategorierSorted = (kategorier: Array<ApiKategori>): Array<ApiKategori> => {
    const sortedKategorier = kategorier?.sort((kategoriA, kategoriB) => kategoriA.navn.localeCompare(kategoriB.navn));
    const [diverseKategori, alleAndreKategorier] = partition<ApiKategori>(sortedKategorier, (kategori) => {
        if (kategori.navn === 'Diverse') {
            return kategori;
        }
    });
    return alleAndreKategorier.concat(diverseKategori);
};
