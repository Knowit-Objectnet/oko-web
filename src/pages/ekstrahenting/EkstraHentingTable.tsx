import * as React from 'react';
import { Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { KategoriList } from '../../components/kategorier/KategoriList';
import { useAuth } from '../../auth/useAuth';
import { ApiEkstraHenting } from '../../services/henting/EkstraHentingService';
import { PameldtInfo } from './PameldtInfo';
import { PartnerPameldingInfo } from './PartnerPameldingInfo';
import { HentingTimeLocation } from '../../components/henting/HentingTimeLocation';
import { HentingListLoading } from '../../components/henting/HentingListLoading';

interface Props {
    ekstraHentinger: Array<ApiEkstraHenting>;
    isLoading: boolean;
    isError: boolean;
    isPast: boolean;
}

export const EkstraHentingTable: React.FC<Props> = ({ ekstraHentinger, isLoading, isError, isPast }) => {
    const { user } = useAuth();

    if (isLoading) {
        return <HentingListLoading />;
    }
    if (isError) {
        return <Text>Beklager, klarte ikke å laste ekstrahentinger.</Text>;
    }

    if (ekstraHentinger && ekstraHentinger?.length <= 0) {
        return <Text fontStyle="italic">Ingen registrerte ekstrahentinger</Text>;
    }

    return (
        <Table>
            <Thead>
                <Tr display={{ base: 'none', desktop: 'table-row' }}>
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
                        display={{ base: 'flex', desktop: 'table-row' }}
                        flexDir="column"
                        alignItems="center"
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

                        <Td minWidth="60" textAlign={{base: "center", desktop: "left"}}>
                            {user.isPartner ? (
                                <PartnerPameldingInfo ekstraHenting={ekstraHenting} />
                            ) : (
                                <PameldtInfo ekstraHenting={ekstraHenting} isPast={isPast} />
                            )}
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};
