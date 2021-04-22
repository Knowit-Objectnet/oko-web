import * as React from 'react';
import styled from 'styled-components';
import { OpeningHours } from './OpeningHours';
import Person from '../../assets/Person.svg';
import Phone from '../../assets/Phone.svg';
import Mail from '../../assets/Mail.svg';
import { useAlert, types } from 'react-alert';
import { useMutation, useQueryClient } from 'react-query';
import { ApiStationPost, postStation, stationsDefaultQueryKey } from '../../services/StationService';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import parse from 'date-fns/parse';
import isDate from 'date-fns/isDate';
import isValid from 'date-fns/isValid';
import format from 'date-fns/format';
import { AnySchema } from 'yup';
import Input from '../../components/forms/Input';
import { PositiveButton } from '../../components/buttons/PositiveButton';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: ${(props) => props.theme.colors.LightBeige};
`;

const Title = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    background-color: ${(props) => props.theme.colors.LightBeige};
    padding: 10px 20px;
    margin-bottom: 25px;
    font-weight: bold;
    font-size: 16px;
    line-height: 22px;
    box-sizing: border-box;
`;

const Form = styled.form`
    padding: 0 50px 50px;
    display: flex;
    flex-direction: column;
`;

const StyledInput = styled(Input)`
    width: 350px;
    height: 45px;

    &::placeholder {
        text-align: center;
    }
`;

const OpeningTimes = styled.div``;

const OpeningTimesText = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const AmbassadorContactInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`;

const ContactWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 350px;
    box-sizing: border-box;
`;

const ContactInput = styled(Input)`
    height: 45px;
    width: 100%;
    box-sizing: border-box;
`;

const StyledPerson = styled(Person)`
    width: 40px;
    margin-right: 5px;
`;

const StyledPhone = styled(Phone)`
    width: 40px;
    margin-right: 5px;
`;

const StyledMail = styled(Mail)`
    width: 40px;
    margin-right: 5px;
`;

// Min and max time for openingHours default values
const maxTime = '20:00';
const minTime = '07:00';

// The type of the form data for the form
type FormData = {
    navn: string;
    adresse: string;
    ambassadoerNavn: string;
    ambassadoerTelefon: string;
    ambassadoerEmail: string;
    mandagStart: Date;
    mandagSlutt: Date;
    mandagStengt: boolean;
    tirsdagStart: Date;
    tirsdagSlutt: Date;
    tirsdagStengt: boolean;
    onsdagStart: Date;
    onsdagSlutt: Date;
    onsdagStengt: boolean;
    torsdagStart: Date;
    torsdagSlutt: Date;
    torsdagStengt: boolean;
    fredagStart: Date;
    fredagSlutt: Date;
    fredagStengt: boolean;
};

// Set the locale errors for yup
yup.setLocale({
    mixed: {
        required: '${label} er påkrevd',
    },
    string: {
        email: '${label} må være en gyldig e-postadresse',
        min: '${label} må være minst ${min} bokstaver langt',
        max: '${label} må være ikke være mer enn ${max} bokstaver langt',
    },
});

// Function to transform the time string from the input to a date for the yup validation and state
const transformTime = function (value: Date, originalvalue: string) {
    if (isDate(value) && isValid(value)) {
        return value;
    }
    const parsed = parse(originalvalue, 'HH:mm', new Date());
    return isValid(parsed) ? parsed : null;
};

// Helper function for yup .when(): setting a field to required if a given condition is false
const fieldRequiredIfFalse = (condition: boolean, schema: AnySchema) => (!condition ? schema.required() : schema);

// Schema for the validation of the <day> start time input
const dayStartSchema = (day: string) =>
    yup
        .date()
        .label(`Åpningstid for ${day}`)
        .transform(transformTime)
        .max(yup.ref(`${day}Slutt`), 'Åpningstid kan ikke være etter stengetid')
        .when(`${day}Stengt`, fieldRequiredIfFalse)
        .nullable();

// Schema for the validation of the <day> end time input
const dayEndSchema = (day: string) =>
    yup
        .date()
        .label(`Stengetid for ${day}`)
        .transform(transformTime)
        .when(`${day}Stengt`, fieldRequiredIfFalse)
        .nullable();

// validation schema for the form
const validationSchema = yup.object().shape({
    navn: yup.string().label('Navn for stasjon').required().min(2).max(50),
    adresse: yup.string().label('Adresse for stasjonen').required().min(2).max(100),
    ambassadoerNavn: yup.string().label('Navn for ambassadør').required().min(2).max(50),
    ambassadoerTelefon: yup
        .string()
        .label('Telefonummer for ambassadør')
        .transform(function (value: string) {
            return value.replace(/\s+/g, '');
        })
        .matches(/^(\+?(00)?(47))?[2-9]\d{7}$/, '${label} er ikke et gyldig telefonummer')
        .required(),
    ambassadoerEmail: yup.string().label('E-postadresse for ambassadør').required().email(),
    mandagStart: dayStartSchema('mandag'),
    mandagSlutt: dayEndSchema('mandag'),
    mandagStengt: yup.boolean().required(),
    tirsdagStart: dayStartSchema('tirsdag'),
    tirsdagSlutt: dayEndSchema('tirsdag'),
    tirsdagStengt: yup.boolean().required(),
    onsdagStart: dayStartSchema('onsdag'),
    onsdagSlutt: dayEndSchema('onsdag'),
    onsdagStengt: yup.boolean().required(),
    torsdagStart: dayStartSchema('torsdag'),
    torsdagSlutt: dayEndSchema('torsdag'),
    torsdagStengt: yup.boolean().required(),
    fredagStart: dayStartSchema('fredag'),
    fredagSlutt: dayEndSchema('fredag'),
    fredagStengt: yup.boolean().required(),
});

interface Props {
    afterSubmit?: (successful: boolean) => void;
}

export const NewStation: React.FC<Props> = (props) => {
    const alert = useAlert();

    // form methods from reaect-hook-forms used in the form provider and inputs
    const formMethods = useForm<FormData>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            mandagStart: minTime,
            mandagSlutt: maxTime,
            mandagStengt: false,
            tirsdagStart: minTime,
            tirsdagSlutt: maxTime,
            tirsdagStengt: false,
            onsdagStart: minTime,
            onsdagSlutt: maxTime,
            onsdagStengt: false,
            torsdagStart: minTime,
            torsdagSlutt: maxTime,
            torsdagStengt: false,
            fredagStart: minTime,
            fredagSlutt: maxTime,
            fredagStengt: false,
        },
    });

    const queryClient = useQueryClient();
    const addStationMutation = useMutation((newStation: ApiStationPost) => postStation(newStation), {
        onSuccess: () => {
            alert.show('Stasjonen ble lagt til.', { type: types.SUCCESS });
            props.afterSubmit?.(true);
        },
        onError: () => {
            alert.show('Noe gikk galt, ny stasjon ble ikke lagt til.', { type: types.ERROR });
            props.afterSubmit?.(false);
        },
        onSettled: () => {
            queryClient.invalidateQueries(stationsDefaultQueryKey);
        },
    });

    // Submit function for when the location is to be submitted to the backend
    const onSubmit = formMethods.handleSubmit((data) => {
        const getOpeningHours = (dayIsClosed: boolean, openingHours: [Date, Date]) => {
            if (dayIsClosed) {
                return undefined;
            }
            return openingHours.map((hour) => {
                // TODO: replace string literal with date-fns: `formatISO(hour, { representation: 'time' })`
                //  if backend starts supporting proper ISO-formatting with timezone (example: 07:00:00+01:00)
                return `${format(hour, 'HH:mm')}:00Z`;
            }) as [string, string]; // Casting is required to please typescript
        };

        const newStation: ApiStationPost = {
            name: data.navn,
            hours: {
                MONDAY: getOpeningHours(data.mandagStengt, [data.mandagStart, data.mandagSlutt]),
                TUESDAY: getOpeningHours(data.tirsdagStengt, [data.tirsdagStart, data.tirsdagSlutt]),
                WEDNESDAY: getOpeningHours(data.onsdagStengt, [data.onsdagStart, data.onsdagSlutt]),
                THURSDAY: getOpeningHours(data.torsdagStengt, [data.torsdagStart, data.torsdagSlutt]),
                FRIDAY: getOpeningHours(data.fredagStengt, [data.fredagStart, data.fredagSlutt]),
            },
        };

        addStationMutation.mutate(newStation);
    });

    return (
        <Wrapper>
            <Title>Legg til ny stasjon</Title>
            <FormProvider {...formMethods}>
                <Form onSubmit={onSubmit}>
                    <StyledInput type="text" name="navn" label="Navn på stasjon" />
                    <StyledInput type="text" name="adresse" label="Adressen til stasjonen" />
                    <OpeningTimes>
                        <OpeningTimesText>
                            <p>Åpningstid</p>
                            <span>stengt</span>
                        </OpeningTimesText>
                        <OpeningHours day="mandag" closed={formMethods.watch('mandagStengt')} />
                        <OpeningHours day="tirsdag" closed={formMethods.watch('tirsdagStengt')} />
                        <OpeningHours day="onsdag" closed={formMethods.watch('onsdagStengt')} />
                        <OpeningHours day="torsdag" closed={formMethods.watch('torsdagStengt')} />
                        <OpeningHours day="fredag" closed={formMethods.watch('fredagStengt')} />
                    </OpeningTimes>
                    <AmbassadorContactInfo>
                        <p>Kontaktinformasjon til ombruksambassadør</p>
                        <ContactWrapper>
                            <StyledPerson height="2em" />
                            <ContactInput type="text" name="ambassadoerNavn" label="Navn" />
                        </ContactWrapper>
                        <ContactWrapper>
                            <StyledPhone height="2em" />
                            <ContactInput type="tel" name="ambassadoerTelefon" label="Telefonnummer" />
                        </ContactWrapper>
                        <ContactWrapper>
                            <StyledMail height="2em" />
                            <ContactInput type="mail" name="ambassadoerEmail" label="E-postadresse" />
                        </ContactWrapper>
                    </AmbassadorContactInfo>
                    <PositiveButton type="submit" isLoading={addStationMutation.isLoading}>
                        Legg til stasjon
                    </PositiveButton>
                </Form>
            </FormProvider>
        </Wrapper>
    );
};
