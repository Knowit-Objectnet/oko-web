import { ApiHenting, ApiHentingWrapper } from '../services/henting/HentingService';
import { parseISOIgnoreTimezone } from './hentingDateTimeHelpers';
import { ApiVektregistrering } from '../services/vektregistrering/VektregistreringService';
import { ApiKategori } from '../services/kategori/KategoriService';
import { isPast } from 'date-fns';

export const hasStarted = (henting: ApiHentingWrapper | ApiHenting): boolean =>
    isPast(parseISOIgnoreTimezone(henting.startTidspunkt));
export const hasEnded = (henting: ApiHentingWrapper | ApiHenting): boolean =>
    isPast(parseISOIgnoreTimezone(henting.sluttTidspunkt));

export const getKategorier = (henting: ApiHentingWrapper): Array<ApiKategori> => {
    const kategorier = henting.planlagtHenting?.kategorier || henting.ekstraHenting?.kategorier;
    return (kategorier || []).map((hentingKategori) => hentingKategori.kategori);
};

export const getVektregistreringer = (henting: ApiHentingWrapper): Array<ApiVektregistrering> =>
    henting.planlagtHenting?.vektregistreringer || henting.ekstraHenting?.vektregistreringer || [];

export const getVektSum = (henting: ApiHentingWrapper): number =>
    getVektregistreringer(henting).reduce((total, current) => total + current.vekt, 0);

export const getVektregistreringDate = (henting: ApiHentingWrapper): string =>
    getVektregistreringer(henting)[0]?.registreringsDato;

export const hasVektregistrering = (henting: ApiHentingWrapper): boolean => getVektregistreringer(henting).length > 0;

export const isValidForVektregistrering = (henting: ApiHentingWrapper): boolean => {
    const validPlanlagtHenting = henting.planlagtHenting && !henting.planlagtHenting.avlyst;
    const validEkstraHenting = henting.ekstraHenting && henting.ekstraHenting.godkjentUtlysning;

    if (validPlanlagtHenting || validEkstraHenting) {
        return hasStarted(henting);
    }

    return false;
};
