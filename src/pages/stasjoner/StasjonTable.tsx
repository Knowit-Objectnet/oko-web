import * as React from 'react';
import { ButtonGroup, Table, Tbody, Td, Text, Th, Thead, Tr, VisuallyHidden } from '@chakra-ui/react';
import { EditButton } from '../../components/buttons/EditButton';
import { useStasjoner } from '../../services/stasjon/useStasjoner';
import { DeleteStasjonButton } from './forms/DeleteStasjonButton';
import { StasjonType } from '../../services/stasjon/StasjonService';
import { EditStasjonButton } from './forms/EditStasjonButton';

const STASJONTYPE: Record<StasjonType, string> = {
    GJENBRUK: 'Gjenbruksstasjon',
    MINI: 'Minigjenbruksstasjon',
};

export const StasjonTable: React.FC = () => {
    // TODO: handle error/loading
    const { data: stasjoner } = useStasjoner();

    const sortedStasjoner = stasjoner?.sort((stasjonA, stasjonB) => stasjonA.navn.localeCompare(stasjonB.navn, 'nb'));

    if (stasjoner && stasjoner?.length <= 0) {
        return <Text>Ingen registrerte stasjoner</Text>;
    }

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
                {sortedStasjoner?.map((stasjon) => (
                    <Tr key={stasjon.id}>
                        <Td>{stasjon.navn}</Td>
                        <Td>{STASJONTYPE[stasjon.type] ?? 'Ukjent type'}</Td>
                        <Td>{stasjon.id}</Td>
                        <Td textAlign="end">
                            <ButtonGroup spacing="4" size="sm">
                                <EditStasjonButton stasjon={stasjon} />
                                {process.env.NODE_ENV === 'development' ? (
                                    // TODO: hacky solution to only show station deletion button
                                    //  when project is built for development (and not in production)
                                    <DeleteStasjonButton stasjon={stasjon} />
                                ) : null}
                            </ButtonGroup>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};
