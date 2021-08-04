import * as React from 'react';
import { useStasjoner } from '../../../services/stasjon/useStasjoner';
import { CalendarFilterSelect } from './CalendarFilterSelect';
import { ApiHentingWrapper } from '../../../services/henting/HentingService';

const stasjonFilterFnFactory = (stasjonIds: Array<string>) => {
    return (henting: ApiHentingWrapper) => stasjonIds.some((stasjonId) => henting.stasjonId === stasjonId);
};

export const CalendarStasjonFilter: React.FC = () => {
    const stasjonerQuery = useStasjoner();

    return (
        <CalendarFilterSelect
            labels={{ title: 'Filtrer på stasjon', error: 'Beklager, klarte ikke å laste stasjoner.' }}
            name="stasjonFilter"
            query={stasjonerQuery}
            filterFnFactory={stasjonFilterFnFactory}
        />
    );
};
