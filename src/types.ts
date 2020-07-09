import { stringOrDate } from 'react-big-calendar';

export interface ApiEvent {
    id: number;
    startDateTime: string;
    endDateTime: string;
    station: ApiLocation;
    partner: ApiPartner;
    recurrenceRule: {
        id: number;
        rule: string;
    };
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
    allDay?: boolean;
    resource?: EventInfoResource;
}

interface EventInfoResource {
    location: {
        id: number;
        name: string;
    };
    weight?: number;
    message?: {
        start: Date;
        end: Date;
        text: string;
    };
}

export interface SlotInfo {
    start: stringOrDate;
    end: stringOrDate;
}

export interface Withdrawal {
    id: string;
    weight?: number;
    start: Date;
    end: Date;
}

export enum Roles {
    Oslo = 'reg_employee',
    Partner = 'partner',
    Ambassador = 'reuse_station',
}

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

export const apiUrl = 'https://tcuk58u5ge.execute-api.eu-central-1.amazonaws.com/staging';
