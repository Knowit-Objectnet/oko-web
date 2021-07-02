import * as React from 'react';
import { Button, space, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { StasjonType } from '../../services/stasjon/StasjonService';
import { useEkstraHentinger } from '../../services/henting/useEkstraHentinger';
import { KategoriList } from '../../components/KategoriList';
import { EkstraUttakInfo } from './EkstraUttakInfo';
import { useAuth } from '../../auth/useAuth';
import { Roles } from '../../auth/Roles';
import { ApiEkstraHentingParams } from '../../services/henting/EkstraHentingService';

export const EkstraUttakTable: React.FC = () => {
    const { user } = useAuth();

    let ekstraHentingParams: ApiEkstraHentingParams;
    if (user.isStasjon) ekstraHentingParams = { stasjonId: user.aktorId };
    // else if (user.isPartner) ekstraHentingParams = {} //TODO: Add possibility of getting only ones related to partner
    else ekstraHentingParams = {};

    const { data: ekstraHentinger } = useEkstraHentinger({});

    if (ekstraHentinger && ekstraHentinger?.length <= 0) {
        return <Text>Ingen registrerte ekstrauttak</Text>;
    }

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th scope="col">Beskrivelse</Th>
                    <Th scope="col">Informasjon</Th>
                    <Th scope="col">Kategorier</Th>
                    <Th scope="col">Påmeldt</Th>
                </Tr>
            </Thead>
            <Tbody>
                {ekstraHentinger?.map((henting) => (
                    <Tr
                        key={henting.id}
                        backgroundColor="surface"
                        borderBottomWidth="16px"
                        borderBottomColor="background"
                    >
                        <Td>{henting.merknad || 'Ingen merknad skrevet'}</Td>
                        <Td>
                            <EkstraUttakInfo henting={henting} />
                        </Td>
                        <Td>
                            <KategoriList
                                kategorier={henting.kategorier.filter((it) => it.kategori).map((it) => it.kategori!)}
                            />
                        </Td>
                        <Td>
                            {henting.godkjentUtlysning ? (
                                <Text>{henting.godkjentUtlysning.partnerNavn}</Text>
                            ) : (
                                <Text>Ingen påmeldt</Text>
                            )}
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};
