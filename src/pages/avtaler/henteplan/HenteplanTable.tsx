import * as React from 'react';
import { Table, Tbody, Th, Thead, Tr, VisuallyHidden } from '@chakra-ui/react';
import { compareAsc, parseISO } from 'date-fns';
import { HenteplanRow } from './HenteplanRow';
import { ApiAvtale } from '../../../services/avtale/AvtaleService';
import { useAuth } from '../../../auth/useAuth';

interface Props {
    avtale: ApiAvtale;
}

export const HenteplanTable: React.FC<Props> = ({ avtale }) => {
    let sortedHenteplaner = avtale.henteplaner.sort((henteplanA, henteplanB) =>
        compareAsc(parseISO(henteplanA.startTidspunkt), parseISO(henteplanB.startTidspunkt)),
    );

    const { user } = useAuth();
    if (user.isStasjon) {
        sortedHenteplaner = sortedHenteplaner.filter((henteplan) => user.aktorId === henteplan.stasjonId);
    }

    return (
        <Table variant="stripedNegative" size="sm">
            <Thead>
                <Tr display={{ base: 'none', xl: 'table-row' }}>
                    <Th scope="col">Ukedag</Th>
                    <Th scope="col">Tidsrom</Th>
                    <Th scope="col">Stasjon</Th>
                    <Th scope="col">Frekvens</Th>
                    <Th scope="col">Periode</Th>
                    <Th scope="col">Kategorier</Th>
                    <Th scope="col">
                        <VisuallyHidden>Handlinger</VisuallyHidden>
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                {sortedHenteplaner.map((henteplan) => (
                    <HenteplanRow key={henteplan.id} henteplan={henteplan} avtale={avtale} />
                ))}
            </Tbody>
        </Table>
    );
};
