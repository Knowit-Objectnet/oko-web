import { ApiStation } from './api/StationService';
import { ApiPartner } from './api/PartnerService';
import { ApiPickUp } from './api/PickUpService';

export type WorkingWeekdays = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY';

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

export interface ApiWithdrawal {
    reportId: number;
    eventId: number;
    partnerId: number;
    station: ApiStation;
    startDateTime: string;
    endDateTime: string;
    weight: number | null;
    reportedDateTime: string | null;
}

export interface ApiRequest {
    pickup: ApiPickUp;
    partner: ApiPartner;
}

export interface SlotInfo {
    start: Date;
    end: Date;
}

export interface Withdrawal {
    reportId: number;
    eventId: number;
    partnerId: number;
    station: ApiStation;
    startDateTime: Date;
    endDateTime: Date;
    weight: number | null;
    reportedDateTime: Date | null;
}

export interface PickUp {
    id: number;
    startDateTime: Date;
    endDateTime: Date;
    description: string;
    station: ApiStation;
    chosenPartner: ApiPartner | null;
}

// Roles
export enum Roles {
    Oslo = 'reg_employee',
    Partner = 'partner',
    Ambassador = 'reuse_station',
}

// Url to API
export const apiUrl = process.env.API_URL;
