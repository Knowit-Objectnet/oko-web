export type Weekdays = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY';

export interface ApiEvent {
    id: number;
    startDateTime: string;
    endDateTime: string;
    station: ApiStation;
    partner: ApiPartner;
    recurrenceRule: ApiRecurrenceRule | null;
}

export interface ApiEventPost {
    startDateTime: string;
    endDateTime: string;
    stationId: number;
    partnerId: number;
    recurrenceRule?: ApiRecurrenceRulePost;
}

export interface ApiEventPatch {
    id: number;
    startDateTime?: string;
    endDateTime?: string;
}

export interface ApiRecurrenceRule {
    id: number;
    until: string;
    days: Array<Weekdays>;
    interval: number;
    count: number | null;
}

export interface ApiRecurrenceRulePost {
    until: string;
    days: Array<Weekdays>;
    interval?: number;
    count?: number;
}

export interface EventInfo {
    title: string;
    start: Date;
    end: Date;
    resource: EventInfoResource;
}

interface EventInfoResource {
    eventId: number;
    location: ApiStation;
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

export interface ApiStation {
    id: number;
    name: string;
    hours: StationOpeningHours;
}

export type StationOpeningHours = {
    [index in Weekdays]?: [string, string];
};

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
    station: ApiStation;
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
    station: ApiStation;
    chosenPartner: ApiPartner | null;
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
export const apiUrl = 'https://tcuk58u5ge.execute-api.eu-central-1.amazonaws.com/staging';
