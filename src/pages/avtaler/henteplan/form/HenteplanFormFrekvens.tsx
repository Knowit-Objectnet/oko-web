import { RadiobuttonGroup, RadioOption } from '../../../../components/forms/RadiobuttonGroup';
import { HenteplanFrekvens } from '../../../../services/henteplan/HenteplanService';
import * as React from 'react';

export const frekvensOptions: Array<RadioOption<HenteplanFrekvens>> = [
    { value: 'ENKELT', label: 'Enkelthendelse' },
    { value: 'UKENTLIG', label: 'Ukentlig' },
    { value: 'ANNENHVER', label: 'Annenhver uke' },
];

export const HenteplanFormFrekvens: React.FC = () => (
    <RadiobuttonGroup
        name="frekvens"
        label="Frekvens"
        options={frekvensOptions}
        helperText="Hvor ofte skal hentingene skje?"
        required
    />
);
