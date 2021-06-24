import { ApiHenteplanPatch, ApiHenteplanPost } from '../../../services/henteplan/HenteplanService';
import { toISOLocalString } from '../../../utils/localDateISO';
import { mergeDateWithTime } from '../../../utils/forms/mergeDateWithTime';
import { HenteplanFormData } from './HenteplanForm';

const getStartTidspunkt = (data: HenteplanFormData) =>
    toISOLocalString(mergeDateWithTime(data.startDato, data.startTidspunkt));
const getSluttTidspunkt = (data: HenteplanFormData) =>
    toISOLocalString(mergeDateWithTime(data.sluttDato || data.startDato, data.sluttTidspunkt));
const getKategorier = (data: HenteplanFormData) => data.kategorier.map((kategoriId) => ({ kategoriId }));

const createHenteplanBase = (data: HenteplanFormData): Omit<ApiHenteplanPost, 'avtaleId' | 'stasjonId'> => ({
    frekvens: data.frekvens,
    ukedag: data.ukedag,
    startTidspunkt: getStartTidspunkt(data),
    sluttTidspunkt: getSluttTidspunkt(data),
    kategorier: getKategorier(data),
    merknad: data.merknad,
});

export const createNewHenteplan = (avtaleId: string, data: HenteplanFormData): ApiHenteplanPost => ({
    avtaleId,
    stasjonId: data.stasjonId,
    ...createHenteplanBase(data),
});

export const createUpdatedHenteplan = (henteplanId: string, data: HenteplanFormData): ApiHenteplanPatch => ({
    id: henteplanId,
    ...createHenteplanBase(data),
});
