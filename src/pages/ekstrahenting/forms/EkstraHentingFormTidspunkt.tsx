import React from 'react';
import { DateInput } from '../../../components/forms/input/DateInput';
import { TimeInput } from '../../../components/forms/input/TimeInput';

export const EkstraHentingFormTidspunkt: React.FC = () => (
    <>
        <DateInput name="dato" label="Dato" />
        <TimeInput
            name="startTidspunkt"
            label="Starttidspunkt"
            helperText="Fra hvilket tidspunkt kan partneren komme og hente?"
            required
        />
        <TimeInput
            name="sluttTidspunkt"
            label="Sluttidspunkt"
            helperText="Til hvilket tidspunkt kan partneren komme og hente?"
            required
        />
    </>
);
