import { stringOrDate } from 'react-big-calendar';

export interface eventInfo {
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    resource?: eventInfoResource;
}

interface eventInfoResource {
    location: string;
    driver: string;
    weight?: number;
    message?: {
        start: Date;
        end: Date;
        text: string;
    };
}

export interface slotInfo {
    start: stringOrDate;
    end: stringOrDate;
    slots: Date[] | string[];
    action: 'select' | 'click' | 'doubleClick';
    bounds?: {
        x: number;
        y: number;
        top: number;
        right: number;
        left: number;
        bottom: number;
    };
    box?: {
        clientX: number;
        clientY: number;
        x: number;
        y: number;
    };
}
