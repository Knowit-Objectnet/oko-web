import * as React from 'react';
import { ButtonGroup, Table, Tbody, Td, Th, Thead, Tr, VisuallyHidden } from '@chakra-ui/react';
import { EditButton } from '../../components/buttons/EditButton';
import { DeleteButton } from '../../components/buttons/DeleteButton';
import { mockStasjoner } from '../../../__mocks__/mocks-new/mockAktor';
import { StasjonType } from '../../types';

const STASJONTYPE: Record<StasjonType, string> = {
    GJENBRUK: 'Gjenbruksstasjon',
    MINI: 'Minigjenbruksstasjon',
};

export const StasjonTable: React.FC = () => {
    // TODO: fetch from new API and handle error/loading
    const stasjoner = mockStasjoner;

    const sortedStasjoner = stasjoner.sort((stasjonA, stasjonB) => stasjonA.navn.localeCompare(stasjonB.navn, 'nb'));

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th scope="col">Navn</Th>
                    <Th scope="col">Type</Th>
                    <Th scope="col">ID</Th>
                    <Th scope="col">
                        <VisuallyHidden>Handlinger</VisuallyHidden>
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                {sortedStasjoner.map((stasjon) => (
                    <Tr key={stasjon.id}>
                        <Td>{stasjon.navn}</Td>
                        <Td>{STASJONTYPE[stasjon.type] ?? 'Ukjent type'}</Td>
                        <Td>{stasjon.id}</Td>
                        <Td textAlign="end">
                            <ButtonGroup spacing="4" size="sm">
                                <EditButton
                                    label="Rediger"
                                    onClick={() => {
                                        console.log(`Rediger ${stasjon.navn}`);
                                    }}
                                />
                                <DeleteButton
                                    label="Slett"
                                    onClick={() => {
                                        console.log(`Slett ${stasjon.navn}`);
                                    }}
                                />
                            </ButtonGroup>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};
