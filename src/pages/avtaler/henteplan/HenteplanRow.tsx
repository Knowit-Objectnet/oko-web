import * as React from 'react';
import { useStasjonById } from '../../../services/stasjon/useStasjonById';
import { ButtonGroup, Td, Tr } from '@chakra-ui/react';
import { formatDate, formatTime } from '../../../utils/formatDateTime';
import { EditButton } from '../../../components/buttons/EditButton';
import { DeleteButton } from '../../../components/buttons/DeleteButton';
import { ApiHenteplan, HenteplanFrekvens, Weekday } from '../../../services/henteplan/HenteplanService';
import { localDateFromISO } from '../../../utils/localDateISO';
import { parseISO } from 'date-fns';

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
    henteplan: ApiHenteplan;
}

export const HenteplanRow: React.FC<Props> = ({ henteplan }) => {
    // TODO: handle loading/error
    const { data: stasjon } = useStasjonById(henteplan.stasjonId);

    return (
        <Tr key={henteplan.id}>
            <Td>{UKEDAG[henteplan.ukedag]}</Td>
            <Td>
                <time>{formatTime(localDateFromISO(henteplan.startTidspunkt))}</time>
                &ndash;
                <time>{formatTime(localDateFromISO(henteplan.sluttTidspunkt))}</time>
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
                    <EditButton
                        label="Rediger"
                        onClick={() => {
                            console.log(`Rediger henteplan med id ${henteplan.id}`);
                        }}
                    />
                    <DeleteButton
                        label="Slett"
                        onClick={() => {
                            console.log(`Slett henteplan med id ${henteplan.id}`);
                        }}
                    />
                </ButtonGroup>
            </Td>
        </Tr>
    );
};
