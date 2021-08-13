import { upperFirst } from 'lodash';
import { setLocale } from 'yup';

setLocale({
    string: {
        min: ({ label, min }: { label: string; min: number }) => `${upperFirst(label)} må bestå av minst ${min} tegn`,
        max: ({ label, max }: { label: string; max: number }) =>
            `${upperFirst(label)} kan være ikke være lenger enn ${max} tegn`,
        email: ({ label }: { label: string }) => `${upperFirst(label)} er ikke gyldig`,
    },
    mixed: {
        required: 'Du må oppgi ${label}',
        oneOf: 'Du må velge ${label}',
    },
});
