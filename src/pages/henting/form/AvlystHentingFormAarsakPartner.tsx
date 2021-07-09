import * as React from 'react';
import { RadiobuttonGroup, RadioOption } from '../../../components/forms/RadiobuttonGroup';
import { AvlystHentingAarsakPartner } from '../../../services/henting/HentingService';

export const aarsakOptionsPartner: Array<RadioOption<AvlystHentingAarsakPartner>> = [
    //Evt. kalle det aktør istedenfor partner her
    { value: 'KAPASITET', label: 'Manglende kapasitet' },
    { value: 'FERIE', label: 'Ferieavvikling' },
    { value: 'ANNET', label: 'Annet' },
];

export const AvlystHentingFormAarsakPartner: React.FC = () => (
    <RadiobuttonGroup name="avlysningsaarsak" label="Avlysningsårsak:" options={aarsakOptionsPartner} required />
);
