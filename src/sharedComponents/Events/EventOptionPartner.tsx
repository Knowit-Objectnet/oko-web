import * as React from 'react';
import { EventOption } from './EventOption';
import styled from 'styled-components';
import { usePartners } from '../../services/usePartners';

const Select = styled.select`
    width: 100%;
    height: 30px;
`;

interface EventOptionPartnerProps {
    selectedPartner: number;
    onChange: (partnerId: number) => void;
}

/**
 * Event option that allows the user choose a location for the event.
 */
export const EventOptionPartner: React.FC<EventOptionPartnerProps> = (props) => {
    const { data: partners } = usePartners();

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.persist();
        const index = e.currentTarget.value;
        if (index) {
            props.onChange(parseInt(index));
        }
    };

    return (
        <EventOption>
            <Select value={props.selectedPartner} onChange={onChange}>
                <option value={-1} disabled>
                    Velg samarbeidspartner
                </option>
                {partners?.map((partner) => (
                    <option value={partner.id} key={partner.id}>
                        {partner.name}
                    </option>
                ))}
            </Select>
        </EventOption>
    );
};
