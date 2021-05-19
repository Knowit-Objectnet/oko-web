import React from 'react';
import { ApiKontakt } from '../../services-new/AktorService';
import { Button, ButtonGroup, Icon, Table, Tbody, Td, Th, Thead, Tr, VisuallyHidden } from '@chakra-ui/react';
import Pencil from '../../assets/Pencil.svg';
import Cross from '../../assets/Cross.svg';

export const KontaktTable: React.FC<{ kontaktPersoner: Array<ApiKontakt> }> = ({ kontaktPersoner }) => (
    <Table>
        <Thead>
            <Tr>
                <Th>Navn</Th>
                <Th>Rolle</Th>
                <Th>Telefonnummer</Th>
                <Th>
                    <VisuallyHidden>Handlinger</VisuallyHidden>
                </Th>
            </Tr>
        </Thead>
        <Tbody>
            {kontaktPersoner.map((person) => (
                <Tr key={person.id}>
                    <Td>{person.navn}</Td>
                    <Td>{person.rolle}</Td>
                    <Td>{person.telefon}</Td>
                    <Td textAlign="end">
                        <ButtonGroup spacing="4" size="sm">
                            <Button
                                leftIcon={<Icon as={Pencil} />}
                                onClick={() => {
                                    console.log(`Rediger ${person.navn}`);
                                }}
                            >
                                Rediger
                            </Button>
                            <Button
                                leftIcon={<Icon as={Cross} />}
                                onClick={() => {
                                    console.log(`Slett ${person.navn}`);
                                }}
                            >
                                Slett
                            </Button>
                        </ButtonGroup>
                    </Td>
                </Tr>
            ))}
        </Tbody>
    </Table>
);
