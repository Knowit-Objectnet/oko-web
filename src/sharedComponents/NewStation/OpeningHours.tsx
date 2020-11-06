import * as React from 'react';
import styled from 'styled-components';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import { Dispatch } from 'react';

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const Day = styled.div`
    margin-right: 10px;
    width: 40px;
`;

const Divider = styled.div`
    width: 100%;
`;

const StyledTimeRangePicker = styled(TimeRangePicker)`
    width: 100%;
    background-color: ${(props) => props.theme.colors.White};

    & .react-timerange-picker__range-divider {
        flex: auto;
    }
`;

const ClosedInput = styled.input`
    zoom: 2;
`;

interface Props {
    day: string;
    range: [Date, Date];
    setRange: Dispatch<React.SetStateAction<[Date, Date]>>;
    closed: boolean;
    setClosed: Dispatch<React.SetStateAction<boolean>>;
    min: Date;
    max: Date;
}

export const OpeningHours: React.FC<Props> = (props) => {
    const onRangeChange = (range: [string | Date, string | Date]) => {
        // Create date object
        const date = new Date();

        // check if the range dates are of type date or not
        let start = range[0] instanceof Date ? range[0] : null;
        let end = range[1] instanceof Date ? range[1] : null;

        // if the range dates are not of type date then they are of type string
        // Parse the strings into a date object and set the start and end variables
        if (typeof range[0] == 'string') {
            const startStrings = range[0].split(':');
            start = new Date(date.setHours(parseInt(startStrings[0]), parseInt(startStrings[1])));
        }
        if (typeof range[1] == 'string') {
            const endStrings = range[1].split(':');
            end = new Date(date.setHours(parseInt(endStrings[0]), parseInt(endStrings[1])));
        }

        // If the start and end variables are not null (thus they are date)
        // then update the range
        if (start && end) {
            props.setRange([start, end]);
            // This error is just to please typescript. In reality it should never bee able to reach it.
        } else {
            throw new Error('Something went horribly wrong because of typescript');
        }
    };

    // On closed checkbox click function
    const onClosedChange = () => {
        props.setClosed(!props.closed);
    };

    return (
        <Wrapper>
            <Day>{props.day}</Day>
            {props.closed ? (
                <Divider></Divider>
            ) : (
                <StyledTimeRangePicker
                    clearIcon={null}
                    format="HH:mm"
                    value={props.range}
                    onChange={onRangeChange}
                    minTime={
                        props.min.getHours().toString().padStart(2, '0') +
                        ':' +
                        props.min.getMinutes().toString().padStart(2, '0')
                    }
                    maxTime={
                        props.max.getHours().toString().padStart(2, '0') +
                        ':' +
                        props.max.getMinutes().toString().padStart(2, '0')
                    }
                />
            )}
            <ClosedInput type="checkbox" checked={props.closed} onChange={onClosedChange} />
        </Wrapper>
    );
};
