import * as React from 'react';
import { usePartners } from '../../api/hooks/usePartners';
import styled from 'styled-components';

const Select = styled.select`
    width: 100%;
    min-width: 250px;
    height: 30px;
    margin-bottom: 10px;
`;

interface Props {
    selectedPartnerId?: number;
    onSelectedPartnerChange: (partnerId: number) => void;
}

export const PartnerSelect: React.FC<Props> = (props) => {
    const { data: partners, isLoading, isLoadingError } = usePartners();

    const handleSelectedPartnerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        props.onSelectedPartnerChange(parseInt(event.currentTarget.value));
    };

    return (
        <Select
            onChange={handleSelectedPartnerChange}
            disabled={isLoading || isLoadingError}
            value={props.selectedPartnerId ?? 'default'}
        >
            <option value="default" disabled>
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
    );
};
