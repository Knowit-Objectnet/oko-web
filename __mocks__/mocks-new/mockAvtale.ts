import { ApiAvtale, ApiAvtaleUpstream } from '../../src/services-new/AvtaleService';

export const mockAvtaler: Array<ApiAvtale> = [
    {
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
        henteplaner: [
            {
                id: 'bfbc7caa-d4ce-4a35-9251-008e500fd995',
                avtaleId: '0067d96e-f7bf-4228-bca0-6f41462fe92c',
                stasjonId: 'f95b4f8b-adf6-418d-94a2-3c9f84e8a4d3',
                frekvens: 'UKENTLIG',
                startTidspunkt: '2021-05-17T11:30:00.00Z',
                sluttTidspunkt: '2022-06-13T13:00:00.00Z',
                ukedag: 'MONDAY',
                merknad: null,
                planlagteHentinger: [],
            },
            {
                id: '263967ad-4725-41b9-b37e-0fb070a88e95',
                avtaleId: '0067d96e-f7bf-4228-bca0-6f41462fe92c',
                stasjonId: 'f95b4f8b-adf6-418d-94a2-3c9f84e8a4d3',
                frekvens: 'ANNENHVER',
                startTidspunkt: '2021-05-17T11:30:00.00Z',
                sluttTidspunkt: '2022-06-13T13:00:00.00Z',
                ukedag: 'FRIDAY',
                merknad: null,
                planlagteHentinger: [],
            },
            {
                id: 'e2d7f0b8-715a-4eed-9552-5d097e03a3d3',
                avtaleId: '0067d96e-f7bf-4228-bca0-6f41462fe92c',
                stasjonId: '4a34205c-f6e3-4da6-bc00-588e560521dd',
                frekvens: 'ENKELT',
                startTidspunkt: '2021-05-20T12:30:00.00Z',
                sluttTidspunkt: '2022-05-20T15:00:00.00Z',
                ukedag: 'THURSDAY',
                merknad: null,
                planlagteHentinger: [],
            },
        ],
    },
    {
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
        henteplaner: [
            {
                id: '66385727-5287-4d28-80ea-2a44d2812540',
                avtaleId: '1bb86d8c-f5cc-476e-852c-39c50fd29ce4',
                stasjonId: 'f95b4f8b-adf6-418d-94a2-3c9f84e8a4d3',
                frekvens: 'ENKELT',
                startTidspunkt: '2021-05-19T13:30:00.00Z',
                sluttTidspunkt: '2022-05-19T15:00:00.00Z',
                ukedag: 'MONDAY',
                merknad: null,
                planlagteHentinger: [],
            },
            {
                id: '00c57b17-1822-4265-ab2c-f604bffee3f4',
                avtaleId: '1bb86d8c-f5cc-476e-852c-39c50fd29ce4',
                stasjonId: '4a34205c-f6e3-4da6-bc00-588e560521dd',
                frekvens: 'UKENTLIG',
                startTidspunkt: '2021-05-17T10:30:00.00Z',
                sluttTidspunkt: '2022-06-13T12:00:00.00Z',
                ukedag: 'TUESDAY',
                merknad: null,
                planlagteHentinger: [],
            },
            {
                id: 'cd6db968-14d7-4e43-9409-695865313071',
                avtaleId: '1bb86d8c-f5cc-476e-852c-39c50fd29ce4',
                stasjonId: '4a34205c-f6e3-4da6-bc00-588e560521dd',
                frekvens: 'ANNENHVER',
                startTidspunkt: '2021-05-17T12:30:00.00Z',
                sluttTidspunkt: '2022-06-13T15:00:00.00Z',
                ukedag: 'THURSDAY',
                merknad: null,
                planlagteHentinger: [],
            },
        ],
    },
    {
        id: 'f2b43dd4-7afd-4199-b92c-2cb236017ffa',
        aktor: {
            id: 'b370a928-f5f9-48d6-b9f3-52533123fc4a',
            navn: 'Jobben',
            kontaktPersoner: [],
        },
        type: 'ANNEN',
        startDato: '2021-01-01T',
        sluttDato: '2022-01-01T',
        henteplaner: [],
    },
];
