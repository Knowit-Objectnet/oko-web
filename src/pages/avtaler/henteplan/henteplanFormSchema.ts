import { ApiAvtale } from '../../../services/avtale/AvtaleService';
import * as yup from 'yup';
import { HenteplanFrekvens, Weekday } from '../../../services/henteplan/HenteplanService';
import { transformStringToDate } from '../../../utils/forms/transformStringToDate';
import { add, isValid, parseISO } from 'date-fns';
import { upperFirst } from 'lodash';
import { transformStringToDateTime } from '../../../utils/forms/transformStringToDateTime';
import { frekvensOptions } from './HenteplanForm';
import { ukedagOptions } from './HenteplanFormTidspunkt';

/** IMPORTANT! The order of the fields in this schema must match the order of the visual fields in the form.
 *   This is because the order here defines the order of the error messages in the error message summary
 *   displayed in the form.
 */
export const getHenteplanValidationSchema = (avtale: ApiAvtale): yup.AnyObjectSchema =>
    yup.object().shape({
        stasjonId: yup.string().label('hvilken stasjon det skal hentes fra').required(),
        frekvens: yup
            .mixed<HenteplanFrekvens>()
            .label('hvor ofte hentingene skal skje')
            .required()
            .oneOf(frekvensOptions.map((frekvens) => frekvens.value)),
        startDato: yup
            .date()
            .transform(transformStringToDate)
            .when('frekvens', (frekvens: HenteplanFrekvens | undefined, schema: yup.DateSchema) => {
                if (!frekvens) {
                    return yup.date().notRequired();
                } else if (frekvens === 'ENKELT') {
                    return schema.label('dato for hentingen').required();
                } else {
                    return schema
                        .label('startdato for henteplanen')
                        .required()
                        .max(yup.ref('sluttDato'), 'Startdatoen for henteplanen kan ikke være etter sluttdatoen');
                }
            })
            .min(parseISO(avtale.startDato), ({ label }) => `${upperFirst(label)} kan ikke være før avtalens startdato`)
            .max(
                parseISO(avtale.sluttDato),
                ({ label }) => `${upperFirst(label)} kan ikke være etter avtalens sluttdato`,
            )
            .nullable(),
        sluttDato: yup
            .date()
            .label('sluttdato for henteplanen')
            .transform(transformStringToDate)
            .when('frekvens', (frekvens: HenteplanFrekvens | undefined, schema: yup.DateSchema) => {
                if (frekvens && frekvens !== 'ENKELT') {
                    return schema
                        .required()
                        .min(yup.ref('startDato'), 'Sluttdatoen for henteplanen kan ikke være før startdatoen')
                        .min(
                            parseISO(avtale.startDato),
                            ({ label }) => `${upperFirst(label)} kan ikke være før avtalens startdato`,
                        )
                        .max(
                            parseISO(avtale.sluttDato),
                            ({ label }) => `${upperFirst(label)} kan ikke være etter avtalens sluttdato`,
                        );
                }
                return schema.notRequired();
            })
            .nullable(),
        ukedag: yup
            .mixed<Weekday>()
            .label('hvilken ukedag hentingene skal skje')
            .when('frekvens', (frekvens: HenteplanFrekvens | undefined, schema: yup.BaseSchema) => {
                if (frekvens && frekvens !== 'ENKELT') {
                    return schema.required();
                }
                return schema.notRequired();
            })
            .oneOf(ukedagOptions.map((ukedag) => ukedag.value)),
        startTidspunkt: yup
            .date()
            .label('starttidspunkt for når partneren kan hente')
            .transform(transformStringToDateTime)
            .required()
            // TODO: use station opening hours?
            .nullable(),
        sluttTidspunkt: yup
            .date()
            .label('sluttidspunkt for når partneren kan hente')
            .transform(transformStringToDateTime)
            .required()
            .min(
                // TODO: use station opening hours?
                yup.ref('startTidspunkt'),
                'Sluttidspunktet for når partneren kan hente kan ikke være før starttidspunktet',
            )
            .when('startTidspunkt', (startTidspunkt: Date | null, schema: yup.DateSchema) => {
                if (startTidspunkt instanceof Date && isValid(startTidspunkt)) {
                    const validDuration = { minutes: 15 };
                    const validSluttTidspunkt = add(startTidspunkt, validDuration);
                    return schema.min(
                        validSluttTidspunkt,
                        'Sluttidspunkt må være minst 15 minutter etter starttidspunkt',
                    );
                }
                return schema;
            })
            .nullable(),
        kategorier: yup
            .array(yup.string())
            .ensure()
            .min(1, 'Du må velge minst én varekategori som partneren skal kunne hente'),
        merknad: yup.string().notRequired(),
    });
