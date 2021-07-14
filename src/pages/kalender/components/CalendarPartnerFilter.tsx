import * as React from 'react';
import { usePartnere } from '../../../services/partner/usePartnere';
import { CalendarFilterSelect } from './CalendarFilterSelect';

export const CalendarPartnerFilter: React.FC = () => {
    const { data: partnere } = usePartnere();

    return (
        <CalendarFilterSelect
            title="Velg enkelte partnere"
            name="partner-select"
            data={partnere}
            filterName="partnerFilter"
            filterFn={(id, henting) => henting.aktorId === id}
        />
    );
};
