import * as React from 'react';
import { RadiobuttonGroup, RadioOption } from '../../../components/forms/RadiobuttonGroup';
import { AvlystHentingAarsakStasjon } from '../../../services/henting/HentingService';
import { aarsakOptionsPartner } from './AvlystHentingFormAarsakPartner';

export const aarsakOptionsStasjon: Array<RadioOption<AvlystHentingAarsakStasjon>> = [
    { value: 'STENGT', label: 'Stasjonen er stengt' },
    { value: 'VARER', label: 'Lite varer' },
    { value: 'ANNET', label: 'Annet' },
];

export const AvlystHentingFormAarsakStasjon: React.FC = () => (
    <RadiobuttonGroup
        name="avlysningsaarsak"
        label="Avlysningsaarsak"
        options={aarsakOptionsPartner}
        helperText="Hva er årsaken til avlysningen?"
        required
    />
);
