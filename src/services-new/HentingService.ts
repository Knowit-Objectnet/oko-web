import { ApiHenteplanUpstream } from './HenteplanService';

interface ApiHentingBase {
    id: string; //UUID
    startTidspunkt: string; //LocalTimeDate
    sluttTidspunkt: string; //LocalTimeDate
    merknad: string | null;
    avlyst: string; //LocalTimeDate
}

export interface ApiHenting extends ApiHentingBase {
    henteplan: ApiHenteplanUpstream; //UUID
}

export interface ApiHentingDownstream extends ApiHentingBase {
    henteplanId: string;
}

export interface ApiHentingParams {
    id?: string;
    before?: string; //LocalTimeDate Henting must be before this
    after?: string; //LocalTimeDate Henting must be after this
    merknad?: string;
    henteplanId?: string;
    avlyst?: boolean;
}

export interface ApiHentingPatch {
    id: string;
    startTidspunkt?: string; //LocalTimeDate
    sluttTidspunkt?: string; //LocalTimeDate
    merknad?: string;
    avlyst?: string; //LocalTimeDate
}
