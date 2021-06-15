import * as React from 'react';
import { ButtonGroup, Link, Table, Tbody, Td, Th, Thead, Tr, VisuallyHidden } from '@chakra-ui/react';
import { EditButton } from '../../../components/buttons/EditButton';
import { DeleteButton } from '../../../components/buttons/DeleteButton';
import { ApiKontakt } from '../../../services/aktor/KontaktService';

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
                    <Th scope="col">E-postadresse</Th>
                    <Th scope="col">
                        <VisuallyHidden>Handlinger</VisuallyHidden>
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                {sortedKontaktPersoner.map(({ id, navn, rolle, telefon, epost }) => (
                    <Tr key={id}>
                        <Td>{navn}</Td>
                        <Td>{rolle}</Td>
                        <Td>{telefon}</Td>
                        <Td>{epost ? <Link href={`mailto:${epost}`}>{epost}</Link> : null}</Td>
                        <Td textAlign="end">
                            <ButtonGroup spacing="4" size="sm">
                                <EditButton
                                    label="Rediger"
                                    onClick={() => {
                                        console.log(`Rediger ${navn}`);
                                    }}
                                />
                                <DeleteButton
                                    label="Slett"
                                    onClick={() => {
                                        console.log(`Slett ${navn}`);
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
