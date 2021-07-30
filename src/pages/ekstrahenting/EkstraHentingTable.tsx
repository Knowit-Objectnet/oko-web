import * as React from 'react';
import { Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { KategoriList } from '../../components/KategoriList';
import { useAuth } from '../../auth/useAuth';
import { ApiEkstraHentingParams } from '../../services/henting/EkstraHentingService';
import { useEkstraHentingerWithUtlysning } from '../../services/henting/useEkstraHentingerWithUtlysning';
import { PameldtInfo } from './PameldtInfo';
import { PartnerPameldingInfo } from './PartnerPameldingInfo';
import { HentingTimeLocation } from '../../components/henting/HentingTimeLocation';

export const EkstraHentingTable: React.FC = () => {
    const { user } = useAuth();

    let ekstraHentingParams: ApiEkstraHentingParams;
    if (user.isStasjon) ekstraHentingParams = { stasjonId: user.aktorId };
    // else if (user.isPartner) ekstraHentingParams = {} //TODO: Add possibility of getting only ones related to partner
    else ekstraHentingParams = {};

    const { data: ekstraHentinger } = useEkstraHentingerWithUtlysning({});

    if (ekstraHentinger && ekstraHentinger?.length <= 0) {
        return <Text>Ingen registrerte ekstrahentinger</Text>;
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
                {ekstraHentinger?.map((henting) => (
                    <Tr
                        key={henting.id}
                        backgroundColor="surface"
                        borderBottomWidth="16px"
                        borderBottomColor="background"
                    >
                        <Td>
                            <Text fontWeight="bold">{henting.beskrivelse || 'Ingen merknad skrevet'} </Text>
                        </Td>
                        <Td minWidth="56">
                            <HentingTimeLocation henting={henting} />
                        </Td>
                        <Td>
                            <KategoriList
                                kategorier={henting.kategorier.map((hentingKategori) => hentingKategori.kategori)}
                            />
                        </Td>
                        <Td>
                            {user.isPartner ? (
                                <PartnerPameldingInfo henting={henting} partnerId={user.aktorId!} />
                            ) : (
                                <PameldtInfo henting={henting} />
                            )}
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};
