import * as React from 'react';
import styled from 'styled-components';
import { useFormContext, Controller } from 'react-hook-form';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import format from 'date-fns/format';
import parse from 'date-fns/parse';

const DayPickerInputClassInjection = ({ className = '', ...rest }) => (
    <DayPickerInput
        classNames={{
            container: `DayPickerInput ${className}`,
            overlayWrapper: 'DayPickerInput-OverlayWrapper',
            overlay: 'DayPickerInput-Overlay',
        }}
        {...rest}
    />
);

const StyledDatePicker = styled(DayPickerInputClassInjection)`
    display: flex;
    flex-direction: column;

    & > input {
        width: 100%;
    }
`;

interface Props {
    name: string;
}

export const DatePicker: React.FC<Props> = ({ name }) => {
    const { control } = useFormContext();

    function parseDate(str: string, formatString: string, localeString: string) {
        const locale = (localeString as unknown) as Locale;
        const parsed = parse(str, formatString, new Date(), { locale });
        if (DateUtils.isDate(parsed)) {
            return parsed;
        }
        return undefined;
    }

    function formatDate(date: number | Date, formatString: string, localeString: string) {
        const locale = (localeString as unknown) as Locale;
        return format(date, formatString, { locale });
    }

    const FORMAT = 'MM/dd/yyyy';

    return (
        <Controller
            control={control}
            name={name}
            render={({ onChange, value }) => (
                <StyledDatePicker
                    formatDate={formatDate}
                    format={FORMAT}
                    parseDate={parseDate}
                    value={value}
                    dayPickerProps={{
                        disabledDays: {
                            daysOfWeek: [0, 6],
                        },
                    }}
                    onDayChange={(day: Date | undefined) => onChange(day)}
                />
            )}
        />
    );
};
