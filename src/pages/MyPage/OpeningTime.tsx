import * as React from 'react';
import styled from 'styled-components';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import { Colors } from '../../types';
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
    background-color: ${Colors.White};

    & .react-timerange-picker__range-divider {
        flex: auto;
    }
`;

const ClosedInput = styled.input`
    zoom: 2;
`;

interface OpeningTimeProps {
    day: string;
    range: [Date, Date];
    setRange: Dispatch<React.SetStateAction<[Date, Date]>>;
    closed: boolean;
    setClosed: Dispatch<React.SetStateAction<boolean>>;
    min: Date;
    max: Date;
}

export const OpeningTime: React.FC<OpeningTimeProps> = (props) => {
    const onRangeChange = (range: [string | Date, string | Date]) => {
        const date = new Date();

        let start = range[0] instanceof Date ? range[0] : null;
        let end = range[1] instanceof Date ? range[1] : null;

        if (typeof range[0] == 'string') {
            const startStrings = range[0].split(':');
            start = new Date(date.setHours(parseInt(startStrings[0]), parseInt(startStrings[1])));
        }
        if (typeof range[1] == 'string') {
            const endStrings = range[1].split(':');
            end = new Date(date.setHours(parseInt(endStrings[0]), parseInt(endStrings[1])));
        }

        if (start && end) {
            props.setRange([start, end]);
        } else {
            throw new Error('Something went horribly wrong because of typescript');
        }
    };

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
                    minTime={props.min}
                    maxTime={props.max}
                />
            )}
            <ClosedInput type="checkbox" checked={props.closed} onChange={onClosedChange} />
        </Wrapper>
    );
};
