import * as React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { OpeningHours } from './OpeningHours';
import Person from '../../assets/Person.svg';
import Phone from '../../assets/Phone.svg';
import Mail from '../../assets/Mail.svg';
import { useAlert, types } from 'react-alert';
import { Button } from '../buttons/Button';
import { useKeycloak } from '@react-keycloak/web';
import { queryCache, useMutation } from 'react-query';
import { ApiStationPost, postStation, stationsDefaultQueryKey } from '../../api/StationService';
import { format } from 'date-fns';

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

const Content = styled.div`
    padding: 0 50px 50px;
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
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
    width: 100%;
    box-sizing: border-box;
`;

const ContactInput = styled.input`
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

interface Props {
    afterSubmit?: (successful: boolean) => void;
}

export const NewStation: React.FC<Props> = (props) => {
    const { keycloak } = useKeycloak();
    const alert = useAlert();

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

    // General info
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    // Ambassador info
    const [ambassadorName, setAmbassadorName] = useState('');
    const [ambassadorPhone, SetAmbassadorPhone] = useState('');
    const [ambassadorEmail, SetAmbassadorEmail] = useState('');
    // Date
    const date = new Date();
    // Min max
    const max = new Date(date.setHours(20, 0, 0, 0));
    const min = new Date(date.setHours(7, 0, 0, 0));
    // Time ranges
    const [mondayRange, setMondayRange] = useState<[Date, Date]>([new Date(min), new Date(max)]);
    const [tuesdayRange, setTuesdayRange] = useState<[Date, Date]>([new Date(min), new Date(max)]);
    const [wednesdayRange, setWednesdayRange] = useState<[Date, Date]>([new Date(min), new Date(max)]);
    const [thursdayRange, setThursdayRange] = useState<[Date, Date]>([new Date(min), new Date(max)]);
    const [fridayRange, setFridayRange] = useState<[Date, Date]>([new Date(min), new Date(max)]);
    // Closed or not
    const [mondayClosed, setMondayClosed] = useState(false);
    const [tuesdayClosed, setTuesdayClosed] = useState(false);
    const [wednesdayClosed, setWednesdayClosed] = useState(false);
    const [thursdayClosed, setThursdayClosed] = useState(false);
    const [fridayClosed, setFridayClosed] = useState(false);

    // Changee function for the inputs. Uses the name tag to figure out which input is calling it
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();

        const name = e.currentTarget.name;
        const value = e.currentTarget.value;

        switch (name) {
            case 'name': {
                setName(value);
                break;
            }
            case 'address': {
                setAddress(value);
                break;
            }
            case 'ambassadorName': {
                setAmbassadorName(value);
                break;
            }
            case 'ambassadorPhone': {
                SetAmbassadorPhone(value);
                break;
            }
            case 'ambassadorEmail': {
                SetAmbassadorEmail(value);
                break;
            }
        }
    };

    // Submit function for when the location is to be submitted to the backend
    const onSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        e.persist();

        // If any of the values are nullable then return as its not valid
        if (!name || !address) {
            alert.show('Stasjon navn og adresse kan ikke være tomme.', { type: types.ERROR });
            return;
        }
        if (!ambassadorName || !ambassadorPhone || !ambassadorEmail) {
            alert.show('Kontaktinformasjon til ombruksambassadør kan ikke være tom.', { type: types.ERROR });
            return;
        }
        // If any of the start times are less than the end times then return as its not valid
        if (mondayRange[0] > mondayRange[1]) {
            alert.show('Sluttiden kan ikke være før starttiden på mandager.', { type: types.ERROR });
            return;
        }
        if (tuesdayRange[0] > tuesdayRange[1]) {
            alert.show('Sluttiden kan ikke være før starttiden på tirsdager.', { type: types.ERROR });
            return;
        }
        if (wednesdayRange[0] > wednesdayRange[1]) {
            alert.show('Sluttiden kan ikke være før starttiden på ondager.', { type: types.ERROR });
            return;
        }
        if (thursdayRange[0] > thursdayRange[1]) {
            alert.show('Sluttiden kan ikke være før starttiden på torsdager.', { type: types.ERROR });
            return;
        }
        if (fridayRange[0] > fridayRange[1]) {
            alert.show('Sluttiden kan ikke være før starttiden på fredager.', { type: types.ERROR });
            return;
        }

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
            name,
            hours: {
                MONDAY: getOpeningHours(mondayClosed, mondayRange),
                TUESDAY: getOpeningHours(tuesdayClosed, tuesdayRange),
                WEDNESDAY: getOpeningHours(wednesdayClosed, wednesdayRange),
                THURSDAY: getOpeningHours(thursdayClosed, thursdayRange),
                FRIDAY: getOpeningHours(fridayClosed, fridayRange),
            },
        };

        addStationMutation(newStation);
    };

    return (
        <Wrapper>
            <Title>Legg til ny stasjon</Title>
            <Content>
                <Input type="text" name="name" placeholder="Navn på stasjon" value={name} onChange={onChange} />
                <Input
                    type="text"
                    name="address"
                    placeholder="Adressen til stasjonen"
                    value={address}
                    onChange={onChange}
                />
                <OpeningTimes>
                    <OpeningTimesText>
                        <p>Åpningstid</p>
                        <span>stengt</span>
                    </OpeningTimesText>
                    <OpeningHours
                        day="Man"
                        range={mondayRange}
                        closed={mondayClosed}
                        max={max}
                        min={min}
                        setRange={setMondayRange}
                        setClosed={setMondayClosed}
                    />
                    <OpeningHours
                        day="Tir"
                        range={tuesdayRange}
                        closed={tuesdayClosed}
                        max={max}
                        min={min}
                        setRange={setTuesdayRange}
                        setClosed={setTuesdayClosed}
                    />
                    <OpeningHours
                        day="Ons"
                        range={wednesdayRange}
                        closed={wednesdayClosed}
                        max={max}
                        min={min}
                        setRange={setWednesdayRange}
                        setClosed={setWednesdayClosed}
                    />
                    <OpeningHours
                        day="Tor"
                        range={thursdayRange}
                        closed={thursdayClosed}
                        max={max}
                        min={min}
                        setRange={setThursdayRange}
                        setClosed={setThursdayClosed}
                    />
                    <OpeningHours
                        day="Fre"
                        range={fridayRange}
                        closed={fridayClosed}
                        max={max}
                        min={min}
                        setRange={setFridayRange}
                        setClosed={setFridayClosed}
                    />
                </OpeningTimes>
                <AmbassadorContactInfo>
                    <p>Kontaktinformasjon til ombruksambassadør</p>
                    <ContactWrapper>
                        <StyledPerson height="2em" />
                        <ContactInput
                            type="text"
                            name="ambassadorName"
                            placeholder="Navn"
                            value={ambassadorName}
                            onChange={onChange}
                        />
                    </ContactWrapper>
                    <ContactWrapper>
                        <StyledPhone height="2em" />
                        <ContactInput
                            type="tel"
                            name="ambassadorPhone"
                            placeholder="Telefonnummer"
                            value={ambassadorPhone}
                            onChange={onChange}
                        />
                    </ContactWrapper>
                    <ContactWrapper>
                        <StyledMail height="2em" />
                        <ContactInput
                            type="mail"
                            name="ambassadorEmail"
                            placeholder="Mail adresse"
                            value={ambassadorEmail}
                            onChange={onChange}
                        />
                    </ContactWrapper>
                </AmbassadorContactInfo>
                <Button variant="positive" onClick={onSubmit} isLoading={addStationLoading}>
                    Legg til stasjon
                </Button>
            </Content>
        </Wrapper>
    );
};
