import React, { Dispatch, Reducer, useContext, useReducer } from 'react';
import { View } from 'react-big-calendar';
import { endOfISOWeek, endOfMonth, startOfISOWeek, startOfMonth } from 'date-fns';

export type CalendarView = View; // TODO extend with custom view types

export interface CalendarFilters {
    stasjonId?: number;
}

export interface CalendarDateRange {
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

interface CalendarContext {
    state: CalendarState;
    dispatch: Dispatch<CalendarAction>;
}

const CalendarContext = React.createContext<CalendarContext | undefined>(undefined);

export const calculateDateRange = (date: Date, view: CalendarView) => {
    switch (view) {
        case 'day':
        case 'week':
        case 'agenda':
        case 'work_week':
            return {
                start: startOfISOWeek(date),
                end: endOfISOWeek(date),
            };
        case 'month':
            return {
                start: startOfMonth(date),
                end: endOfMonth(date),
            };
        default:
            throw new Error('Unsupported calendar view name provided when calculating date range');
    }
};

const calendarStateReducer: Reducer<CalendarState, CalendarAction> = (state, action) => {
    switch (action.type) {
        case 'SET_VIEW':
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

export const CalendarProvider: React.FC = ({ children }) => {
    const initialState: CalendarState = {
        filters: {},
        selectedView: 'week', // TODO: get from route/params or persisted view
        selectedDate: new Date(),
        viewDateRange: calculateDateRange(new Date(), 'week'), // TODO: get view from "selectedView"
    };

    const [state, dispatch] = useReducer(calendarStateReducer, initialState); // TODO Use initializer here?

    const value = {
        state,
        dispatch,
    };

    return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>;
};

export const useCalendar = (): CalendarContext => {
    const context = useContext(CalendarContext);
    if (context === undefined) {
        throw new Error('useCalendarState must be used within a CalendarProvider');
    }
    return context;
};
