import * as React from 'react';
import { ApiAvtale } from '../../../services/avtale/AvtaleService';
import { formatDate } from '../../../utils/formatDateTime';
import { isBefore, parseISO } from 'date-fns';
import { ConditionalFieldWarning } from '../../../components/forms/ConditionalFieldWarning';
import { DateInput } from '../../../components/forms/input/DateInput';

interface Props {
    avtaleToEdit?: ApiAvtale;
}

export const AvtaleFormStartDato: React.FC<Props> = ({ avtaleToEdit }) => {
    const getEditWarning = () => {
        if (avtaleToEdit) {
            const shouldShowWarning = (editedStartDato: string) => {
                const parsedEditedStartDato = parseISO(editedStartDato);
                return avtaleToEdit.henteplaner.some((henteplan) => {
                    const parsedHenteplanStartDato = parseISO(henteplan.startTidspunkt);
                    return isBefore(parsedHenteplanStartDato, parsedEditedStartDato);
                });
            };

            const getWarningMessage = (editedStartDato: string) => ({
                title: `Avtalen har henteplaner som starter før ${formatDate(parseISO(editedStartDato))}`,
                body:
                    'Denne endringen vil justere starttidspunktet for henteplanene. Planlagte hentinger som ennå ikke er gjennomført, ' +
                    'og som kommer før det nye tidspunktet, vil bli slettet fra kalenderen.',
            });

            return (
                <ConditionalFieldWarning
                    fieldName="startDato"
                    warningCheckFn={shouldShowWarning}
                    warningMessage={getWarningMessage}
                />
            );
        }
        return null;
    };

    return (
        <>
            <DateInput name="startDato" label="Startdato for avtalen" required />
            {getEditWarning()}
        </>
    );
};
