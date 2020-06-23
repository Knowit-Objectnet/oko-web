import * as React from 'react';
import styled from 'styled-components';
import { Person } from '@styled-icons/material/Person';
import { EventSubmission } from './EventSubmission';
import { useState } from 'react';
import { EventTitle } from './EventTitle';
import { EventOption } from './EventOption';
import { EventOptionDateRange } from './EventOptionDateRange';
import { EventOptionLocation } from './EventOptionLocation';
import { useGetLocations } from '../../hooks/useGetLocations.jsx';
import { useGetPartners } from '../../hooks/useGetPartners';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 700px;
    margin: 50px;
`;

const Options = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

interface newEventProps {
    start: Date;
    end: Date;
    onFinished: () => void;
}

export const NewEvent: React.FC<newEventProps> = (props) => {
    let locations = useGetLocations();
    locations = locations.length === 0 ? ['grønmo', 'haraldrud', 'smedstad'] : locations;
    let partners = useGetPartners();
    partners = partners.length === 0 ? ['Fretex', 'Sykkel gutta'] : partners;
    const [selectedPartner, setSelectedPartner] = useState('');
    const [startDate, setStartDate] = useState(props.start);
    const [endDate, setEndDate] = useState(props.end);
    const [locationIndex, setLocationIndex] = useState(0);
    const [isRecurring, setIsRecurring] = useState(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        switch (e.currentTarget.name) {
            case 'startDate': {
                setStartDate(new Date(e.currentTarget.value));
                break;
            }
            case 'endDate': {
                setEndDate(new Date(e.currentTarget.value));
                break;
            }
            case 'recurring': {
                setIsRecurring(!isRecurring);
                break;
            }
        }
    };

    const onPartnerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.persist();
        setSelectedPartner(e.currentTarget.value);
    };

    const onLocationChange = (index: number) => {
        setLocationIndex(index);
    };

    const onCancel = () => {
        props.onFinished();
    };

    const onSubmit = () => {
        //TODO: Submit to server
        props.onFinished();
    };

    return (
        <Wrapper>
            <EventTitle title="Opprett ny avtale" isEditing={false} editable={false} />
            <Options>
                <EventOption icon={Person}>
                    <select value={selectedPartner} onChange={onPartnerChange}>
                        <option value="" disabled>
                            Velg samarbeidspartner
                        </option>
                        {partners.map((partner, index) => (
                            <option value={index} key={partner}>
                                {partner}
                            </option>
                        ))}
                    </select>
                </EventOption>
                <EventOptionDateRange
                    start={startDate}
                    end={endDate}
                    isRecurring={isRecurring}
                    isEditing={true}
                    onChange={onChange}
                />
                <EventOptionLocation
                    isEditing={true}
                    selectedLocation={locationIndex}
                    locations={locations}
                    onChange={onLocationChange}
                />
            </Options>
            <EventSubmission onSubmit={onSubmit} onCancel={onCancel} />
        </Wrapper>
    );
};
