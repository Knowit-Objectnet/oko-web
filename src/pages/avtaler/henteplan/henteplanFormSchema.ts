import { ApiAvtale } from '../../../services/avtale/AvtaleService';
import * as yup from 'yup';
import { HenteplanFrekvens, Weekday } from '../../../services/henteplan/HenteplanService';
import { transformDate } from '../../../utils/forms/transformDate';
import { parseISO } from 'date-fns';
import { upperFirst } from 'lodash';
import { transformTime } from '../../../utils/forms/transformTime';
import { frekvensOptions, ukedagOptions } from './HenteplanForm';

export const getHenteplanValidationSchema = (avtale: ApiAvtale): yup.AnyObjectSchema =>
    yup.object().shape({
        stasjonId: yup.string().label('hvilken stasjon det skal hentes fra').required(),
        frekvens: yup
            .mixed<HenteplanFrekvens>()
            .label('hvor ofte hentingene skal skje')
            .required()
            .oneOf(frekvensOptions.map((frekvens) => frekvens.value)),
        ukedag: yup
            .mixed<Weekday>()
            .label('hvilken ukedag hentingene skal skje')
            .when('frekvens', (frekvens: HenteplanFrekvens | undefined, schema: yup.BaseSchema) => {
                // TODO: if frekvens is changed after submit, the react-hook-form errors object is not refreshed
                if (frekvens && frekvens !== 'ENKELT') {
                    return schema.required();
                }
                return schema.notRequired();
            })
            .oneOf(ukedagOptions.map((ukedag) => ukedag.value)),
        startDato: yup
            .date()
            .transform(transformDate)
            .when(
                'frekvens',
                // TODO: if frekvens is changed after submit, the react-hook-form errors object is not refreshed
                (frekvens: HenteplanFrekvens | undefined, schema: yup.DateSchema) => {
                    if (!frekvens) {
                        return yup.date().notRequired();
                    } else if (frekvens === 'ENKELT') {
                        return schema.label('dato for hentingen').required();
                    } else {
                        return schema.label('startdato for henteplanen').required();
                    }
                },
            )
            .min(parseISO(avtale.startDato), ({ label }) => `${upperFirst(label)} kan ikke være før avtalens startdato`)
            .max(
                parseISO(avtale.startDato),
                ({ label }) => `${upperFirst(label)} kan ikke være etter avtalens sluttdato`,
            )
            .nullable(),
        sluttDato: yup
            .date()
            .label('sluttdato for henteplanen')
            .transform(transformDate)
            .when(
                'frekvens',
                // TODO: if frekvens is changed after submit, the react-hook-form errors object is not refreshed
                (frekvens: HenteplanFrekvens | undefined, schema: yup.DateSchema) => {
                    if (frekvens && frekvens !== 'ENKELT') {
                        return schema
                            .required()
                            .min(yup.ref('startDato'), 'Sluttdatoen for henteplanen kan ikke være før startdatoen')
                            .min(
                                parseISO(avtale.startDato),
                                ({ label }) => `${upperFirst(label)} kan ikke være før avtalens startdato`,
                            )
                            .max(
                                parseISO(avtale.startDato),
                                ({ label }) => `${upperFirst(label)} kan ikke være etter avtalens sluttdato`,
                            );
                    }
                    return schema.notRequired();
                },
            )
            .nullable(),
        startTidspunkt: yup
            .date()
            .label('starttidspunkt for når partneren kan hente')
            .transform(transformTime)
            .required()
            // TODO: use station opening hours?
            .nullable(),
        sluttTidspunkt: yup
            .date()
            .label('sluttidspunkt for når partneren kan hente')
            .transform(transformTime)
            .required()
            .min(
                // TODO: use station opening hours?
                // TODO: set minimum duration for henting (e.g. 15 mins after startTidspunkt)
                yup.ref('startTidspunkt'),
                'Sluttidspunktet for når partneren kan hente kan ikke være før starttidspunktet',
            )
            .nullable(),
        merknad: yup.string().notRequired(),
    });
