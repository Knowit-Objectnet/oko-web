import React, { Dispatch, Reducer, useReducer } from 'react';
import { DateRange } from 'react-big-calendar';
import { endOfISOWeek, endOfMonth, startOfISOWeek, startOfMonth } from 'date-fns';
import { calendarConfig, CalendarView } from './CalendarConfig';

export interface CalendarFilters {
    stasjonId?: number;
}

interface CalendarDateRange {
    start: Date;
    end: Date;
}

export interface CalendarState {
    filters: CalendarFilters;
    selectedView: CalendarView;
    selectedDate: Date;
    viewDateRange: CalendarDateRange;
}

type CalendarAction =
    | { type: 'SET_VIEW'; view: CalendarView }
    | { type: 'SET_DATE'; date: Date }
    | { type: 'SET_FILTER'; filters: CalendarFilters };

export interface CalendarContext {
    state: CalendarState;
    dispatch: Dispatch<CalendarAction>;
}

export const CalendarContext = React.createContext<CalendarContext | undefined>(undefined);

const calendarStateReducer: Reducer<CalendarState, CalendarAction> = (state, action) => {
    switch (action.type) {
        case 'SET_VIEW':
            // TODO: store view in localstorage
            return {
                ...state,
                selectedView: action.view,
                viewDateRange: calculateDateRange(state.selectedDate, action.view),
            };
        case 'SET_DATE':
            return {
                ...state,
                selectedDate: action.date,
                viewDateRange: calculateDateRange(action.date, state.selectedView),
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

export const calculateDateRange = (date: Date, view: CalendarView): DateRange => {
    const fetchInterval = calendarConfig.viewProperties[view].fetchInterval;
    switch (fetchInterval) {
        case 'weeks':
            return {
                start: startOfISOWeek(date),
                end: endOfISOWeek(date),
            };
        case 'months':
            return {
                start: startOfMonth(date),
                end: endOfMonth(date),
            };
        default:
            throw new Error('Unsupported calendar view name provided when calculating date range');
    }
};

export const CalendarProvider: React.FC = ({ children }) => {
    const initialState: CalendarState = {
        filters: {},
        selectedView: calendarConfig.defaultView,
        selectedDate: new Date(),
        viewDateRange: calculateDateRange(new Date(), calendarConfig.defaultView),
    };

    const [state, dispatch] = useReducer(calendarStateReducer, initialState);

    const value = {
        state,
        dispatch,
    };

    return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
};
