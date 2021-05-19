import { CalendarView, getCalendarViewFromType, isValidView } from './useCalendarView';
import { View } from 'react-big-calendar';

describe('Validation of view string', () => {
    const validViewStrings: string[] = ['uke', 'maned', 'dag', 'liste'];

    it.each(validViewStrings)('%p is validated as valid calendar view', (viewString) => {
        const result = isValidView(viewString);
        expect(result).toBe(true);
    });

    const invalidViewStrings: (string | undefined)[] = [
        undefined,
        'lister',
        'undefined',
        'null',
        'invalidView',
        '0',
        'view/with/path',
        '/dag',
        'dag/',
    ];

    it.each(invalidViewStrings)('%p is validated as invalid calendar view', (viewString) => {
        const result = isValidView(viewString);
        expect(result).toBe(false);
    });
});

describe('Get internal view type from React Big Calendar view type mapping', () => {
    const validViewTypes: Array<[string, CalendarView]> = [
        ['day', 'dag'],
        ['week', 'uke'],
        ['month', 'maned'],
        ['agenda', 'liste'],
    ];

    it.each(validViewTypes)('%p React Big Calendar view type returns internal view type of %p', (viewType, view) => {
        const result = getCalendarViewFromType(viewType as View);
        expect(result).toBe(view);
    });

    const invalidViewTypes: (string | undefined)[] = ['work_week', 'list', undefined, 'undefined', 'invalid'];

    it.each(invalidViewTypes)('%p invalid view type throws error', (viewType) => {
        expect(() => getCalendarViewFromType(viewType as View)).toThrowError();
    });
});
