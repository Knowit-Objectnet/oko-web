export interface ApiKontakt {
    id: string;
    navn: string;
    telefon: string;
    epost: string;
    rolle: string;
}

export interface ApiKontaktPost {
    navn: string;
    telefon: string;
    epost: string;
    rolle: string;
}

const kontaktEndpoint = '/kontakter';
export const kontaktDefaultQueryKey = 'getKontakt';
