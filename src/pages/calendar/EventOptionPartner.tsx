import * as React from 'react';
import { EventOption } from './EventOption';
import styled from 'styled-components';
import { LocationOn } from '@styled-icons/material/LocationOn';
import { Person } from '@styled-icons/material/Person';
import { ApiPartner } from '../../types';

const Select = styled.select`
    width: 100%;
`;

interface GrayBoxProps {
    selected?: boolean;
}

const GrayBox = styled.div<GrayBoxProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 128px;
    height: 40px;
    background: #f2f2f2;
    border-radius: 5px;
    border: ${(props) => (props.selected ? 'solid 1px black' : null)};
    box-sizing: border-box;

    &:nth-child(2) {
        margin: 0px 15px;
    }

    user-select: none;
`;

interface EventOptionPartnerProps {
    selectedPartner: number;
    partners: Array<ApiPartner>;
    onChange: (partnerId: number) => void;
}

/**
 * Event option that allows the user choose a location for the event.
 */
export const EventOptionPartner: React.FC<EventOptionPartnerProps> = (props) => {
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
                {props.partners.map((partner, index) => (
                    <option value={index} key={partner.id}>
                        {partner.name}
                    </option>
                ))}
            </Select>
        </EventOption>
    );
};
