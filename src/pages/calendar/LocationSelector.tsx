import * as React from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import { ApiLocation, apiUrl } from '../../types';
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

const Locations = styled.div`
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

interface LocationSelectorProps {
    selectedLocation: number;
    onSelectedLocationChange: (index: number) => void;
}

/*
 * Component for selecting location
 */
export const LocationSelector: React.FC<LocationSelectorProps> = (props) => {
    // State
    const [toggled, setToggled] = useState(true);

    let { data: locations } = useSWR<ApiLocation[]>(`${apiUrl}/stations`, fetcher);
    locations = locations && locations.length !== 0 ? locations : [];

    const onToggleClick = () => {
        setToggled(!toggled);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        const val = parseInt(e.currentTarget.value);
        props.onSelectedLocationChange(val);
    };

    return (
        <Wrapper>
            <Header>
                <StyledFilter />
                Velg enkelte stasjoner
                {toggled ? <StyledArrowDown onClick={onToggleClick} /> : <StyledArrowUp onClick={onToggleClick} />}
            </Header>
            {toggled ? (
                <Locations>
                    {locations.map((location) => (
                        <Label key={location.name + location.id}>
                            <Input
                                type="radio"
                                name="location-selector"
                                value={location.id}
                                checked={location.id === props.selectedLocation}
                                onChange={onChange}
                            />
                            {location.name}
                        </Label>
                    ))}
                    <Label key="AllRadioButton">
                        <Input
                            type="radio"
                            name="location-selector"
                            value={-1}
                            checked={-1 === props.selectedLocation}
                            onChange={onChange}
                        />
                        Alle
                    </Label>
                </Locations>
            ) : null}
        </Wrapper>
    );
};
