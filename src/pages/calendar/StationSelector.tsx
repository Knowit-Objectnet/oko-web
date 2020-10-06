import * as React from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import { Station, apiUrl } from '../../types';
import { fetcher } from '../../utils/fetcher';
import Filter from '../../assets/Filter.svg';
import ArrowDown from '../../assets/ArrowDown.svg';
import ArrowUp from '../../assets/ArrowUp.svg';
import { useState } from 'react';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 50px;

    @media screen and (max-width: 900px) {
        margin-top: 0px;
        margin-left: 15px;
    }
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
`;

const Stations = styled.div`
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
    selectedStation: number;
    onSelectedStationChange: (index: number) => void;
}

/*
 * Component for selecting station
 */
export const StationSelector: React.FC<StationSelectorProps> = (props) => {
    // State
    const [toggled, setToggled] = useState(true);

    let { data: stations } = useSWR<Station[]>(`${apiUrl}/stations`, fetcher);
    stations = stations && stations.length !== 0 ? stations : [];

    const onToggleClick = () => {
        setToggled(!toggled);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        const val = parseInt(e.currentTarget.value);
        props.onSelectedStationChange(val);
    };

    return (
        <Wrapper>
            <Header>
                <StyledFilter />
                Velg enkelte stasjoner
                {toggled ? <StyledArrowDown onClick={onToggleClick} /> : <StyledArrowUp onClick={onToggleClick} />}
            </Header>
            {toggled && (
                <Stations>
                    {stations.map((station) => (
                        <Label key={station.name + station.id}>
                            <Input
                                type="radio"
                                name="location-selector"
                                value={station.id}
                                checked={station.id === props.selectedStation}
                                onChange={onChange}
                            />
                            {station.name}
                        </Label>
                    ))}
                    <Label key="AllRadioButton">
                        <Input
                            type="radio"
                            name="location-selector"
                            value={-1}
                            checked={-1 === props.selectedStation}
                            onChange={onChange}
                        />
                        Alle
                    </Label>
                </Stations>
            )}
        </Wrapper>
    );
};
