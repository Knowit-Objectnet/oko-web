import * as React from 'react';
import { ApiAvtale } from '../../../services/avtale/AvtaleService';
import { formatDate } from '../../../utils/formatDateTime';
import { addDays, isAfter, parseISO } from 'date-fns';
import { DateInput } from '../../../components/forms/DateInput';
import { ConditionalFieldWarning } from '../../../components/forms/ConditionalFieldWarning';

interface Props {
    avtaleToEdit?: ApiAvtale;
}

export const AvtaleFormSluttDato: React.FC<Props> = ({ avtaleToEdit }) => {
    const getEditWarning = () => {
        if (avtaleToEdit) {
            const shouldShowWarning = (editedSluttDato: string) => {
                const parsedEditedSluttDato = addDays(parseISO(editedSluttDato), 1);
                return avtaleToEdit.henteplaner.some((henteplan) => {
                    const parsedHenteplanSluttDato = parseISO(henteplan.sluttTidspunkt);
                    return isAfter(parsedHenteplanSluttDato, parsedEditedSluttDato);
                });
            };

            const getWarningMessage = (editedSluttDato: string) => ({
                title: `Avtalen har henteplaner som varer lenger enn til ${formatDate(parseISO(editedSluttDato))}`,
                body:
                    'Denne endringen vil justere sluttidspunktet for henteplanene. Planlagte hentinger som ennå ikke er gjennomført, ' +
                    'og kommer etter det nye tidspunktet, vil bli slettet fra kalenderen.',
            });

            return (
                <ConditionalFieldWarning
                    fieldName="sluttDato"
                    warningCheckFn={shouldShowWarning}
                    warningMessage={getWarningMessage}
                />
            );
        }
        return null;
    };

    return (
        <>
            <DateInput name="sluttDato" label="Sluttdato for avtalen" required />
            {getEditWarning()}
        </>
    );
};
