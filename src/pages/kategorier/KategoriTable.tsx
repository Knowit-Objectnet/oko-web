import * as React from 'react';
import { ButtonGroup, Table, Tbody, Td, Text, Th, Thead, Tr, VisuallyHidden } from '@chakra-ui/react';
import { useKategorier } from '../../services/kategori/useKategorier';
import { DeleteKategoriButton } from './forms/DeleteKategoriButton';
import { EditKategoriButton } from './forms/EditKategoriButton';

export const KategoriTable: React.FC = () => {
    // TODO: handle error/loading
    const { data: kategorier } = useKategorier();

    const sortedKategorier = kategorier?.sort((kategoriA, kategoriB) => kategoriA.navn.localeCompare(kategoriB.navn));

    if (kategorier && kategorier?.length <= 0) return <Text>Ingen registrerte kategorier</Text>;

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th scope="col">Navn</Th>
                    <Th scope="col">ID</Th>
                    <Th scope="col">
                        <VisuallyHidden>Handlinger</VisuallyHidden>
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                {sortedKategorier?.map((kategori) => (
                    <Tr key={kategori.id}>
                        <Td>{kategori.navn}</Td>
                        <Td>{kategori.id}</Td>
                        <Td textAlign="end">
                            <ButtonGroup spacing="3" size="sm">
                                <EditKategoriButton kategori={kategori} />
                                {process.env.NODE_ENV === 'development' ? (
                                    <DeleteKategoriButton kategori={kategori} />
                                ) : null}
                            </ButtonGroup>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};
