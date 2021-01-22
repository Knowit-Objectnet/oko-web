import * as React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
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

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 350px;
`;

const SubmitButton = styled(PositiveButton)`
    margin-top: 20px;
`;

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
    nonRecurringDate: yup.date().label(`test1`).required().nullable(),
    selectedDays: yup.array().of(yup.number()).min(1).max(5).required(),
    dateRange: yup.object().shape({
        start: yup
            .date()
            .label(`test1`)
            //.transform(transformTime)
            .max(yup.ref(`end`), 'Åpningstid kan ikke være etter stengetid')
            //.when(`${day}Stengt`, fieldRequiredIfFalse)
            .nullable(),
        end: yup
            .date()
            .label(`test2`)
            //.transform(transformTime)
            //.when(`${day}Stengt`, fieldRequiredIfFalse)
            .nullable(),
    }),
    timeRange: yup.object().shape({
        start: yup
            .date()
            .label(`test1`)
            .transform(transformTime)
            .max(yup.ref(`end`), 'Åpningstid kan ikke være etter stengetid')
            .required()
            .nullable(),
        end: yup.date().label(`test2`).transform(transformTime).required().nullable(),
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

        const newEvent: ApiEventPost = {
            startDateTime: data.timeRange.start.toISOString(),
            endDateTime: data.timeRange.end.toISOString(),
            stationId: data.selectedStation,
            partnerId: data.selectedPartner,
        };

        if (data.recurring === 'Daily') {
            newEvent.recurrenceRule = {
                until: data.dateRange.end.toISOString(),
                days: WEEKDAYS,
            };
        } else if (data.recurring === 'Weekly') {
            newEvent.recurrenceRule = {
                until: data.dateRange.end.toISOString(),
                days: data.selectedDays.map((index) => WEEKDAYS[index - 1]),
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
