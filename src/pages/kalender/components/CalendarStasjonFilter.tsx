import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Filter from '../../../assets/Filter.svg';
import ArrowRight from '../../../assets/ArrowRight.svg';
import ArrowDown from '../../../assets/ArrowDown.svg';
import { useCalendarState } from '../CalendarProvider';
import { useStasjoner } from '../../../services/stasjon/useStasjoner';
import { ApiPlanlagtHenting } from '../../../services/henting/HentingService';
import { Checkbox } from '@chakra-ui/react';

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
    const { setFilter } = useCalendarState();
    const [stasjonIder] = useState<Array<string>>([]);

    const onToggleClick = () => {
        setToggled(!toggled);
    };

    const handleStationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        const value = e.currentTarget.value;
        const stasjon = value === 'default' ? undefined : value;
        const index = stasjonIder.indexOf(value);
        if (!stasjon) stasjonIder.length = 0;
        else if (!~index) stasjonIder.push(stasjon);
        else stasjonIder.splice(index, 1);

        const stasjonFilterFunction = (henting: ApiPlanlagtHenting) => {
            if (stasjonIder.length === 0) return true;
            else return stasjonIder.some((stasjonId) => henting.stasjonId === stasjonId);
        };
        const filterFunctionObject = {
            stasjonFilter: stasjonFilterFunction,
        };

        setFilter(filterFunctionObject);
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
                            <Checkbox
                                name="stasjon-selector"
                                value={station.id}
                                isChecked={stasjonIder.some((stasjonId) => stasjonId === station.id)}
                                onChange={handleStationChange}
                            >
                                {station.navn}
                            </Checkbox>
                        </Label>
                    ))}
                    <Label key="AllRadioButton">
                        <Checkbox
                            name="stasjon-selector"
                            value="default"
                            isChecked={stasjonIder.length === 0}
                            onChange={handleStationChange}
                        >
                            Alle
                        </Checkbox>
                    </Label>
                </Stations>
            )}
        </Wrapper>
    );
};
