import * as React from 'react';
import useStations from '../../api/hooks/useStations';
import styled from 'styled-components';

const Select = styled.select`
    width: 100%;
    min-width: 250px;
    height: 30px;
    margin-bottom: 10px;
`;

interface Props {
    selectedStationId: number | undefined;
    onSelectedStationChange: (stationId: number) => void;
}

const StationSelect: React.FC<Props> = (props) => {
    const { data: stations, isLoading, isError } = useStations();

    const handleSelectedStationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.onSelectedStationChange(parseInt(event.currentTarget.value));
    };

    return (
        <Select
            onChange={handleSelectedStationChange}
            disabled={isLoading || isError}
            value={props.selectedStationId ?? 'default'}
        >
            <option value="default" disabled>
                {(isLoading && 'Laster inn...') || (isError && 'Kunne ikke laste stasjoner') || 'Velg stasjon'}
            </option>
            {stations?.map((station) => (
                <option value={station.id} key={station.id}>
                    {station.name}
                </option>
            ))}
        </Select>
    );
};

export default StationSelect;
