import * as React from 'react';
import { DateInput } from '../../../../components/forms/input/DateInput';
import { ApiAvtale } from '../../../../services/avtale/AvtaleService';
import { getAvtaleVarighetString } from './HenteplanFormAvtaleInfo';

interface Props {
    isInterval: boolean;
    avtale: ApiAvtale;
}

export const HenteplanFormDato: React.FC<Props> = ({ isInterval, avtale }) => {
    const helperText = `Må være innenfor avtalens varighet (${getAvtaleVarighetString(avtale)})`;

    return (
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
};
