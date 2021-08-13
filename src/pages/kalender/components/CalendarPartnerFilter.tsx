import * as React from 'react';
import { usePartnere } from '../../../services/partner/usePartnere';
import { CalendarFilterSelect } from './CalendarFilterSelect';
import { ApiHentingWrapper } from '../../../services/henting/HentingService';
import { partnerHasUtlysning } from '../../../utils/ekstraHentingHelpers';

const partnerFilterFnFactory = (partnerIds: Array<string>) => {
    return (henting: ApiHentingWrapper) =>
        partnerIds.some((partnerId) => {
            const partnerOwnsHenting = henting.aktorId === partnerId;
            const partnerCanAcceptEkstraHenting =
                !henting.ekstraHenting?.godkjentUtlysning && partnerHasUtlysning(henting.ekstraHenting, partnerId);
            return partnerOwnsHenting || partnerCanAcceptEkstraHenting;
        });
};

interface Props {
    selectedPartnerIds: Array<string>;
    setSelectedPartnerIds: (stasjonIds: Array<string>) => void;
}

export const CalendarPartnerFilter: React.FC<Props> = ({ selectedPartnerIds, setSelectedPartnerIds }) => {
    const partnerQuery = usePartnere();

    return (
        <CalendarFilterSelect
            labels={{ title: 'Filtrer på partner', error: 'Beklager, klarte ikke hente partnere.' }}
            name="partnerFilter"
            query={partnerQuery}
            filterFnFactory={partnerFilterFnFactory}
            selectedAktorIds={selectedPartnerIds}
            setSelectedAktorIds={setSelectedPartnerIds}
        />
    );
};
