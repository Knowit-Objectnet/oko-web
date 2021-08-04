import * as React from 'react';
import { useStasjoner } from '../../../services/stasjon/useStasjoner';
import { CalendarFilterSelect } from './CalendarFilterSelect';
import { ApiHentingWrapper } from '../../../services/henting/HentingService';

export const CalendarStasjonFilter: React.FC = () => {
    const { data: stasjoner } = useStasjoner();

    return (
        <CalendarFilterSelect
            title="Velg enkelte stasjoner"
            data={stasjoner}
            name="stasjonFilter"
            filterFn={(stasjonIds) => {
                return (henting: ApiHentingWrapper) => stasjonIds.some((stasjonId) => henting.stasjonId === stasjonId);
            }}
        />
    );
};
