import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Filter from '../../assets/Filter.svg';
import ArrowRight from '../../assets/ArrowRight.svg';
import ArrowDown from '../../assets/ArrowDown.svg';
import { useCalendarState } from './CalendarProvider';
import { useStasjoner } from '../../services/stasjon/useStasjoner';

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

const StyledArrowRight = styled(ArrowRight)`
    height: 1em;
    margin-left: 10px;
`;

const StyledArrowDown = styled(ArrowDown)`
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

export const CalendarStasjonFilter: React.FC = () => {
    const [toggled, setToggled] = useState(true);
    const { data: stasjoner } = useStasjoner();
    const { filters, setFilters } = useCalendarState();

    const onToggleClick = () => {
        setToggled(!toggled);
    };

    const handleStationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        let stasjon = filters.stasjon ? filters.stasjon : [];
        const value = e.currentTarget.value;
        const index = stasjon.indexOf(value);
        if (index == -1) stasjon.push(value);
        else stasjon.splice(index, 1);
        if (value === 'default') stasjon = [];
        console.log(value);
        console.log(stasjon);
        setFilters({ stasjon: stasjon });
    };

    return (
        <Wrapper>
            <Header>
                <StyledFilter />
                Velg enkelte stasjoner
                {toggled ? <StyledArrowDown onClick={onToggleClick} /> : <StyledArrowRight onClick={onToggleClick} />}
            </Header>
            {toggled && (
                <Stations>
                    {stasjoner?.map((station) => (
                        <Label key={station.id}>
                            <Input
                                type="checkbox"
                                name="stasjon-selector"
                                value={station.id}
                                checked={filters.stasjon?.some((stasjonId) => stasjonId === station.id)}
                                onChange={handleStationChange}
                            />
                            {station.navn}
                        </Label>
                    ))}
                    <Label key="AllRadioButton">
                        <Input
                            type="checkbox"
                            name="stasjon-selector"
                            value="default"
                            checked={filters.stasjon?.length == 0}
                            onChange={handleStationChange}
                        />
                        Alle
                    </Label>
                </Stations>
            )}
        </Wrapper>
    );
};
