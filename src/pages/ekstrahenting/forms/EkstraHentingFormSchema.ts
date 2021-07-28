import * as yup from 'yup';
import { transformStringToDate } from '../../../utils/forms/transformStringToDate';
import { transformStringToDateTime } from '../../../utils/forms/transformStringToDateTime';
import { add, isEqual } from 'date-fns';
import { Tidspunkt, tidspunktOptions, UtlysningSelector, utlysningSelectorOptions } from './EkstraHentingForm';

export const getEkstraHentingValidationSchema = (stasjonId?: string) =>
    yup.object().shape({
        stasjon: yup.string().when((value: unknown, schema: yup.StringSchema) => {
            if (stasjonId) {
                return schema.notRequired();
            } else {
                return schema.label('hvilken stasjon det skal hentes fra').required();
            }
        }),
        beskrivelse: yup.string().label('en beskrivelse av hva som skal hentes').required(),
        tidspunkt: yup
            .mixed<Tidspunkt>()
            .label('når det skal hentes')
            .required()
            .oneOf(tidspunktOptions.map((option) => option.value)),
        dato: yup
            .date()
            .label('dato for hentingen')
            .transform(transformStringToDate)
            .when('tidspunkt', (tidspunkt: Tidspunkt | undefined, schema: yup.DateSchema) => {
                if (tidspunkt && tidspunkt === 'CUSTOM') {
                    return schema
                        .required()
                        .min(new Date(new Date().setHours(0, 0, 0, 0)), 'Dato må være i dag eller senere');
                } else {
                    return schema.notRequired();
                }
            })
            .nullable(),
        startTidspunkt: yup
            .date()
            .label('starttidspunkt for hentingen')
            .transform(transformStringToDateTime)
            .when('tidspunkt', (tidspunkt: Tidspunkt | undefined, schema: yup.DateSchema) => {
                if (tidspunkt && tidspunkt === 'CUSTOM') {
                    return schema.required().when('dato', {
                        is: (date: Date) => isEqual(date, new Date().setHours(0, 0, 0, 0)),
                        then: schema
                            .required()
                            .min(add(Date.now(), { minutes: 30 }), 'Sluttidspunktet må være om tidligst 30 minutter'),
                    });
                } else {
                    return schema.notRequired();
                }
            })
            .nullable(),
        sluttTidspunkt: yup
            .date()
            .label('sluttidspunkt for hentingen')
            .transform(transformStringToDateTime)
            .when('tidspunkt', (tidspunkt: Tidspunkt | undefined, schema: yup.DateSchema) => {
                if (tidspunkt && tidspunkt === 'NOW') {
                    return schema
                        .required()
                        .min(add(Date.now(), { minutes: 30 }), 'Sluttidspunktet må være om tidligst 30 minutter');
                } else if (tidspunkt && tidspunkt === 'CUSTOM') {
                    return schema
                        .required()
                        .when('startTidspunkt', (startTidspunkt: Date | undefined, schema: yup.DateSchema) => {
                            const minimumMinutesDuration = 15;
                            if (startTidspunkt) {
                                return schema.min(
                                    add(startTidspunkt, { minutes: minimumMinutesDuration }),
                                    `Sluttidspunktet må være minst ${minimumMinutesDuration} minutter etter starttidspunktet`,
                                );
                            } else {
                                return schema;
                            }
                        });
                } else {
                    return schema.notRequired();
                }
            })
            .nullable(),
        kategorier: yup
            .array(yup.string())
            .ensure()
            .min(1, 'Du må velge minst én varekategori som partneren skal kunne hente'),
        utlysningSelect: yup
            .mixed<UtlysningSelector>()
            .label('hvem som skal få varsel')
            .required()
            .oneOf(utlysningSelectorOptions.map((opt) => opt.value)),
        partnere: yup.array(yup.string()).when('utlysningSelect', (us: UtlysningSelector | undefined, schema) => {
            if (us && us === 'CUSTOM') {
                return schema.ensure().min(1, 'Du må velge minst én partner å sende utlysning til');
            } else {
                return schema.notRequired();
            }
        }),
    });
