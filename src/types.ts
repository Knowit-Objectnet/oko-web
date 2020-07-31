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

export interface ApiLocation {
    id: number;
    name: string;
}

export interface ApiPartner {
    id: number;
    name: string;
}

export interface EventInfo {
    title: string;
    start: Date;
    end: Date;
    resource: EventInfoResource;
}

interface EventInfoResource {
    eventId: number;
    location: {
        id: number;
        name: string;
    };
    partner: {
        id: number;
        name: string;
    };
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

export interface Withdrawal {
    reportID: number;
    eventID: number;
    partnerID: number;
    stationID: number;
    startDateTime: Date;
    endDateTime: Date;
    weight: number;
    reportedDateTime: Date;
}

// Roles
export enum Roles {
    Oslo = 'reg_employee',
    Partner = 'partner',
    Ambassador = 'reuse_station',
}

// Oslo's color scheme
export enum Colors {
    DarkBlue = '#2A2859',
    Blue = '#6FE9FF',
    LightBlue = '#B3F5FF',
    DarkGreen = '#034B45',
    Green = '#43F8B6',
    LightGreen = '#C7F6C9',
    Red = '#FF8274',
    Yellow = '#F9C66B',
    LightBeige = '#F8F0DD',
    DarkBegie = '#D0BFAE',
    Black = '#2C2C2C',
    White = '#FFFFFF',
}

// Url to API
export const apiUrl = 'https://tcuk58u5ge.execute-api.eu-central-1.amazonaws.com/staging/backend';
