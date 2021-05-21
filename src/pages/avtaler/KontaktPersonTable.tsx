import * as React from 'react';
import { ApiKontakt } from '../../services-new/AktorService';
import { ButtonGroup, Table, Tbody, Td, Th, Thead, Tr, VisuallyHidden } from '@chakra-ui/react';
import { EditButton } from '../../components/buttons/EditButton';
import { DeleteButton } from '../../components/buttons/DeleteButton';

interface Props {
    kontaktPersoner: Array<ApiKontakt>;
}

export const KontaktPersonTable: React.FC<Props> = ({ kontaktPersoner }) => {
    const sortedKontaktPersoner = kontaktPersoner.sort((kontaktPersonA, kontaktPersonB) =>
        kontaktPersonA.navn.localeCompare(kontaktPersonB.navn, 'nb'),
    );

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th scope="col">Navn</Th>
                    <Th scope="col">Rolle</Th>
                    <Th scope="col">Telefonnummer</Th>
                    <Th scope="col">
                        <VisuallyHidden>Handlinger</VisuallyHidden>
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                {sortedKontaktPersoner.map((person) => (
                    <Tr key={person.id}>
                        <Td>{person.navn}</Td>
                        <Td>{person.rolle}</Td>
                        <Td>{person.telefon}</Td>
                        <Td textAlign="end">
                            <ButtonGroup spacing="4" size="sm">
                                <EditButton
                                    label="Rediger"
                                    onClick={() => {
                                        console.log(`Rediger ${person.navn}`);
                                    }}
                                />
                                <DeleteButton
                                    label="Slett"
                                    onClick={() => {
                                        console.log(`Slett ${person.navn}`);
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