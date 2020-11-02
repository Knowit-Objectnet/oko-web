import * as React from 'react';
import styled from 'styled-components';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { useState } from 'react';
import { Button } from '../Button';

const Wrapper = styled.div`
    position: absolute;
    top: 100%;
    right: 0px;
    background-color: ${(props) => props.theme.colors.White};
    display: flex;
    flex-direction: column;
    padding: 10px;
    box-sizing: border-box;
`;

const RangeSelection = styled.div`
    background-color: ${(props) => props.theme.colors.Yellow};
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
    background-color: ${(props) => props.selected && props.theme.colors.White};
    padding: 5px;
    box-sizing: border-box;
    user-select: none;

    &:first-child {
        margin-right: 5px;
    }
`;

const StyledDateRangePicker = styled(DateRangePicker)`
    width: 100%;
    background-color: ${(props) => props.theme.colors.White};

    & .react-daterange-picker__range-divider {
        flex: auto;
    }
`;

interface DeleteEventProps {
    allowRangeDeletion: boolean;
    onSubmit: (isSingleDeletion: boolean, fromDate: Date, toDate: Date) => void;
    loading: boolean;
}

export const DeleteEvent: React.FC<DeleteEventProps> = (props) => {
    const date = new Date();
    date.setHours(2, 0, 0, 0);
    const [dateRange, setDateRange] = useState<[Date, Date]>([new Date(date), new Date(date)]);
    const [isSingleDeletion, setIsSingleDeletion] = useState(true);

    const handleSubmit = () => {
        props.onSubmit(isSingleDeletion, dateRange[0], dateRange[1]);
    };

    const setIsSingleDeletionClick = () => {
        setIsSingleDeletion(true);
    };

    const setIsRangeDeletionClick = () => {
        setIsSingleDeletion(false);
    };

    return (
        <Wrapper>
            {props.allowRangeDeletion && (
                <RangeSelection>
                    <Selection selected={isSingleDeletion} onClick={setIsSingleDeletionClick}>
                        Engangstilfelle
                    </Selection>
                    <Selection selected={!isSingleDeletion} onClick={setIsRangeDeletionClick}>
                        Over en periode
                    </Selection>
                </RangeSelection>
            )}
            {!isSingleDeletion && <StyledDateRangePicker clearIcon={null} onChange={setDateRange} value={dateRange} />}
            <Button
                onClick={handleSubmit}
                text="Bekreft"
                color="Green"
                height={35}
                width={props.allowRangeDeletion ? undefined : 250}
                loading={props.loading}
            />
        </Wrapper>
    );
};

/*

 */
