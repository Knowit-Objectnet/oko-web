import React, { Dispatch, Reducer, useReducer } from 'react';
import { CalendarView, useCalendarView } from './hooks/useCalendarView';

export interface CalendarFilters {
    stasjonId?: number;
}

export interface CalendarState {
    filters: CalendarFilters;
    selectedDate: Date;
}

type CalendarAction = { type: 'SET_DATE'; date: Date } | { type: 'SET_FILTER'; filters: CalendarFilters };

export interface CalendarContext {
    selectedView: CalendarView;
    state: CalendarState;
    dispatch: Dispatch<CalendarAction>;
}

export const CalendarContext = React.createContext<CalendarContext | undefined>(undefined);

const calendarStateReducer: Reducer<CalendarState, CalendarAction> = (state, action) => {
    switch (action.type) {
        case 'SET_DATE':
            return {
                ...state,
                selectedDate: action.date,
            };
        case 'SET_FILTER':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    ...action.filters,
                },
            };
        default:
            throw new Error('Illegal calendar state action');
    }
};

export const CalendarProvider: React.FC = ({ children }) => {
    const initialState: CalendarState = {
        selectedDate: new Date(),
        filters: {},
    };

    const [state, dispatch] = useReducer(calendarStateReducer, initialState);

    // TODO: find a way to merge view state into reducer above?
    //  or going with useState in stead of reducer pattern?
    const selectedView = useCalendarView();

    const value = {
        selectedView,
        state,
        dispatch,
    };

    return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
};
