import * as React from 'react';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from './ErrorMessage';
import { useStasjoner } from '../../../services/stasjon/useStasjoner';

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
    const { data: stasjoner, isLoading, isLoadingError } = useStasjoner();

    const { register } = useFormContext();

    return (
        <Wrapper>
            <Select {...register('selectedStasjon')} disabled={isLoading || isLoadingError} defaultValue={-1}>
                <option value={-1} disabled>
                    {(isLoading && 'Laster inn...') ||
                        (isLoadingError && 'Kunne ikke laste stasjoner') ||
                        'Velg stasjon'}
                </option>
                {stasjoner?.map((stasjon) => (
                    <option value={stasjon.id} key={stasjon.id}>
                        {stasjon.navn}
                    </option>
                ))}
            </Select>
            <ErrorMessage name="selectedStasjon" />
        </Wrapper>
    );
};
