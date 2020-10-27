export type WorkingWeekdays = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY';

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

export type StationOpeningHours = {
    [index in WorkingWeekdays]?: [string, string];
};

export interface ApiStation {
    id: number;
    name: string;
    hours: StationOpeningHours;
}

export interface ApiStationPost {
    name: string;
    hours?: StationOpeningHours;
}
export type StationOpeningHours = {
    [key in WorkingWeekdays]?: [string, string];
};

export interface ApiStationPatch {
    id: number;
    name?: string;
    hours?: StationOpeningHours;
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
