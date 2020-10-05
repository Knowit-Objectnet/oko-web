export type Weekdays = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY';

export interface ApiEvent {
    id: number;
    startDateTime: string;
    endDateTime: string;
    station: Station;
    partner: ApiPartner;
    recurrenceRule: {
        id: number;
        until: string;
        days: Array<Weekdays>;
        interval: number;
        count: number | null;
    } | null;
}

export type StationOpeningHours = {
    [index in Weekdays]?: [string, string];
};

export interface Station {
    id: number;
    name: string;
    hours: StationOpeningHours;
}

export interface StationRequest {
    name: string;
    hours: StationOpeningHours;
}

export interface ApiPartner {
    id: number;
    name: string;
    description: string;
    phone: string;
    email: string;
}

export interface Report {
    reportId: number;
    eventId: number;
    partnerId: number;
    station: Station;
    startDateTime: string;
    endDateTime: string;
    weight: number | null;
    reportedDateTime: string | null;
}

export interface ApiPickup {
    id: number;
    startDateTime: string;
    endDateTime: string;
    description: string;
    station: Station;
    chosenPartner: ApiPartner | null;
}

export interface ApiPickupPost {
    startDateTime: string;
    endDateTime: string;
    description: string;
    stationId: number;
}

export interface ApiPickupPatch {
    id: number;
    chosenPartnerId: number;
}

export interface ApiRequest {
    pickup: ApiPickup;
    partner: ApiPartner;
}

export interface ApiRequestPost {
    pickupId: number;
    partnerId: number;
}

export interface EventInfo {
    title: string;
    start: Date;
    end: Date;
    resource: EventInfoResource;
}

interface EventInfoResource {
    eventId: number;
    location: Station;
    partner: ApiPartner;
    recurrenceRule: {
        id: number;
        until: string;
        days?: Array<Weekdays>;
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

// Roles
export enum Roles {
    Oslo = 'reg_employee',
    Partner = 'partner',
    Ambassador = 'reuse_station',
}

// Url to API
export const apiUrl = 'https://tcuk58u5ge.execute-api.eu-central-1.amazonaws.com/staging';
