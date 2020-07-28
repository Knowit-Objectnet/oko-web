import * as React from 'react';
import styled from 'styled-components';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { Colors } from '../../../types';
import { useState } from 'react';

const Wrapper = styled.div`
    position: absolute;
    top: 100%;
    right: 0px;
    background-color: ${Colors.White};
    display: flex;
    flex-direction: column;
    padding: 10px;
    box-sizing: border-box;
`;

const RangeSelection = styled.div`
    background-color: ${Colors.Yellow};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px;
    box-sizing: border-box;
    margin-bottom: 15px;
`;

interface SelectionProps {
    selected?: boolean;
}

const Selection = styled.div<SelectionProps>`
    background-color: ${(props) => (props.selected ? Colors.White : null)};
    padding: 5px;
    box-sizing: border-box;
    user-select: none;

    &:first-child {
        margin-right: 5px;
    }
`;

const StyledDateRangePicker = styled(DateRangePicker)`
    width: 100%;
    background-color: ${Colors.White};

    & .react-daterange-picker__range-divider {
        flex: auto;
    }
`;

const Submitbutton = styled.button`
    height: 35px;
    width: 100%;
    background-color: ${Colors.Green};
    border: none;
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    margin-top: 15px;
`;

interface DeleteEventProps {
    onSubmit: (range: [Date, Date], isSingleDeletion: boolean) => void;
}

export const DeleteEvent: React.FC<DeleteEventProps> = (props) => {
    const date = new Date();
    date.setHours(2, 0, 0, 0);
    const [range, setRange] = useState<[Date, Date]>([new Date(date), new Date(date)]);
    const [isSingleDeletion, setIsSingleDeletion] = useState(true);

    const onSubmit = () => {
        props.onSubmit(range, isSingleDeletion);
    };

    const onDateRangeChange = (range: [Date, Date]) => {
        setRange(range);
    };

    const setIsSingleDeletionClick = () => {
        setIsSingleDeletion(true);
    };

    const setIsRangeDeletionClick = () => {
        setIsSingleDeletion(false);
    };

    return (
        <Wrapper>
            <RangeSelection>
                <Selection selected={isSingleDeletion} onClick={setIsSingleDeletionClick}>
                    Engangstilfelle
                </Selection>
                <Selection selected={!isSingleDeletion} onClick={setIsRangeDeletionClick}>
                    Over en periode
                </Selection>
            </RangeSelection>
            {!isSingleDeletion ? (
                <StyledDateRangePicker clearIcon={null} onChange={onDateRangeChange} value={range} />
            ) : null}
            <Submitbutton onClick={onSubmit}>Bekreft</Submitbutton>
        </Wrapper>
    );
};
