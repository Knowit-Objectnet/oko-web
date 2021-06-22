import * as React from 'react';
import { Select, SelectOption } from '../../../components/forms/Select';
import { TimeInput } from '../../../components/forms/input/TimeInput';
import { Weekday } from '../../../services/henteplan/HenteplanService';

export const ukedagOptions: Array<SelectOption<Weekday>> = [
    { value: 'MONDAY', label: 'Mandag' },
    { value: 'TUESDAY', label: 'Tirsdag' },
    { value: 'WEDNESDAY', label: 'Onsdag' },
    { value: 'THURSDAY', label: 'Torsdag' },
    { value: 'FRIDAY', label: 'Fredag' },
    { value: 'SATURDAY', label: 'Lørdag' },
    { value: 'SUNDAY', label: 'Søndag' },
];

interface Props {
    frekvensIsRecurring: boolean;
}

export const HenteplanFormTidspunkt: React.FC<Props> = ({ frekvensIsRecurring }) => (
    <>
        {/* TODO: group ukedag, starttidspunkt and sluttidspunkt in fieldset with legend "Tidspunkt"? */}
        {frekvensIsRecurring ? (
            /* TODO: convert Ukedag select to custom radio buttons */
            <Select
                name="ukedag"
                label="Ukedag"
                placeholder="Velg ukedag"
                helperText="Hvilken ukedag skal hentingene skje?"
                options={ukedagOptions}
                required
            />
        ) : null}
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
