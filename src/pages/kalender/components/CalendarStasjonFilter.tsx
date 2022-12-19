import * as React from 'react';
import { useStasjoner } from '../../../services/stasjon/useStasjoner';
import { CalendarFilterSelect } from './CalendarFilterSelect';
import { ApiHentingWrapper } from '../../../services/henting/HentingService';

const stasjonFilterFnFactory = (stasjonIds: Array<string>) => {
    return (henting: ApiHentingWrapper) => stasjonIds.some((stasjonId) => henting.stasjonId === stasjonId);
};

interface Props {
    selectedStasjonIds: Array<string>;
    setSelectedStasjonIds: (stasjonIds: Array<string>) => void;
}

export const CalendarStasjonFilter: React.FC<Props> = ({ selectedStasjonIds, setSelectedStasjonIds }) => {
    const stasjonerQuery = useStasjoner();

    return (
        <CalendarFilterSelect
            labels={{ title: 'Filtrer på stasjon', error: 'Beklager, klarte ikke å laste stasjoner.' }}
            name="stasjonFilter"
            data={stasjonerQuery.data}
            isLoading={stasjonerQuery.isLoading}
            isLoadingError={stasjonerQuery.isLoadingError}
            filterFnFactory={stasjonFilterFnFactory}
            selectedAktorIds={selectedStasjonIds}
            setSelectedAktorIds={setSelectedStasjonIds}
        />
    );
};
