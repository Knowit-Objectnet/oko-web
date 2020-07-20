import * as React from 'react';
import styled from 'styled-components';
import { EventOption } from './EventOption';

const GrayBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 128px;
    height: 40px;
    background: #f2f2f2;
    border-radius: 5px;
`;

const Select = styled.select`
    width: 100%;
`;

interface EventOptionDateRangeProps {
    selectedCategory?: number;
    categories: Array<string>;
    isEditing: boolean;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

/**
 * Event option that allows the user to choose a category
 */
export const EventOptionCategory: React.FC<EventOptionDateRangeProps> = (props) => (
    <EventOption>
        {props.isEditing ? (
            <Select value={props.selectedCategory} onChange={props.onChange}>
                <option value={-1} disabled>
                    Velg kategori
                </option>
                {props.categories.map((category, index) => (
                    <option key={category} value={index}>
                        {category}
                    </option>
                ))}
            </Select>
        ) : (
            <GrayBox>{props.selectedCategory ? props.categories[props.selectedCategory].toUpperCase() : 'n/a'}</GrayBox>
        )}
    </EventOption>
);
