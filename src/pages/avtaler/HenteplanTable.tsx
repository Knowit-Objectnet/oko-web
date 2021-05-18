import React from 'react';
import { Button, ButtonGroup, Icon, Table, Tbody, Td, Th, Thead, Tr, VisuallyHidden } from '@chakra-ui/react';
import { mockStasjoner } from '../../../__mocks__/mocks-new/mockAktor';
import Pencil from '../../assets/Pencil.svg';
import Cross from '../../assets/Cross.svg';
import { ApiHenteplanDownstream } from '../../services-new/HenteplanService';

interface Props {
    henteplaner: Array<ApiHenteplanDownstream>;
}

export const HenteplanTable: React.FC<Props> = ({ henteplaner }) => (
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
            {henteplaner.map((henteplan) => {
                const stasjon = mockStasjoner.find((stasjon) => stasjon.id === henteplan.stasjonId);
                return (
                    <Tr key={henteplan.id}>
                        <Td>{henteplan.ukedag}</Td>
                        <Td>
                            <time>{henteplan.startTidspunkt}</time>
                            &ndash;
                            <time>{henteplan.sluttTidspunkt}</time>
                        </Td>
                        <Td>{stasjon?.navn}</Td>
                        <Td>{henteplan.frekvens}</Td>
                        <Td>
                            <time>{henteplan.startTidspunkt}</time>
                            &ndash;
                            <time>{henteplan.sluttTidspunkt}</time>
                        </Td>
                        <Td>
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
