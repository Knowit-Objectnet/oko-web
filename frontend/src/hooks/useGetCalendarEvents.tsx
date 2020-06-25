import { useState, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { EventInfo } from '../types';
import {useGetFetchAPI} from "./useGetFetchAPI";

export const useGetCalendarEvents: (location: string) => Array<EventInfo> = (location: string) => {
    return useGetFetchAPI<EventInfo>(`/api/calendar/events/${location}`, (event: EventInfo) => {
        event.start = new Date(event.start);
        event.end = new Date(event.end);
        return event;
    });
};
