import * as React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
`;

const Label = styled.label`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Input = styled.input`
    margin-right: 10px;
    margin-left: 0px;
`;

interface WeekCalendarLocationPickerProps {
    locations: Array<string>;
    checkedLocation: string;
    onChange: (location: string) => void;
}

export const WeekCalendarLocationPicker: React.FC<WeekCalendarLocationPickerProps> = (props) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        props.onChange(e.currentTarget.value);
    };
    return (
        <Wrapper>
            {props.locations.map((location) => (
                <Label key={location}>
                    <Input
                        type="radio"
                        value={location}
                        checked={props.checkedLocation == location}
                        onChange={onChange}
                    />
                    {location.charAt(0).toUpperCase() + location.slice(1)}
                </Label>
            ))}
        </Wrapper>
    );
};
