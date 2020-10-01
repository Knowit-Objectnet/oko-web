export interface ApiEvent {
    id: number;
    startDateTime: string;
    endDateTime: string;
    station: ApiLocation;
    partner: ApiPartner;
    recurrenceRule: {
        id: number;
        until: string;
        days: Array<'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY'>;
        interval: number;
        count: number | null;
    } | null;
}

export interface LocationOpeningTimes {
    MONDAY?: [string, string];
    TUESDAY?: [string, string];
    WEDNESDAY?: [string, string];
    THURSDAY?: [string, string];
    FRIDAY?: [string, string];
}

export interface ApiLocation {
    id: number;
    name: string;
    hours: LocationOpeningTimes;
}

export interface ApiPartner {
    id: number;
    name: string;
    description: string;
    phone: string;
    email: string;
}

export interface ApiWithdrawal {
    reportId: number;
    eventId: number;
    partnerId: number;
    station: ApiLocation;
    startDateTime: string;
    endDateTime: string;
    weight: number | null;
    reportedDateTime: string | null;
}

export interface ApiPickUp {
    id: number;
    startDateTime: string;
    endDateTime: string;
    description: string;
    station: ApiLocation;
    chosenPartner: ApiPartner | null;
}

export interface ApiRequest {
    pickup: ApiPickUp;
    partner: ApiPartner;
}

export interface EventInfo {
    title: string;
    start: Date;
    end: Date;
    resource: EventInfoResource;
}

interface EventInfoResource {
    eventId: number;
    location: ApiLocation;
    partner: ApiPartner;
    recurrenceRule: {
        id: number;
        until: string;
        days?: Array<'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY'>;
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

export interface PickUp {
    id: number;
    startDateTime: Date;
    endDateTime: Date;
    description: string;
    station: ApiLocation;
    chosenPartner: ApiPartner | null;
}

// Roles
export enum Roles {
    Oslo = 'reg_employee',
    Partner = 'partner',
    Ambassador = 'reuse_station',
}

// Url to API
export const apiUrl = 'https://tcuk58u5ge.execute-api.eu-central-1.amazonaws.com/staging';
