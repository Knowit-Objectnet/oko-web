import * as React from 'react';
import { ButtonGroup, Link, Table, Tbody, Td, Th, Thead, Tr, VisuallyHidden } from '@chakra-ui/react';
import { DeleteButton } from '../../../components/buttons/DeleteButton';
import { ApiKontakt } from '../../../services/aktor/KontaktService';
import { EditKontaktButton } from './EditKontaktButton';

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
                {sortedKontaktPersoner.map((kontakt) => (
                    <Tr key={kontakt.id}>
                        <Td>{kontakt.navn}</Td>
                        <Td>{kontakt.rolle}</Td>
                        <Td>{kontakt.telefon}</Td>
                        <Td>{kontakt.epost ? <Link href={`mailto:${kontakt.epost}`}>{kontakt.epost}</Link> : null}</Td>
                        <Td textAlign="end">
                            <ButtonGroup spacing="4" size="sm">
                                <EditKontaktButton kontakt={kontakt} />
                                <DeleteButton
                                    label="Slett"
                                    onClick={() => {
                                        console.log(`Slett ${kontakt.navn}`);
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
