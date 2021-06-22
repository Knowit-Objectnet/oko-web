import * as React from 'react';
import { DateInput } from '../../../components/forms/input/DateInput';

interface Props {
    isInterval: boolean;
    helperText: string;
}

export const HenteplanFormDato: React.FC<Props> = ({ isInterval, helperText }) => (
    <>
        {/* TODO: group startDato and sluttDato in fieldset with legend "Varighet"? */}
        <DateInput
            name="startDato"
            label={isInterval ? 'Startdato for henteplanen' : 'Dato for hentingen'}
            helperText={helperText}
            required
        />
        {isInterval ? (
            <DateInput name="sluttDato" label="Sluttdato for henteplanen" helperText={helperText} required />
        ) : null}
    </>
);
