import React from 'react';
import { Button, ButtonGroup, Icon, Table, Tbody, Td, Th, Thead, Tr, VisuallyHidden } from '@chakra-ui/react';
import { mockStasjoner } from '../../../__mocks__/mocks-new/mockAktor';
import Pencil from '../../assets/Pencil.svg';
import Cross from '../../assets/Cross.svg';
import { ApiHenteplanDownstream } from '../../services-new/HenteplanService';
import { compareAsc, format, parseISO } from 'date-fns';
import { nb } from 'date-fns/locale';
import { HenteplanFrekvens, WorkingWeekdays } from '../../types';

interface Props {
    henteplaner: Array<ApiHenteplanDownstream>;
}

const formatDate = (date: string): string => format(parseISO(date), 'd. MMM yyyy', { locale: nb });
const formatTime = (date: string): string => format(parseISO(date), 'HH:mm', { locale: nb });

const frekvenser: Record<HenteplanFrekvens, string> = {
    ENKELT: 'Én gang',
    UKENTLIG: 'Ukentlig',
    ANNENHVER: 'Annenhver uke',
};

const ukedager: Record<WorkingWeekdays, string> = {
    FRIDAY: 'Fredag',
    MONDAY: 'Mandag',
    THURSDAY: 'Tirsdag',
    TUESDAY: 'Torsdag',
    WEDNESDAY: 'Onsdag',
};

export const HenteplanTable: React.FC<Props> = ({ henteplaner }) => {
    const sortedHenteplaner = henteplaner.sort((henteplanA, henteplanB) =>
        compareAsc(parseISO(henteplanA.startTidspunkt), parseISO(henteplanB.startTidspunkt)),
    );

    return (
        <Table marginTop={4}>
            <Thead>
                <Tr>
                    <Th>Ukedag</Th>
                    <Th>Tidsrom</Th>
                    <Th>Stasjon</Th>
                    <Th>Frekvens</Th>
                    <Th>Periode</Th>
                    <Th>
                        <VisuallyHidden>Handlinger</VisuallyHidden>
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                {sortedHenteplaner.map((henteplan) => {
                    const stasjon = mockStasjoner.find((stasjon) => stasjon.id === henteplan.stasjonId);
                    return (
                        <Tr key={henteplan.id}>
                            <Td>{ukedager[henteplan.ukedag]}</Td>
                            <Td>
                                <time>{formatTime(henteplan.startTidspunkt)}</time>
                                &ndash;
                                <time>{formatTime(henteplan.sluttTidspunkt)}</time>
                            </Td>
                            <Td>{stasjon?.navn}</Td>
                            <Td>{frekvenser[henteplan.frekvens]}</Td>
                            <Td>
                                <time>{formatDate(henteplan.startTidspunkt)}</time>
                                {henteplan.frekvens !== 'ENKELT' ? (
                                    <>
                                        &ndash;<time>{formatDate(henteplan.sluttTidspunkt)}</time>
                                    </>
                                ) : null}
                            </Td>
                            <Td textAlign="end">
                                <ButtonGroup spacing="4" size="sm">
                                    <Button
                                        leftIcon={<Icon as={Pencil} />}
                                        onClick={() => {
                                            console.log(`Rediger henteplan med id ${henteplan.id}`);
                                        }}
                                    >
                                        Rediger
                                    </Button>
                                    <Button
                                        leftIcon={<Icon as={Cross} />}
                                        onClick={() => {
                                            console.log(`Slett henteplan med id ${henteplan.id}`);
                                        }}
                                    >
                                        Slett
                                    </Button>
                                </ButtonGroup>
                            </Td>
                        </Tr>
                    );
                })}
            </Tbody>
        </Table>
    );
};
