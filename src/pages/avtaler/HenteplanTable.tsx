import * as React from 'react';
import { ButtonGroup, Table, Tbody, Td, Th, Thead, Tr, VisuallyHidden } from '@chakra-ui/react';
import { mockStasjoner } from '../../../__mocks__/mocks-new/mockAktor';
import { ApiHenteplanDownstream } from '../../services-new/HenteplanService';
import { compareAsc, parseISO } from 'date-fns';
import { HenteplanFrekvens, WorkingWeekdays } from '../../types';
import { formatDate, formatTime } from '../../utils/formatDateTime';
import { EditButton } from '../../components/buttons/EditButton';
import { DeleteButton } from '../../components/buttons/DeleteButton';

const FREKVENS: Record<HenteplanFrekvens, string> = {
    ENKELT: 'Én gang',
    UKENTLIG: 'Ukentlig',
    ANNENHVER: 'Annenhver uke',
};

const UKEDAG: Record<WorkingWeekdays, string> = {
    FRIDAY: 'Fredag',
    MONDAY: 'Mandag',
    THURSDAY: 'Tirsdag',
    TUESDAY: 'Torsdag',
    WEDNESDAY: 'Onsdag',
};

interface Props {
    henteplaner: Array<ApiHenteplanDownstream>;
}

export const HenteplanTable: React.FC<Props> = ({ henteplaner }) => {
    const sortedHenteplaner = henteplaner.sort((henteplanA, henteplanB) =>
        compareAsc(parseISO(henteplanA.startTidspunkt), parseISO(henteplanB.startTidspunkt)),
    );

    return (
        <Table size="sm">
            <Thead>
                <Tr>
                    <Th scope="col">Ukedag</Th>
                    <Th scope="col">Tidsrom</Th>
                    <Th scope="col">Stasjon</Th>
                    <Th scope="col">Frekvens</Th>
                    <Th scope="col">Periode</Th>
                    <Th scope="col">
                        <VisuallyHidden>Handlinger</VisuallyHidden>
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                {sortedHenteplaner.map((henteplan) => {
                    const stasjon = mockStasjoner.find((stasjon) => stasjon.id === henteplan.stasjonId);
                    return (
                        <Tr key={henteplan.id}>
                            <Td>{UKEDAG[henteplan.ukedag]}</Td>
                            <Td>
                                <time>{formatTime(henteplan.startTidspunkt)}</time>
                                &ndash;
                                <time>{formatTime(henteplan.sluttTidspunkt)}</time>
                            </Td>
                            <Td>{stasjon?.navn}</Td>
                            <Td>{FREKVENS[henteplan.frekvens]}</Td>
                            <Td>
                                <time dateTime={henteplan.startTidspunkt}>{formatDate(henteplan.startTidspunkt)}</time>
                                {henteplan.frekvens !== 'ENKELT' ? (
                                    <>
                                        &ndash;
                                        <time dateTime={henteplan.sluttTidspunkt}>
                                            {formatDate(henteplan.sluttTidspunkt)}
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
                })}
            </Tbody>
        </Table>
    );
};
