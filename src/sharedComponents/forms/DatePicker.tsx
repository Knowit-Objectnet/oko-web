import * as React from 'react';
import styled from 'styled-components';
import { useFormContext, Controller } from 'react-hook-form';
import DatePicker from 'react-date-picker';

const StyledDatePicker = styled(DatePicker)`
    background-color: ${(props) => props.theme.colors.White};
    flex: 1;
`;

interface Props {
    name: string;
}

const _DatePicker: React.FC<Props> = ({ name }) => {
    const { control } = useFormContext();

    // Function to disable weekends in the date and date-range pickers
    const disableWeekends = ({ date }: { date: Date }) => {
        return date.getDay() === 0 || date.getDay() === 6;
    };

    return (
        <Controller
            control={control}
            name={name}
            render={({ onChange, value, name }) => (
                <StyledDatePicker
                    clearIcon={null}
                    tileDisabled={disableWeekends}
                    name={name}
                    value={value}
                    onChange={(date) => onChange(date)}
                />
            )}
        />
    );
};

export { _DatePicker as DatePicker };
