import * as React from 'react';
import styled from 'styled-components';
import { OpeningHours } from './OpeningHours';
import Person from '../../assets/Person.svg';
import Phone from '../../assets/Phone.svg';
import Mail from '../../assets/Mail.svg';
import { useAlert, types } from 'react-alert';
import { Button } from '../Button';
import { useKeycloak } from '@react-keycloak/web';
import { queryCache, useMutation } from 'react-query';
import { ApiStationPost, postStation, stationsDefaultQueryKey } from '../../api/StationService';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import 'yup-phone';
import parse from 'date-fns/parse';
import isDate from 'date-fns/isDate';
import isValid from 'date-fns/isValid';
import format from 'date-fns/format';
import Input from '../forms/Input';

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
    margin-bottom: 20px;

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
    margin-bottom: 10px;
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

// Date
const date = new Date();
// Min max
const max = new Date(date.setHours(20, 0, 0, 0));
const min = new Date(date.setHours(7, 0, 0, 0));

// Set the locale errors for yup
yup.setLocale({
    string: {
        min: '${path} må være minst ${min} bokstaver langt',
        max: '${path} må være ikke være mer enn ${max} bokstaver langt',
    },
});

// Function to transform the time string from the input to a date for the yup validation and state
const transformTime = function (value: Date, originalvalue: string) {
    if (isDate(value) && isValid(value)) {
        return value;
    }
    const parsed = parse(originalvalue, 'HH:mm', new Date());
    return isValid(parsed) ? parsed : undefined;
};

// Schema for the validation of the <day> start time input
const dayStartSchema = (day: string) =>
    yup
        .date()
        .transform(transformTime)
        .min(min, `Åpningstid kan ikke være før ${format(min, 'HH:mm')}`)
        .max(yup.ref(`${day}Slutt`), 'Åpningstid kan ikke være etter stengetid')
        .when(`${day}Stengt`, {
            is: false,
            then: yup.date().required(`Åpningstid for ${day} er påkrevd`),
        });

// Schema for the validation of the <day> end time input
const dayEndSchema = (day: string) =>
    yup
        .date()
        .transform(transformTime)
        .max(max, `Stengningstid kan ikke være etter ${format(max, 'HH:mm')}`)
        .when(`${day}Stengt`, {
            is: false,
            then: yup.date().required(`Stengningstid for ${day} er påkrevd`),
        });

// validation schema for the form
const validationSchema = yup.object().shape({
    navn: yup.string().min(2).max(50).required('Navn er påkrevd'),
    adresse: yup.string().min(2).max(100).required('Adresse er påkrevd'),
    ambassadoerNavn: yup.string().min(2).max(50).required('Ambassadør Navn er påkrevd'),
    ambassadoerTelefon: yup
        .string()
        .phone('NO', true, '${path} er ikke et gyldig tlf. nummer')
        .required('Ambassadør tlf. nummer er påkrevd'),
    ambassadoerEmail: yup.string().email().required('Ambassadør email er påkrevd'),
    mandagStart: dayStartSchema('mandag'),
    mandagSlutt: dayEndSchema('mandag'),
    mandagStengt: yup.boolean().required().default(false),
    tirsdagStart: dayStartSchema('tirsdag'),
    tirsdagSlutt: dayEndSchema('tirsdag'),
    tirsdagStengt: yup.boolean().required().default(false),
    onsdagStart: dayStartSchema('onsdag'),
    onsdagSlutt: dayEndSchema('onsdag'),
    onsdagStengt: yup.boolean().required().default(false),
    torsdagStart: dayStartSchema('torsdag'),
    torsdagSlutt: dayEndSchema('torsdag'),
    torsdagStengt: yup.boolean().required().default(false),
    fredagStart: dayStartSchema('fredag'),
    fredagSlutt: dayEndSchema('fredag'),
    fredagStengt: yup.boolean().required().default(false),
});

interface Props {
    afterSubmit?: (successful: boolean) => void;
}

export const NewStation: React.FC<Props> = (props) => {
    const { keycloak } = useKeycloak();
    const alert = useAlert();

    // form methods from reaect-hook-forms used in the form provider and inputs
    const formMethods = useForm({ resolver: yupResolver(validationSchema) });

    const [addStationMutation, { isLoading: addStationLoading }] = useMutation(
        (newStation: ApiStationPost) => postStation(newStation, keycloak.token),
        {
            onSuccess: () => {
                alert.show('Stasjonen ble lagt til suksessfullt.', { type: types.SUCCESS });
                props.afterSubmit?.(true);
            },
            onError: () => {
                alert.show('Noe gikk galt, ny stasjon ble ikke lagt til.', { type: types.ERROR });
                props.afterSubmit?.(false);
            },
            onSettled: () => queryCache.invalidateQueries(stationsDefaultQueryKey),
        },
    );

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

        addStationMutation(newStation);
    });

    return (
        <Wrapper>
            <Title>Legg til ny stasjon</Title>
            <FormProvider {...formMethods}>
                <Form onSubmit={onSubmit}>
                    <StyledInput
                        type="text"
                        name="navn"
                        placeholder="Navn på stasjon"
                        ref={formMethods.register}
                        error={formMethods.errors.navn?.message}
                    />
                    <StyledInput
                        type="text"
                        name="adresse"
                        placeholder="Adressen til stasjonen"
                        ref={formMethods.register}
                        error={formMethods.errors.adresse?.message}
                    />
                    <OpeningTimes>
                        <OpeningTimesText>
                            <p>Åpningstid</p>
                            <span>stengt</span>
                        </OpeningTimesText>
                        <OpeningHours day="mandag" max={max} min={min} closed={formMethods.watch('mandagStengt')} />
                        <OpeningHours day="tirsdag" max={max} min={min} closed={formMethods.watch('tirsdagStengt')} />
                        <OpeningHours day="onsdag" max={max} min={min} closed={formMethods.watch('onsdagStengt')} />
                        <OpeningHours day="torsdag" max={max} min={min} closed={formMethods.watch('torsdagStengt')} />
                        <OpeningHours day="fredag" max={max} min={min} closed={formMethods.watch('fredagStengt')} />
                    </OpeningTimes>
                    <AmbassadorContactInfo>
                        <p>Kontaktinformasjon til ombruksambassadør</p>
                        <ContactWrapper>
                            <StyledPerson height="2em" />
                            <ContactInput
                                type="text"
                                name="ambassadoerNavn"
                                placeholder="Navn"
                                ref={formMethods.register}
                                error={formMethods.errors.ambassadoerNavn?.message}
                            />
                        </ContactWrapper>
                        <ContactWrapper>
                            <StyledPhone height="2em" />
                            <ContactInput
                                type="tel"
                                name="ambassadoerTelefon"
                                placeholder="Telefonnummer"
                                ref={formMethods.register}
                                error={formMethods.errors.ambassadoerTelefon?.message}
                            />
                        </ContactWrapper>
                        <ContactWrapper>
                            <StyledMail height="2em" />
                            <ContactInput
                                type="mail"
                                name="ambassadoerEmail"
                                placeholder="Mail adresse"
                                ref={formMethods.register}
                                error={formMethods.errors.ambassadoerEmail?.message}
                            />
                        </ContactWrapper>
                    </AmbassadorContactInfo>
                    <Button
                        type="submit"
                        text="Legg til stasjon"
                        color="Green"
                        height={35}
                        loading={addStationLoading}
                    />
                </Form>
            </FormProvider>
        </Wrapper>
    );
};
