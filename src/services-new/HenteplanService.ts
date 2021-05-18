import { HenteplanFrekvenser, WorkingWeekdays } from '../types';
import { ApiStasjon } from './AktorService';
import { ApiAvtaleUpstream } from './AvtaleService';
import { ApiHenting, ApiHentingDownstream } from './HentingService';

interface ApiHenteplanBase {
    id: string;
    frekvens: HenteplanFrekvenser;
    startTidspunkt: string; //LocalTimeDate: Time used for Henting time
    sluttTidspunkt: string; //LocalTimeDate: Time used for Henting time
    ukedag: WorkingWeekdays;
    merknad: string | null;
}

export interface ApiHenteplan extends ApiHenteplanBase {
    avtale: ApiAvtaleUpstream;
    stasjon: ApiStasjon;
    planlagteHentinger: Array<ApiHentingDownstream>;
}

export interface ApiHenteplanDownstream extends ApiHenteplanBase {
    avtaleId: string;
    stasjonId: string;
    planlagteHentinger: Array<ApiHentingDownstream>;
}

export interface ApiHenteplanUpstream extends ApiHenteplanBase {
    avtale: ApiAvtaleUpstream;
    stasjon: ApiStasjon;
}

export interface ApiHenteplanPost {
    avtaleId: string;
    stasjonId: string;
    frekvens: HenteplanFrekvenser;
    startTidspunkt: string;
    sluttTidspunkt: string;
    ukedag: WorkingWeekdays;
    merknad?: string;
}

export interface ApiHenteplanPatch {
    id: string;
    frekvens?: HenteplanFrekvenser;
    startTidspunkt?: string;
    sluttTidspunkt?: string;
    ukedag?: WorkingWeekdays;
    merknad?: string;
}

export interface ApiHenteplanParams {
    avtaleId?: string;
    stasjonId?: string;
    frekvens?: HenteplanFrekvenser;
    before?: string; //LocalTimeDate Henteplan must end before this
    after?: string; //LocalTimeDate Henteplan must start after this
    ukedag?: WorkingWeekdays;
    id?: string;
}
