import * as React from 'react';
import { useStasjoner } from '../../../services/stasjon/useStasjoner';
import { CalendarFilterSelect } from './CalendarFilterSelect';

export const CalendarStasjonFilter: React.FC = () => {
    const { data: stasjoner } = useStasjoner();

    return (
        <CalendarFilterSelect
            title="Velg enkelte stasjoner"
            name="stasjon-select"
            data={stasjoner}
            filterName="stasjonFilter"
            filterFn={(id, henting) => henting.stasjonId === id}
        />
    );
};
