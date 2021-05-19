import { HenteplanFrekvens, WorkingWeekdays } from '../types';
import { ApiHenting } from './HentingService';

export interface ApiHenteplan {
    id: string;
    avtaleId: string;
    stasjonId: string;
    frekvens: HenteplanFrekvens;
    startTidspunkt: string; //LocalTimeDate: Time used for Henting time
    sluttTidspunkt: string; //LocalTimeDate: Time used for Henting time
    ukedag: WorkingWeekdays;
    merknad: string | null;
    planlagteHentinger: Array<ApiHenting>;
}

export interface ApiHenteplanPost {
    avtaleId: string;
    stasjonId: string;
    frekvens: HenteplanFrekvens;
    startTidspunkt: string;
    sluttTidspunkt: string;
    ukedag: WorkingWeekdays;
    merknad?: string;
}

export interface ApiHenteplanPatch {
    id: string;
    frekvens?: HenteplanFrekvens;
    startTidspunkt?: string;
    sluttTidspunkt?: string;
    ukedag?: WorkingWeekdays;
    merknad?: string;
}

export interface ApiHenteplanParams {
    avtaleId?: string;
    stasjonId?: string;
    frekvens?: HenteplanFrekvens;
    before?: string; //LocalTimeDate Henteplan must end before this
    after?: string; //LocalTimeDate Henteplan must start after this
    ukedag?: WorkingWeekdays;
    id?: string;
}
