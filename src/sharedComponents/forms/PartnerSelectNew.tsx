import * as React from 'react';
import { usePartners } from '../../api/hooks/usePartners';
import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '../forms/ErrorMessage';

const Wrapper = styled.div`
    width: 100%;
    min-width: 250px;
    margin-bottom: 10px;
`;

const Select = styled.select`
    width: 100%;
    height: 30px;
`;

export const PartnerSelectNew: React.FC = () => {
    const { data: partners, isLoading, isLoadingError } = usePartners();

    const { register } = useFormContext();

    return (
        <Wrapper>
            <Select name="selectedPartner" ref={register} disabled={isLoading || isLoadingError} defaultValue={-1}>
                <option value={-1} disabled>
                    {(isLoading && 'Laster inn...') ||
                        (isLoadingError && 'Kunne ikke laste samarbeidspartnere') ||
                        'Velg samarbeidspartner'}
                </option>
                {partners?.map((partner) => (
                    <option value={partner.id} key={partner.id}>
                        {partner.name}
                    </option>
                ))}
            </Select>
            <ErrorMessage name="selectedPartner" />
        </Wrapper>
    );
};
