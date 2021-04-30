import React, { Dispatch, Reducer, useContext, useReducer } from 'react';
import { View } from 'react-big-calendar';
import { add } from 'date-fns';

export type CalendarView = View; // TODO extend with custom view types

interface CalendarFilters {
    stasjonId?: number;
}

interface CalendarDateRange {
    start: Date;
    end: Date;
}

interface CalendarState {
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

const calendarStateReducer: Reducer<CalendarState, CalendarAction> = (state, action) => {
    switch (action.type) {
        case 'SET_VIEW':
            return {
                ...state,
                selectedView: action.view,
            };
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
        filters: {},
        selectedView: 'week', // TODO: get from route/params or persisted view
        selectedDate: new Date(),
        viewDateRange: {
            start: add(new Date(), { weeks: -1 }), // TODO calculate from view and selectedDate
            end: add(new Date(), { weeks: 1 }), // TODO calculate from view and selectedDate
        },
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
