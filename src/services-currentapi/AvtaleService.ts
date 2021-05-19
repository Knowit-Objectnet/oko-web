import { AvtaleType } from '../types';
import { ApiHenteplan, ApiHenteplanPost } from './HenteplanService';

export interface ApiAvtale {
    id: string;
    aktorId: string;
    type: AvtaleType;
    startDato: string; //LocalDate
    sluttDato: string; //LocalDate
    henteplaner: Array<ApiHenteplan>;
}

export interface ApiAvtalePost {
    aktorId: string;
    type: AvtaleType;
    startDato: string; //LocalDate
    sluttDato: string; //LocalDate
    henteplaner?: Array<ApiHenteplanPost>;
}

export interface ApiAvtaleParams {
    id?: string;
    aktorId?: string;
    type?: AvtaleType;
    startDato?: string; //LocalDate
    sluttDato?: string; //LocalDate
}
