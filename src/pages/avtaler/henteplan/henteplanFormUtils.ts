import { ApiHenteplanPost } from '../../../services/henteplan/HenteplanService';
import { toISOLocalString } from '../../../utils/localDateISO';
import { mergeDateWithTime } from '../../../utils/forms/mergeDateWithTime';
import { HenteplanFormData } from './HenteplanForm';

export const createHenteplan = (data: HenteplanFormData): Omit<ApiHenteplanPost, 'avtaleId'> => {
    const startTidspunkt = toISOLocalString(mergeDateWithTime(data.startDato, data.startTidspunkt));
    const sluttTidspunkt = toISOLocalString(mergeDateWithTime(data.sluttDato || data.startDato, data.sluttTidspunkt));
    const kategorier = data.kategorier.map((kategoriId) => ({ kategoriId }));

    return {
        stasjonId: data.stasjonId,
        frekvens: data.frekvens,
        ukedag: data.ukedag,
        startTidspunkt,
        sluttTidspunkt,
        kategorier,
        merknad: data.merknad,
    };
};
