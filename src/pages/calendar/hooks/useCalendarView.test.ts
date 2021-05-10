import { isValidView } from './useCalendarView';

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
