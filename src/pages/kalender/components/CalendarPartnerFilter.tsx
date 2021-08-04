import * as React from 'react';
import { usePartnere } from '../../../services/partner/usePartnere';
import { CalendarFilterSelect } from './CalendarFilterSelect';
import { ApiHentingWrapper } from '../../../services/henting/HentingService';
import { partnerHasUtlysning } from '../../../utils/ekstraHentingHelpers';

export const CalendarPartnerFilter: React.FC = () => {
    const { data: partnere, isLoading, isError } = usePartnere();

    return (
        <CalendarFilterSelect
            title="Velg enkelte partnere"
            name="partnerFilter"
            data={partnere}
            isLoading={isLoading}
            isError={isError}
            filterFn={(partnerIds) => {
                return (henting: ApiHentingWrapper) =>
                    partnerIds.some(
                        (partnerId) =>
                            henting.aktorId === partnerId || partnerHasUtlysning(henting.ekstraHenting, partnerId),
                    );
            }}
        />
    );
};
