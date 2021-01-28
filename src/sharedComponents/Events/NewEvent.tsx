import * as React from 'react';
import styled from 'styled-components';
import { EventOptionDateRangeNew } from './EventOptionDateRangeNew';
import { EventTemplateVertical } from './EventTemplateVertical';
import { useKeycloak } from '@react-keycloak/web';
import { types, useAlert } from 'react-alert';
import { useMutation, useQueryClient } from 'react-query';
import { ApiEventPost, eventsDefaultQueryKey, postEvent } from '../../api/EventService';
import { WorkingWeekdays } from '../../types';
import { StationSelect } from '../forms/StationSelect';
import { PartnerSelect } from '../forms/PartnerSelect';
import { PositiveButton } from '../buttons/PositiveButton';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import parse from 'date-fns/parse';
import isDate from 'date-fns/isDate';
import isValid from 'date-fns/isValid';
import set from 'date-fns/set';

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 350px;
`;

const SubmitButton = styled(PositiveButton)`
    margin-top: 20px;
`;

// Set the locale errors for yup
yup.setLocale({
    mixed: {
        required: '${label} er påkrevd',
    },
});

// The type of the form data for the form
type FormData = {
    selectedPartner: number;
    selectedStation: number;
    recurring: 'None' | 'Daily' | 'Weekly';
    nonRecurringDate: Date;
    selectedDays: Array<number>;
    timeRange: {
        start: Date;
        end: Date;
    };
    dateRange: {
        start: Date;
        end: Date;
    };
};

// Function to transform the time string from the input to a date for the yup validation and state
const transformTime = function (value: Date, originalvalue: string) {
    if (isDate(value) && isValid(value)) {
        return value;
    }
    const parsed = parse(originalvalue, 'HH:mm', new Date());
    return isValid(parsed) ? parsed : null;
};

const transformDate = function (value: Date) {
    if (isDate(value) && isValid(value)) {
        return value;
    }
    return isValid(value) ? value : null;
};

const fieldRequiredIfFalse = (condition: 'None' | 'Daily' | 'Weekly', schema: yup.AnySchema) => {
    return condition === 'None' ? schema.required() : schema;
};

// validation schema for the form
const validationSchema = yup.object().shape({
    selectedPartner: yup
        .number()
        .min(0, 'Vennligst velg en samarbeidspartner')
        .required('Vennligst velg en samarbeidspartner'),
    selectedStation: yup.number().min(0, 'Vennligst velg en stasjon').required('Vennligst velg en stasjon'),
    recurring: yup
        .string()
        .matches(/(None|Daily|Weekly)/)
        .required(),
    nonRecurringDate: yup
        .date()
        .label(`Dato`)
        .transform(transformDate)
        .when(`recurring`, fieldRequiredIfFalse)
        .nullable(),
    selectedDays: yup
        .array()
        .of(yup.number())
        .when('recurring', {
            is: 'Weekly',
            then: yup
                .array()
                .of(yup.number())
                .label(`Ukedager`)
                .min(1, 'Minst en ukedag må være valgt')
                .max(5, 'Bare ukedagene mandag-fredag kan bli valgt')
                .required(),
        }),
    dateRange: yup.object().when('recurring', {
        is: (value: 'None' | 'Daily' | 'Weekly') => value === 'Daily' || value === 'Weekly',
        then: yup.object().shape({
            start: yup
                .date()
                .label(`Startdato`)
                .transform(transformTime)
                .max(yup.ref(`end`), 'Startdato kan ikke være etter sluttdato')
                .required()
                .nullable(),
            end: yup.date().label(`Sluttdato`).transform(transformTime).required().nullable(),
        }),
    }),
    timeRange: yup.object().shape({
        start: yup
            .date()
            .label(`Starttidspunkt`)
            .transform(transformTime)
            .max(yup.ref(`end`), 'Starttidspunkt kan ikke være etter sluttidspunkt')
            .required()
            .nullable(),
        end: yup.date().label(`Slutttidspunkt`).transform(transformTime).required().nullable(),
    }),
});

interface Props {
    start: Date;
    end: Date;
    afterSubmit?: (successful: boolean) => void;
}

const WEEKDAYS: Array<WorkingWeekdays> = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];

export const NewEvent: React.FC<Props> = (props) => {
    const alert = useAlert();
    const { keycloak } = useKeycloak();

    // form methods from reaect-hook-forms used in the form provider and inputs
    const formMethods = useForm<FormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            selectedPartner: -1,
            selectedStation: -1,
            recurring: 'None',
            selectedDays: [],
            nonRecurringDate: new Date(),
            dateRange: {
                start: new Date(),
                end: new Date(),
            },
            timeRange: {
                start: '08:00',
                end: '10:00',
            },
        },
    });

    const queryClient = useQueryClient();
    const addEventMutation = useMutation((newEvent: ApiEventPost) => postEvent(newEvent, keycloak.token), {
        onSuccess: () => {
            alert.show('Avtalen ble lagt til.', { type: types.SUCCESS });
            props.afterSubmit?.(true);
        },
        onError: () => {
            alert.show('Noe gikk kalt, avtalen ble ikke lagt til.', { type: types.ERROR });
            props.afterSubmit?.(false);
        },
        onSettled: () => {
            queryClient.invalidateQueries(eventsDefaultQueryKey);
        },
    });

    const handleEditEventSubmission = formMethods.handleSubmit((data) => {
        // Remove all alerts to not multiple alerts from earlier tries.
        // The ts-ignore is needed as for some reason the @types for the library forgot to add removeAll to the interface
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        alert.removeAll();

        // Set the date of the time to the first date in the range (or the only date if a non-recurring event), this is needed
        // as the time's date will be today while the user can choose another date.
        const date = data.recurring === 'None' ? data.nonRecurringDate : data.dateRange.start;
        const startTime = set(data.timeRange.start, {
            year: date.getFullYear(),
            month: date.getMonth(),
            date: date.getDate(),
        });
        const endTime = set(data.timeRange.end, {
            year: date.getFullYear(),
            month: date.getMonth(),
            date: date.getDate(),
        });

        const newEvent: ApiEventPost = {
            startDateTime: startTime.toISOString(),
            endDateTime: endTime.toISOString(),
            stationId: data.selectedStation,
            partnerId: data.selectedPartner,
        };

        if (data.recurring !== 'None') {
            // This is needed because the DatePicker's date's are set to 00:00 meaning that when it's converted to ISO it will be -1 og -2 hours
            // leading the date to be on the previous date, making the reccurenceRule not adding the last day
            const endDate = set(data.timeRange.end, {
                year: data.dateRange.end.getFullYear(),
                month: data.dateRange.end.getMonth(),
                date: data.dateRange.end.getDate(),
            });

            newEvent.recurrenceRule = {
                until: endDate.toISOString(),
                days: data.recurring === 'Daily' ? WEEKDAYS : data.selectedDays.map((index) => WEEKDAYS[index - 1]),
            };
        }

        addEventMutation.mutate(newEvent);
    });

    return (
        <EventTemplateVertical title="Opprett ny avtale" showEditSymbol={false} isEditing={false}>
            <FormProvider {...formMethods}>
                <StyledForm onSubmit={handleEditEventSubmission}>
                    <PartnerSelect />
                    <StationSelect />
                    <EventOptionDateRangeNew recurring={formMethods.watch('recurring')} recurrenceEnabled={true} />
                    <SubmitButton type="submit" isLoading={addEventMutation.isLoading}>
                        Lagre
                    </SubmitButton>
                </StyledForm>
            </FormProvider>
        </EventTemplateVertical>
    );
};
