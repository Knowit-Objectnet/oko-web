import * as React from 'react';
import { useStations } from '../../api/hooks/useStations';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import ErrorText from './ErrorText';

const Wrapper = styled.div`
    width: 100%;
    min-width: 250px;
    margin-bottom: 10px;
`;

const Select = styled.select`
    width: 100%;
    height: 30px;
`;

export const StationSelectNew: React.FC = () => {
    const { data: stations, isLoading, isLoadingError } = useStations();

    const { register, errors } = useFormContext();

    return (
        <Wrapper>
            <Select name="selectedStation" ref={register} disabled={isLoading || isLoadingError} defaultValue={-1}>
                <option value={-1} disabled>
                    {(isLoading && 'Laster inn...') || (isLoadingError && 'Kunne ikke laste stasjoner') || 'Velg stasjon'}
                </option>
                {stations?.map((station) => (
                    <option value={station.id} key={station.id}>
                        {station.name}
                    </option>
                ))}
            </Select>
            <ErrorMessage errors={errors} name="selectedStation" as={ErrorText} />
        </Wrapper>
    );
};
