import * as React from 'react';
import { useStasjonById } from '../../../services/stasjon/useStasjonById';
import { ButtonGroup, Td, Tr } from '@chakra-ui/react';
import { formatDate, formatTime } from '../../../utils/formatDateTime';
import { ApiHenteplan, HenteplanFrekvens, Weekday } from '../../../services/henteplan/HenteplanService';
import { parseISO } from 'date-fns';
import { DeleteHenteplanButton } from './DeleteHenteplanButton';
import { EditHenteplanButton } from './EditHenteplanButton';
import { ApiAvtale } from '../../../services/avtale/AvtaleService';
import { parseISOIgnoreTimezone } from '../../../utils/hentingDateTimeHelpers';

const FREKVENS: Record<HenteplanFrekvens, string> = {
    ENKELT: 'Én gang',
    UKENTLIG: 'Ukentlig',
    ANNENHVER: 'Annenhver uke',
};

const UKEDAG: Record<Weekday, string> = {
    MONDAY: 'Mandag',
    TUESDAY: 'Tirsdag',
    WEDNESDAY: 'Onsdag',
    THURSDAY: 'Torsdag',
    FRIDAY: 'Fredag',
    SATURDAY: 'Lørdag',
    SUNDAY: 'Søndag',
};

interface Props {
    avtale: ApiAvtale;
    henteplan: ApiHenteplan;
}

export const HenteplanRow: React.FC<Props> = ({ henteplan, avtale }) => {
    // TODO: handle loading/error
    const { data: stasjon } = useStasjonById(henteplan.stasjonId);

    return (
        <Tr key={henteplan.id}>
            <Td>{UKEDAG[henteplan.ukedag]}</Td>
            <Td>
                <time>{formatTime(parseISOIgnoreTimezone(henteplan.startTidspunkt))}</time>
                &ndash;
                <time>{formatTime(parseISOIgnoreTimezone(henteplan.sluttTidspunkt))}</time>
            </Td>
            <Td>{stasjon?.navn}</Td>
            <Td>{FREKVENS[henteplan.frekvens]}</Td>
            <Td>
                <time dateTime={henteplan.startTidspunkt}>{formatDate(parseISO(henteplan.startTidspunkt))}</time>
                {henteplan.frekvens !== 'ENKELT' ? (
                    <>
                        &ndash;
                        <time dateTime={henteplan.sluttTidspunkt}>
                            {formatDate(parseISO(henteplan.sluttTidspunkt))}
                        </time>
                    </>
                ) : null}
            </Td>
            <Td textAlign="end">
                <ButtonGroup spacing="4" size="sm">
                    <EditHenteplanButton henteplan={henteplan} avtale={avtale} />
                    <DeleteHenteplanButton henteplan={henteplan} />
                </ButtonGroup>
            </Td>
        </Tr>
    );
};
