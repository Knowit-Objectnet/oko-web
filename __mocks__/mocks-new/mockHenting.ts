import { ApiHenting } from '../../src/services-new/HentingService';

export const mockHentinger: Array<ApiHenting> = [
    {
        id: '56195442-2570-4d99-bded-57d51a6edbc8',
        henteplan: {
            id: 'bfbc7caa-d4ce-4a35-9251-008e500fd995',
            avtale: {
                id: '0067d96e-f7bf-4228-bca0-6f41462fe92c',
                aktor: {
                    id: 'ebde26e5-bb66-4c6c-8cd7-e11d6cbd00f2',
                    navn: 'Fretex',
                    kontaktPersoner: [
                        {
                            id: '1870517d-21a2-4238-8483-2b2b9e7d30ca',
                            navn: 'Kunde Kundesen',
                            telefon: '004712345678',
                            rolle: 'Kjøpsanvarlig',
                        },
                    ],
                },
                type: 'FAST',
                startDato: '2021-01-01T',
                sluttDato: '2022-01-01T',
            },
            stasjon: {
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
            frekvens: 'UKENTLIG',
            startTidspunkt: '2021-05-17T11:30:00.00Z',
            sluttTidspunkt: '2022-06-13T13:00:00.00Z',
            ukedag: 'MONDAY',
            merknad: null,
        },
        startTidspunkt: '2021-05-17T11:30:00.00Z',
        sluttTidspunkt: '2021-05-17T13:00:00.00Z',
        merknad: null,
        avlyst: null,
    },
    {
        id: '90424b3c-f952-4e39-8656-33ff9722a7a9',
        henteplan: {
            id: 'bfbc7caa-d4ce-4a35-9251-008e500fd995',
            avtale: {
                id: '0067d96e-f7bf-4228-bca0-6f41462fe92c',
                aktor: {
                    id: 'ebde26e5-bb66-4c6c-8cd7-e11d6cbd00f2',
                    navn: 'Fretex',
                    kontaktPersoner: [
                        {
                            id: '1870517d-21a2-4238-8483-2b2b9e7d30ca',
                            navn: 'Kunde Kundesen',
                            telefon: '004712345678',
                            rolle: 'Kjøpsanvarlig',
                        },
                    ],
                },
                type: 'FAST',
                startDato: '2021-01-01T',
                sluttDato: '2022-01-01T',
            },
            stasjon: {
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
            frekvens: 'UKENTLIG',
            startTidspunkt: '2021-05-17T11:30:00.00Z',
            sluttTidspunkt: '2022-06-13T13:00:00.00Z',
            ukedag: 'MONDAY',
            merknad: null,
        },
        startTidspunkt: '2021-05-24T11:30:00.00Z',
        sluttTidspunkt: '2021-05-24T13:00:00.00Z',
        merknad: null,
        avlyst: null,
    },
    {
        id: 'a3c19536-f71e-4993-866e-fc3c7a47bd11',
        henteplan: {
            id: 'bfbc7caa-d4ce-4a35-9251-008e500fd995',
            avtale: {
                id: '0067d96e-f7bf-4228-bca0-6f41462fe92c',
                aktor: {
                    id: 'ebde26e5-bb66-4c6c-8cd7-e11d6cbd00f2',
                    navn: 'Fretex',
                    kontaktPersoner: [
                        {
                            id: '1870517d-21a2-4238-8483-2b2b9e7d30ca',
                            navn: 'Kunde Kundesen',
                            telefon: '004712345678',
                            rolle: 'Kjøpsanvarlig',
                        },
                    ],
                },
                type: 'FAST',
                startDato: '2021-01-01T',
                sluttDato: '2022-01-01T',
            },
            stasjon: {
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
            frekvens: 'UKENTLIG',
            startTidspunkt: '2021-05-17T11:30:00.00Z',
            sluttTidspunkt: '2022-06-13T13:00:00.00Z',
            ukedag: 'MONDAY',
            merknad: null,
        },
        startTidspunkt: '2021-05-31T11:30:00.00Z',
        sluttTidspunkt: '2021-05-31T13:00:00.00Z',
        merknad: null,
        avlyst: null,
    },
    {
        id: 'cb6c6214-58bd-4829-abd1-87613b43b68b',
        henteplan: {
            id: 'bfbc7caa-d4ce-4a35-9251-008e500fd995',
            avtale: {
                id: '0067d96e-f7bf-4228-bca0-6f41462fe92c',
                aktor: {
                    id: 'ebde26e5-bb66-4c6c-8cd7-e11d6cbd00f2',
                    navn: 'Fretex',
                    kontaktPersoner: [
                        {
                            id: '1870517d-21a2-4238-8483-2b2b9e7d30ca',
                            navn: 'Kunde Kundesen',
                            telefon: '004712345678',
                            rolle: 'Kjøpsanvarlig',
                        },
                    ],
                },
                type: 'FAST',
                startDato: '2021-01-01T',
                sluttDato: '2022-01-01T',
            },
            stasjon: {
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
            frekvens: 'UKENTLIG',
            startTidspunkt: '2021-05-17T11:30:00.00Z',
            sluttTidspunkt: '2022-06-13T13:00:00.00Z',
            ukedag: 'MONDAY',
            merknad: null,
        },
        startTidspunkt: '2021-06-07T11:30:00.00Z',
        sluttTidspunkt: '2021-06-07T13:00:00.00Z',
        merknad: null,
        avlyst: null,
    },
    {
        id: 'f88e6454-5da2-49f9-8bd9-8772a780be2c',
        henteplan: {
            id: '263967ad-4725-41b9-b37e-0fb070a88e95',
            avtale: {
                id: '0067d96e-f7bf-4228-bca0-6f41462fe92c',
                aktor: {
                    id: 'ebde26e5-bb66-4c6c-8cd7-e11d6cbd00f2',
                    navn: 'Fretex',
                    kontaktPersoner: [
                        {
                            id: '1870517d-21a2-4238-8483-2b2b9e7d30ca',
                            navn: 'Kunde Kundesen',
                            telefon: '004712345678',
                            rolle: 'Kjøpsanvarlig',
                        },
                    ],
                },
                type: 'FAST',
                startDato: '2021-01-01T',
                sluttDato: '2022-01-01T',
            },
            stasjon: {
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
            frekvens: 'ANNENHVER',
            startTidspunkt: '2021-05-17T11:30:00.00Z',
            sluttTidspunkt: '2022-06-13T13:00:00.00Z',
            ukedag: 'FRIDAY',
            merknad: null,
        },
        startTidspunkt: '2021-05-21T11:30:00.00Z',
        sluttTidspunkt: '2021-05-21T13:00:00.00Z',
        merknad: null,
        avlyst: null,
    },
    {
        id: '32fdbd34-8ac1-44f7-a1ef-3526e910b9f8',
        henteplan: {
            id: '263967ad-4725-41b9-b37e-0fb070a88e95',
            avtale: {
                id: '0067d96e-f7bf-4228-bca0-6f41462fe92c',
                aktor: {
                    id: 'ebde26e5-bb66-4c6c-8cd7-e11d6cbd00f2',
                    navn: 'Fretex',
                    kontaktPersoner: [
                        {
                            id: '1870517d-21a2-4238-8483-2b2b9e7d30ca',
                            navn: 'Kunde Kundesen',
                            telefon: '004712345678',
                            rolle: 'Kjøpsanvarlig',
                        },
                    ],
                },
                type: 'FAST',
                startDato: '2021-01-01T',
                sluttDato: '2022-01-01T',
            },
            stasjon: {
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
            frekvens: 'ANNENHVER',
            startTidspunkt: '2021-05-17T11:30:00.00Z',
            sluttTidspunkt: '2022-06-13T13:00:00.00Z',
            ukedag: 'FRIDAY',
            merknad: null,
        },
        startTidspunkt: '2021-06-04T11:30:00.00Z',
        sluttTidspunkt: '2021-06-04T13:00:00.00Z',
        merknad: null,
        avlyst: null,
    },
    {
        id: 'f468baa5-d537-44e5-9972-0fd1a8e71fac',
        henteplan: {
            id: '66385727-5287-4d28-80ea-2a44d2812540',
            avtale: {
                id: '1bb86d8c-f5cc-476e-852c-39c50fd29ce4',
                aktor: {
                    id: '20aafe35-eb86-4fe4-a9a8-6432e2109638',
                    navn: 'Maritastiftelsen',
                    kontaktPersoner: [
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
                    ],
                },
                type: 'FAST',
                startDato: '2021-01-01T',
                sluttDato: '2022-01-01T',
            },
            stasjon: {
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
            frekvens: 'ENKELT',
            startTidspunkt: '2021-05-19T13:30:00.00Z',
            sluttTidspunkt: '2022-05-19T15:00:00.00Z',
            ukedag: 'MONDAY',
            merknad: null,
        },
        startTidspunkt: '2021-05-19T13:30:00.00Z',
        sluttTidspunkt: '2021-05-19T15:00:00.00Z',
        merknad: null,
        avlyst: null,
    },
    {
        id: 'd763c611-14e5-4afe-9700-4fef894d155c',
        henteplan: {
            id: '00c57b17-1822-4265-ab2c-f604bffee3f4',
            avtale: {
                id: '1bb86d8c-f5cc-476e-852c-39c50fd29ce4',
                aktor: {
                    id: '20aafe35-eb86-4fe4-a9a8-6432e2109638',
                    navn: 'Maritastiftelsen',
                    kontaktPersoner: [
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
                    ],
                },
                type: 'FAST',
                startDato: '2021-01-01T',
                sluttDato: '2022-01-01T',
            },
            stasjon: {
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
            frekvens: 'UKENTLIG',
            startTidspunkt: '2021-05-17T10:30:00.00Z',
            sluttTidspunkt: '2022-06-13T12:00:00.00Z',
            ukedag: 'TUESDAY',
            merknad: null,
        },
        startTidspunkt: '2021-05-18T10:30:00.00Z',
        sluttTidspunkt: '2021-05-18T12:00:00.00Z',
        merknad: null,
        avlyst: null,
    },
    {
        id: '4ef92458-70e0-47aa-9382-453f7fbd9356',
        henteplan: {
            id: '00c57b17-1822-4265-ab2c-f604bffee3f4',
            avtale: {
                id: '1bb86d8c-f5cc-476e-852c-39c50fd29ce4',
                aktor: {
                    id: '20aafe35-eb86-4fe4-a9a8-6432e2109638',
                    navn: 'Maritastiftelsen',
                    kontaktPersoner: [
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
                    ],
                },
                type: 'FAST',
                startDato: '2021-01-01T',
                sluttDato: '2022-01-01T',
            },
            stasjon: {
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
            frekvens: 'UKENTLIG',
            startTidspunkt: '2021-05-17T10:30:00.00Z',
            sluttTidspunkt: '2022-06-13T12:00:00.00Z',
            ukedag: 'TUESDAY',
            merknad: null,
        },
        startTidspunkt: '2021-05-25T10:30:00.00Z',
        sluttTidspunkt: '2021-05-25T12:00:00.00Z',
        merknad: null,
        avlyst: null,
    },
    {
        id: '20065256-056c-489b-bd9f-5ba91f3b1739',
        henteplan: {
            id: '00c57b17-1822-4265-ab2c-f604bffee3f4',
            avtale: {
                id: '1bb86d8c-f5cc-476e-852c-39c50fd29ce4',
                aktor: {
                    id: '20aafe35-eb86-4fe4-a9a8-6432e2109638',
                    navn: 'Maritastiftelsen',
                    kontaktPersoner: [
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
                    ],
                },
                type: 'FAST',
                startDato: '2021-01-01T',
                sluttDato: '2022-01-01T',
            },
            stasjon: {
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
            frekvens: 'UKENTLIG',
            startTidspunkt: '2021-05-17T10:30:00.00Z',
            sluttTidspunkt: '2022-06-13T12:00:00.00Z',
            ukedag: 'TUESDAY',
            merknad: null,
        },
        startTidspunkt: '2021-06-01T10:30:00.00Z',
        sluttTidspunkt: '2021-06-01T12:00:00.00Z',
        merknad: null,
        avlyst: null,
    },
    {
        id: '4e55653f-37f6-435b-bc00-04a6b14640b9',
        henteplan: {
            id: '00c57b17-1822-4265-ab2c-f604bffee3f4',
            avtale: {
                id: '1bb86d8c-f5cc-476e-852c-39c50fd29ce4',
                aktor: {
                    id: '20aafe35-eb86-4fe4-a9a8-6432e2109638',
                    navn: 'Maritastiftelsen',
                    kontaktPersoner: [
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
                    ],
                },
                type: 'FAST',
                startDato: '2021-01-01T',
                sluttDato: '2022-01-01T',
            },
            stasjon: {
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
            frekvens: 'UKENTLIG',
            startTidspunkt: '2021-05-17T10:30:00.00Z',
            sluttTidspunkt: '2022-06-13T12:00:00.00Z',
            ukedag: 'TUESDAY',
            merknad: null,
        },
        startTidspunkt: '2021-06-08T10:30:00.00Z',
        sluttTidspunkt: '2021-06-08T12:00:00.00Z',
        merknad: null,
        avlyst: null,
    },
    {
        id: '64e12b14-7fe0-4202-b7a7-021bb3852400',
        henteplan: {
            id: 'cd6db968-14d7-4e43-9409-695865313071',
            avtale: {
                id: '1bb86d8c-f5cc-476e-852c-39c50fd29ce4',
                aktor: {
                    id: '20aafe35-eb86-4fe4-a9a8-6432e2109638',
                    navn: 'Maritastiftelsen',
                    kontaktPersoner: [
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
                    ],
                },
                type: 'FAST',
                startDato: '2021-01-01T',
                sluttDato: '2022-01-01T',
            },
            stasjon: {
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
            frekvens: 'ANNENHVER',
            startTidspunkt: '2021-05-17T12:30:00.00Z',
            sluttTidspunkt: '2022-06-13T15:00:00.00Z',
            ukedag: 'THURSDAY',
            merknad: null,
        },
        startTidspunkt: '2021-05-20T12:30:00.00Z',
        sluttTidspunkt: '2021-05-20T15:00:00.00Z',
        merknad: null,
        avlyst: null,
    },
    {
        id: '8a5a98c1-b910-4749-bb64-10adf6bc1e2c',
        henteplan: {
            id: 'cd6db968-14d7-4e43-9409-695865313071',
            avtale: {
                id: '1bb86d8c-f5cc-476e-852c-39c50fd29ce4',
                aktor: {
                    id: '20aafe35-eb86-4fe4-a9a8-6432e2109638',
                    navn: 'Maritastiftelsen',
                    kontaktPersoner: [
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
                    ],
                },
                type: 'FAST',
                startDato: '2021-01-01T',
                sluttDato: '2022-01-01T',
            },
            stasjon: {
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
            frekvens: 'ANNENHVER',
            startTidspunkt: '2021-05-17T12:30:00.00Z',
            sluttTidspunkt: '2022-06-13T15:00:00.00Z',
            ukedag: 'THURSDAY',
            merknad: null,
        },
        startTidspunkt: '2021-05-20T12:30:00.00Z',
        sluttTidspunkt: '2021-05-20T15:00:00.00Z',
        merknad: null,
        avlyst: null,
    },
    {
        id: '2d781592-147e-42f3-b5c5-5043dc8ff4f5',
        henteplan: {
            id: 'e2d7f0b8-715a-4eed-9552-5d097e03a3d3',
            avtale: {
                id: '0067d96e-f7bf-4228-bca0-6f41462fe92c',
                aktor: {
                    id: 'ebde26e5-bb66-4c6c-8cd7-e11d6cbd00f2',
                    navn: 'Fretex',
                    kontaktPersoner: [
                        {
                            id: '1870517d-21a2-4238-8483-2b2b9e7d30ca',
                            navn: 'Kunde Kundesen',
                            telefon: '004712345678',
                            rolle: 'Kjøpsanvarlig',
                        },
                    ],
                },
                type: 'FAST',
                startDato: '2021-01-01T',
                sluttDato: '2022-01-01T',
            },
            stasjon: {
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
            frekvens: 'ENKELT',
            startTidspunkt: '2021-05-20T12:30:00.00Z',
            sluttTidspunkt: '2022-05-20T15:00:00.00Z',
            ukedag: 'THURSDAY',
            merknad: null,
        },
        startTidspunkt: '2021-05-20T12:30:00.00Z',
        sluttTidspunkt: '2022-05-20T15:00:00.00Z',
        merknad: null,
        avlyst: null,
    },
];
