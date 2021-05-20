import { ApiStation } from './services/StationService';
import { ApiPartner } from './services/PartnerService';

export type WorkingWeekdays = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY';

export type HenteplanFrekvens = 'ENKELT' | 'UKENTLIG' | 'ANNENHVER';

export type AvtaleType = 'FAST' | 'ANNEN' | 'OMBRUKSARRANGEMENT' | 'INTERNTRANSPORT';

export type StasjonType = 'GJENBRUK' | 'MINI';

export type PartnerStorrelse = 'STOR' | 'MIDDELS' | 'LITEN';

export type AktorType = 'PARTNER' | 'STASJON';

export interface EventInfo {
    title: string;
    start: Date;
    end: Date;
    resource: EventInfoResource;
}

interface EventInfoResource {
    eventId: number;
    station: ApiStation;
    partner: ApiPartner;
    recurrenceRule: {
        id: number;
        until: string;
        days?: Array<WorkingWeekdays>;
        interval?: number;
        count?: number | null;
    } | null;
    weight?: number;
    message?: {
        start: Date;
        end: Date;
        text: string;
    };
}

export interface SlotInfo {
    start: Date;
    end: Date;
}
