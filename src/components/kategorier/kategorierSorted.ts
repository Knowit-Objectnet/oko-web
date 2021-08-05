import { partition } from 'lodash';
import { ApiKategori } from '../../services/kategori/KategoriService';

export const kategorierSorted = (kategorier: Array<ApiKategori>): Array<ApiKategori> => {
    const sortedKategorier = kategorier.sort((kategoriA, kategoriB) =>
        kategoriA.navn.localeCompare(kategoriB.navn, 'nb'),
    );
    const [diverseKategori, alleAndreKategorier] = partition<ApiKategori>(
        sortedKategorier,
        (kategori) => kategori.navn === 'Diverse',
    );
    return alleAndreKategorier.concat(diverseKategori);
};
