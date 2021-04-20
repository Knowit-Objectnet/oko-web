import * as React from 'react';
import { useStations } from '../../api/hooks/useStations';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from './ErrorMessage';

const Wrapper = styled.div`
    width: 100%;
    min-width: 250px;
    margin-bottom: 10px;
`;

const Select = styled.select`
    width: 100%;
    height: 30px;
`;

export const StationSelect: React.FC = () => {
    const { data: stations, isLoading, isLoadingError } = useStations();

    const { register } = useFormContext();

    return (
        <Wrapper>
            <Select {...register('selectedStation')} disabled={isLoading || isLoadingError} defaultValue={-1}>
                <option value={-1} disabled>
                    {(isLoading && 'Laster inn...') ||
                        (isLoadingError && 'Kunne ikke laste stasjoner') ||
                        'Velg stasjon'}
                </option>
                {stations?.map((station) => (
                    <option value={station.id} key={station.id}>
                        {station.name}
                    </option>
                ))}
            </Select>
            <ErrorMessage name="selectedStation" />
        </Wrapper>
    );
};
