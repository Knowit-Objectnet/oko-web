import * as React from 'react';
import styled from 'styled-components';
import Filter from '../../assets/Filter.svg';
import ArrowDown from '../../assets/ArrowDown.svg';
import ArrowUp from '../../assets/ArrowUp.svg';
import { useState } from 'react';
import useStations from '../../api/hooks/useStations';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 50px;

    @media screen and (max-width: 900px) {
        margin-top: 0;
        margin-left: 15px;
    }
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
`;

const Station = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`;

const StyledFilter = styled(Filter)`
    height: 1em;
    margin-right: 10px;
`;

const StyledArrowDown = styled(ArrowDown)`
    height: 1em;
    margin-left: 10px;
`;

const StyledArrowUp = styled(ArrowUp)`
    height: 1em;
    margin-left: 10px;
`;

const Label = styled.label`
    &:not(:last-child) {
        margin-bottom: 10px;
    }
`;

const Input = styled.input`
    margin-right: 15px;
`;

interface StationSelectorProps {
    selectedStationId?: number;
    onSelectedStationChange: (index?: number) => void;
}

/*
 * Component for filtering by station
 */
export const StationFilter: React.FC<StationSelectorProps> = (props) => {
    const [toggled, setToggled] = useState(true);
    const { data: stations } = useStations();

    const onToggleClick = () => {
        setToggled(!toggled);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        const value = e.currentTarget.value;
        if (value === 'default') {
            props.onSelectedStationChange(undefined);
        } else {
            props.onSelectedStationChange(parseInt(value));
        }
    };

    return (
        <Wrapper>
            <Header>
                <StyledFilter />
                Velg enkelte stasjoner
                {toggled ? <StyledArrowDown onClick={onToggleClick} /> : <StyledArrowUp onClick={onToggleClick} />}
            </Header>
            {toggled && (
                <Station>
                    {stations?.map((station) => (
                        <Label key={station.name + station.id}>
                            <Input
                                type="radio"
                                name="station-selector"
                                value={station.id}
                                checked={station.id === props.selectedStationId}
                                onChange={onChange}
                            />
                            {station.name}
                        </Label>
                    ))}
                    <Label key="AllRadioButton">
                        <Input
                            type="radio"
                            name="station-selector"
                            value="default"
                            checked={props.selectedStationId === undefined}
                            onChange={onChange}
                        />
                        Alle
                    </Label>
                </Station>
            )}
        </Wrapper>
    );
};
