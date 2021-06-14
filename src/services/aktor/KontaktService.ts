export interface ApiKontakt {
    id: string;
    aktorId: string;
    navn: string;
    telefon?: string;
    epost?: string;
    rolle?: string;
}

export interface ApiKontaktPost {
    navn: string;
    telefon?: string;
    epost?: string;
    rolle?: string;
}

export interface ApiKontaktPatch {
    id: string;
    navn?: string;
    telefon?: string;
    epost?: string;
    rolle?: string;
}

export interface ApiKontaktPatch {
    id: string;
    navn?: string;
    telefon?: string;
    epost?: string;
    rolle?: string;
}

export interface ApiKontaktParams {
    id?: string;
    aktorId?: string;
    navn?: string;
    telefon?: string;
    epost?: string;
    rolle?: string;
}

const kontaktEndpoint = '/kontakter';
export const kontaktDefaultQueryKey = 'getKontakt';
