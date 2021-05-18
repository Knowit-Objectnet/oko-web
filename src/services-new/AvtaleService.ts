import { AvtaleTyper } from '../types';
import { ApiAktor, ApiPartner } from './AktorService';
import { ApiHenteplan, ApiHenteplanDownstream, ApiHenteplanPost } from './HenteplanService';

interface ApiAvtaleBase {
    id: string;
    type: AvtaleTyper;
    startDato: string; //LocalDate
    sluttDato: string; //LocalDate
}

export interface ApiAvtaleDownstream extends ApiAvtaleBase {
    aktorId: string;
    henteplaner: Array<ApiHenteplanDownstream>;
}

export interface ApiAvtaleUpstream extends ApiAvtaleBase {
    aktor: ApiAktor;
}

export interface ApiAvtale extends ApiAvtaleBase {
    aktor: ApiAktor;
    henteplaner: Array<ApiHenteplanDownstream>;
}

export interface ApiAvtalePost {
    aktorId: string;
    type: AvtaleTyper;
    startDato: string; //LocalDate
    sluttDato: string; //LocalDate
    henteplaner?: Array<ApiHenteplanPost>;
}

export interface ApiAvtaleParams {
    id?: string;
    aktorId?: string;
    type?: AvtaleTyper;
    startDato?: string; //LocalDate
    sluttDato?: string; //LocalDate
}
