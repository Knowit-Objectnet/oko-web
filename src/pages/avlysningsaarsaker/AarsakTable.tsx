import * as React from 'react';
import { ButtonGroup, Table, Tbody, Td, Text, Th, Thead, Tr, VisuallyHidden } from '@chakra-ui/react';
import { useAarsaker } from '../../services/aarsak/useAarsaker';
import { DeleteAarsakButton } from './DeleteAarsakButton';
import { EditAarsakButton } from './EditAarsakButton';

export const AarsakTable: React.FC = () => {
    // TODO: handle error/loading
    const { data: aarsaker } = useAarsaker();

    const sortedAarsaker = aarsaker?.sort((aarsakA, aarsakB) => aarsakA.beskrivelse.localeCompare(aarsakB.beskrivelse));

    if (aarsaker && aarsaker?.length <= 0) return <Text>Ingen registrerte årsaker</Text>;

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th scope="col">Beskrivelse</Th>
                    <Th scope="col">
                        <VisuallyHidden>Handlinger</VisuallyHidden>
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                {sortedAarsaker?.map((aarsak) => (
                    <Tr key={aarsak.id}>
                        <Td>{aarsak.beskrivelse}</Td>
                        <Td textAlign="end">
                            <ButtonGroup spacing="3" size="sm">
                                <EditAarsakButton aarsak={aarsak} />
                                <DeleteAarsakButton aarsak={aarsak} />
                            </ButtonGroup>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};
