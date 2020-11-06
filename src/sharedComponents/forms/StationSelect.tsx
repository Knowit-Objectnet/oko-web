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
    /** Optional station ID that decides which station to currently be selected in the list. */
    selectedStationId?: number;
    /** Callback triggered when end user changes what station is selected. */
    onSelectedStationChange: (stationId: number) => void;
}

/**
 * `<select>` form element that lists all available stations, as well as a default (disabled) option.
 * The list of stations is retrieved from backend REST API. If the data from backend is loading,
 * or there is an error getting the data, the `<select>` element is disabled,
 * and displays a message that informs the end user of the status.
 */
export const StationSelect: React.FC<Props> = (props) => {
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
