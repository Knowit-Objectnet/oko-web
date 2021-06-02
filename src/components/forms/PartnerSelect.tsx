import * as React from 'react';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from './ErrorMessage';
import { usePartnere } from '../../services/partner/usePartnere';

const Wrapper = styled.div`
    width: 100%;
    min-width: 250px;
    margin-bottom: 10px;
`;

const Select = styled.select`
    width: 100%;
    height: 30px;
`;

export const PartnerSelect: React.FC = () => {
    const { data: partnere, isLoading, isLoadingError } = usePartnere();

    const { register } = useFormContext();

    return (
        <Wrapper>
            <Select {...register('selectedPartner')} disabled={isLoading || isLoadingError} defaultValue={-1}>
                <option value={-1} disabled>
                    {(isLoading && 'Laster inn...') ||
                        (isLoadingError && 'Kunne ikke laste samarbeidspartnere') ||
                        'Velg samarbeidspartner'}
                </option>
                {partnere?.map((partner) => (
                    <option value={partner.id} key={partner.id}>
                        {partner.navn}
                    </option>
                ))}
            </Select>
            <ErrorMessage name="selectedPartner" />
        </Wrapper>
    );
};
