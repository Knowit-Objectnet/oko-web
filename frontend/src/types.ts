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
}
