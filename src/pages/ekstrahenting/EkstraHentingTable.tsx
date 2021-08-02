import * as React from 'react';
import { Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { KategoriList } from '../../components/KategoriList';
import { useAuth } from '../../auth/useAuth';
import { ApiEkstraHenting, ApiEkstraHentingParams } from '../../services/henting/EkstraHentingService';
import { PameldtInfo } from './PameldtInfo';
import { PartnerPameldingInfo } from './PartnerPameldingInfo';
import { HentingTimeLocation } from '../../components/henting/HentingTimeLocation';

interface Props {
    ekstraHentinger: Array<ApiEkstraHenting>;
}

export const EkstraHentingTable: React.FC<Props> = ({ ekstraHentinger }) => {
    const { user } = useAuth();

    if (ekstraHentinger && ekstraHentinger?.length <= 0) {
        return <Text fontStyle="italic">Ingen registrerte ekstrahentinger</Text>;
    }

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th scope="col">Beskrivelse</Th>
                    <Th scope="col">Informasjon</Th>
                    <Th scope="col">Kategorier</Th>
                    <Th scope="col">{user.isPartner ? 'Påmelding' : 'Påmeldt'}</Th>
                </Tr>
            </Thead>
            <Tbody>
                {ekstraHentinger?.map((ekstraHenting) => (
                    <Tr
                        key={ekstraHenting.id}
                        backgroundColor="surface"
                        borderBottomWidth="16px"
                        borderBottomColor="background"
                    >
                        <Td>
                            <Text fontWeight="bold">{ekstraHenting.beskrivelse || 'Ingen merknad skrevet'} </Text>
                        </Td>
                        <Td minWidth="56">
                            <HentingTimeLocation henting={ekstraHenting} />
                        </Td>
                        <Td>
                            <KategoriList
                                kategorier={ekstraHenting.kategorier.map((hentingKategori) => hentingKategori.kategori)}
                            />
                        </Td>
                        <Td>
                            {user.isPartner ? (
                                <PartnerPameldingInfo ekstraHenting={ekstraHenting} />
                            ) : (
                                <PameldtInfo ekstraHenting={ekstraHenting} />
                            )}
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};
