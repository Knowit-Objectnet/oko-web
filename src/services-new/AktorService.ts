import { PartnerStorrelse, StasjonTyper } from '../types';

export interface ApiKontakt {
    id: string;
    navn: string;
    telefon: string;
    rolle: string;
}

export interface ApiAktor {
    id: string;
    navn: string;
    kontaktPersoner: Array<ApiKontakt>;
}

export interface ApiStasjon {
    id: string;
    navn: string;
    kontaktPersoner: Array<ApiKontakt>;
    type: StasjonTyper;
}

export interface ApiStasjonPatch {
    id: string;
    navn?: string;
    type?: StasjonTyper;
}

export interface ApiStasjonPost {
    navn: string;
    type: StasjonTyper;
}

export interface ApiStasjonParams {
    id?: string;
    navn?: string;
    type?: StasjonTyper;
}

export interface ApiPartner {
    id: string;
    navn: string;
    kontaktPersoner: Array<ApiKontakt>;
    storrelse: PartnerStorrelse;
    ideell: boolean;
}

export interface ApiPartnerPatch {
    id: string;
    navn?: string;
    storrelse?: PartnerStorrelse;
    ideell?: boolean;
}

export interface ApiPartnerPost {
    navn: string;
    storrelse: PartnerStorrelse;
    ideell: boolean;
}

export interface ApiPartnerParams {
    id?: string;
    navn?: string;
    storrelse?: PartnerStorrelse;
    ideell?: boolean;
}
