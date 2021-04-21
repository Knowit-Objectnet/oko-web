import { ApiPartner } from '../src/services/PartnerService';

export const mockPartners: Array<ApiPartner> = [
    {
        id: 3,
        name: 'Fretex',
        description: 'Fretex driver med gjenbruk',
        phone: '004712345678',
        email: 'example@example.com',
    },
    {
        id: 4,
        name: 'Maritastiftelsen',
        description: 'Maritastiftelsen driver også med gjenbruk',
        phone: '004712345678',
        email: 'example@example.com',
    },
    {
        id: 7,
        name: 'Jobben',
        description: 'Tro det eller ei; Jobben driver med gjenbruk.',
        phone: '004712345679',
        email: 'example@example.com',
    },
];
