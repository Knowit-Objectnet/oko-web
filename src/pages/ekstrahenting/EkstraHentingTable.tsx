import * as React from 'react';
import { Accordion, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { KategoriList } from '../../components/KategoriList';
import { useAuth } from '../../auth/useAuth';
import { ApiEkstraHenting, ApiEkstraHentingParams } from '../../services/henting/EkstraHentingService';
import { PameldtInfo } from './PameldtInfo';
import { PartnerPameldingInfo } from './PartnerPameldingInfo';
import { HentingInfoSection } from '../../components/henting/HentingInfoSection';

interface Props {
    ekstraHentinger: Array<ApiEkstraHenting>;
}

export const EkstraHentingTable: React.FC<Props> = ({ ekstraHentinger }) => {
    const { user } = useAuth();

    let ekstraHentingParams: ApiEkstraHentingParams;
    if (user.isStasjon) ekstraHentingParams = { stasjonId: user.aktorId };
    // else if (user.isPartner) ekstraHentingParams = {} //TODO: Add possibility of getting only ones related to partner
    else ekstraHentingParams = {};

    if (ekstraHentinger && ekstraHentinger?.length <= 0) {
        return <Text fontStyle="italic">Ingen registrerte ekstrahentinger</Text>;
    }

    return (
        <Accordion allowToggle>
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
                                <HentingInfoSection henting={henting} />
                            </Td>
                            <Td>
                                <KategoriList
                                    kategorier={henting.kategorier
                                        .filter((it) => it.kategori)
                                        .map((it) => it.kategori!)}
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
        </Accordion>
    );
};
