export type Weekdays = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY';

export interface ApiEvent {
    id: number;
    startDateTime: string;
    endDateTime: string;
    station: Station;
    partner: Partner;
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

export interface StationPost {
    name: string;
    hours: StationOpeningHours;
}

export interface Partner {
    id: number;
    name: string;
    description: string;
    phone: string;
    email: string;
}

export interface PartnerPost {
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

export interface Pickup {
    id: number;
    startDateTime: string;
    endDateTime: string;
    description: string;
    station: Station;
    chosenPartner: Partner | null;
}

export interface PickupPost {
    startDateTime: string;
    endDateTime: string;
    description: string;
    stationId: number;
}

export interface PickupPatch {
    id: number;
    chosenPartnerId: number;
}

export interface Request {
    pickup: Pickup;
    partner: Partner;
}

export interface RequestPost {
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
    partner: Partner;
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
