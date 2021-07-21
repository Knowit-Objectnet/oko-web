import * as yup from 'yup';
import { transformStringToDate } from '../../../utils/forms/transformStringToDate';
import { transformStringToDateTime } from '../../../utils/forms/transformStringToDateTime';
import { add, isEqual } from 'date-fns';
import { NårType, nårOptions, UtlysningSelectorType, utlysningSelectorOptions } from './EkstraHentingForm';

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
        når: yup
            .mixed<NårType>()
            .label('når det skal hentes')
            .required()
            .oneOf(nårOptions.map((opt) => opt.value)),
        dato: yup
            .date()
            .label('dato for hentingen')
            .transform(transformStringToDate)
            .when('når', (når: NårType | undefined, schema: yup.DateSchema) => {
                if (når && når === 'CUSTOM') {
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
            .when('når', (når: NårType | undefined, schema: yup.DateSchema) => {
                if (når && når === 'CUSTOM') {
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
            .when('når', (når: NårType | undefined, schema: yup.DateSchema) => {
                if (når && når === 'NOW') {
                    return schema
                        .required()
                        .min(add(Date.now(), { minutes: 30 }), 'Sluttidspunktet må være om tidligst 30 minutter');
                } else if (når && når === 'CUSTOM') {
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
            .mixed<UtlysningSelectorType>()
            .label('hvem som skal få varsel')
            .required()
            .oneOf(utlysningSelectorOptions.map((opt) => opt.value)),
        partnere: yup.array(yup.string()).when('utlysningSelect', (us: UtlysningSelectorType | undefined, schema) => {
            if (us && us === 'CUSTOM') {
                return schema.ensure().min(1, 'Du må velge minst én partner å sende utlysning');
            } else {
                return schema.notRequired();
            }
        }),
    });
