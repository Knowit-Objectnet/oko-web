import * as React from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import { ApiLocation } from '../../types';
import { fetcher } from '../../utils/fetcher';
import { useKeycloak } from '@react-keycloak/web';
import Filter from '../../assets/Filter.svg';
import ArrowDown from '../../assets/ArrowDown.svg';
import ArrowUp from '../../assets/ArrowUp.svg';
import { useState } from 'react';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 50px;
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

interface LocationSelectorProps {
    selectedLocation: number;
    onSelectedLocationChange: (index: number) => void;
}

/*
 * Component for selecting location
 */
export const LocationSelector: React.FC<LocationSelectorProps> = (props) => {
    // Keycloak instance
    const { keycloak } = useKeycloak();
    // State
    const [toggled, setToggled] = useState(false);

    let { data: locations } = useSWR<ApiLocation[]>(['/api/locations', keycloak.token], fetcher);
    locations =
        locations && locations.length !== 0
            ? locations
            : [
                  {
                      id: 1,
                      name: 'Haraldrud',
                  },
                  {
                      id: 2,
                      name: 'Smestad',
                  },
                  {
                      id: 3,
                      name: 'Grefsen',
                  },
                  {
                      id: 4,
                      name: 'Grønmo',
                  },
                  {
                      id: 5,
                      name: 'Ryen',
                  },
              ];

    const onToggleClick = () => {
        setToggled(!toggled);
    };

    const onClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        e.persist();
        const val = parseInt(e.currentTarget.value);
        props.onSelectedLocationChange(val === props.selectedLocation ? -1 : val);
    };

    // React complains about not having an onChange function, so this is a noop function to stop the complaining
    // as we use the onClick function instead (this is because we want to be able to unselect a radio button)
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const onChange = () => {};

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
                            <input
                                type="radio"
                                name="location-selector"
                                value={location.id}
                                checked={location.id === props.selectedLocation}
                                onClick={onClick}
                                onChange={onChange}
                            />
                            {location.name}
                        </Label>
                    ))}
                </Locations>
            ) : null}
        </Wrapper>
    );
};
