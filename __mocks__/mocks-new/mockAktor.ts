import { ApiKontakt } from '../../src/services-currentapi/aktor/AktorService';
import { ApiPartner } from '../../src/services-currentapi/partner/PartnerService';
import { ApiStasjon } from '../../src/services-currentapi/stasjon/StasjonService';

export const mockKontakter: Array<ApiKontakt> = [
    {
        id: 'cfe1c3bc-06a3-4ec9-860b-2765f786d2af',
        navn: 'Ola Nordmann',
        telefon: '004712345678',
        rolle: 'Formann',
    },
    {
        id: 'c9bd770c-4131-4430-a412-c1e4e53a5c9e',
        navn: 'Kari Jensen',
        telefon: '004712345679',
        rolle: 'Mottaksarbeider',
    },
    {
        id: 'b25b2c78-0eda-45e4-8d94-b8d5323f26c3',
        navn: 'Navn Navnesen',
        telefon: '004712345678',
        rolle: 'Sjåfør',
    },
    {
        id: '1870517d-21a2-4238-8483-2b2b9e7d30ca',
        navn: 'Kunde Kundesen',
        telefon: '004712345678',
        rolle: 'Kjøpsanvarlig',
    },
    {
        id: '9ac829d8-0272-4f3f-b9db-3536576ca979',
        navn: 'Kunde Kundesen jr',
        telefon: '004712345678',
        rolle: 'Kjøpsanvarlig',
    },
    {
        id: '9ac829d8-0272-4f3f-agse-3536576ca979',
        navn: 'Ola Nordmann',
        telefon: '004743892712',
        rolle: 'Sjåfør',
    },
];

export const mockPartnere: Array<ApiPartner> = [
    {
        id: 'ebde26e5-bb66-4c6c-8cd7-e11d6cbd00f2',
        navn: 'Fretex',
        // kontaktPersoner: [
        //     {
        //         id: '1870517d-21a2-4238-8483-2b2b9e7d30ca',
        //         navn: 'Kunde Kundesen',
        //         telefon: '004712345678',
        //         rolle: 'Kjøpsanvarlig',
        //     },
        // ],
        storrelse: 'STOR',
        ideell: true,
    },
    {
        id: '20aafe35-eb86-4fe4-a9a8-6432e2109638',
        navn: 'Maritastiftelsen',
        // kontaktPersoner: [
        //     {
        //         id: '1870517d-21a2-4238-8483-2b2b9e7d30ca',
        //         navn: 'Kunde Kundesen',
        //         telefon: '004712345678',
        //         rolle: 'Kjøpsanvarlig',
        //     },
        //     {
        //         id: '9ac829d8-0272-4f3f-b9db-3536576ca979',
        //         navn: 'Kunde Kundesen jr',
        //         telefon: '004712345678',
        //         rolle: 'Sjåfør',
        //     },
        //     {
        //         id: '9ac829d8-0272-4f3f-agse-3536576ca979',
        //         navn: 'Ola Nordmann',
        //         telefon: '004743892712',
        //         rolle: 'Sjåfør',
        //     },
        // ],
        storrelse: 'MIDDELS',
        ideell: true,
    },
    {
        id: 'b370a928-f5f9-48d6-b9f3-52533123fc4a',
        navn: 'Jobben',
        // kontaktPersoner: [],
        storrelse: 'LITEN',
        ideell: false,
    },
];

export const mockStasjoner: Array<ApiStasjon> = [
    {
        id: 'f95b4f8b-adf6-418d-94a2-3c9f84e8a4d3',
        navn: 'Haraldrud',
        kontaktPersoner: [
            {
                id: 'cfe1c3bc-06a3-4ec9-860b-2765f786d2af',
                navn: 'Ola Nordmann',
                telefon: '004712345678',
                rolle: 'Formann',
            },
            {
                id: 'c9bd770c-4131-4430-a412-c1e4e53a5c9e',
                navn: 'Kari Jensen',
                telefon: '004712345679',
                rolle: 'Mottaksarbeider',
            },
            {
                id: 'b25b2c78-0eda-45e4-8d94-b8d5323f26c3',
                navn: 'Navn Navnesen',
                telefon: '004712345678',
                rolle: 'Sjåfør',
            },
        ],
        type: 'GJENBRUK',
    },
    {
        id: '4a34205c-f6e3-4da6-bc00-588e560521dd',
        navn: 'Smestad',
        kontaktPersoner: [
            {
                id: 'cfe1c3bc-06a3-4ec9-860b-2765f786d2af',
                navn: 'Ola Nordmann',
                telefon: '004712345678',
                rolle: 'Formann',
            },
        ],
        type: 'GJENBRUK',
    },
    {
        id: '394def5e-fa91-44a0-a3c2-537a7b416d65',
        navn: 'Grønmo',
        kontaktPersoner: [
            {
                id: 'b25b2c78-0eda-45e4-8d94-b8d5323f26c3',
                navn: 'Navn Navnesen',
                telefon: '004712345678',
                rolle: 'Sjåfør',
            },
        ],
        type: 'GJENBRUK',
    },
    {
        id: '724b01f8-eaa5-438a-9c7c-1acf9b573c58',
        navn: 'Grefsen',
        kontaktPersoner: [
            {
                id: 'cfe1c3bc-06a3-4ec9-860b-2765f786d2af',
                navn: 'Ola Nordmann',
                telefon: '004712345678',
                rolle: 'Formann',
            },
            {
                id: 'b25b2c78-0eda-45e4-8d94-b8d5323f26c3',
                navn: 'Navn Navnesen',
                telefon: '004712345678',
                rolle: 'Sjåfør',
            },
        ],
        type: 'GJENBRUK',
    },
    {
        id: 'b69b6fd0-e268-4a09-9d92-18f8394cb699',
        navn: 'Ryen',
        kontaktPersoner: [],
        type: 'GJENBRUK',
    },
];
