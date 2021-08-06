import * as React from 'react';
import { ButtonGroup, Skeleton, Table, Tbody, Td, Text, Th, Thead, Tr, VisuallyHidden, VStack } from '@chakra-ui/react';
import { useKategorier } from '../../services/kategori/useKategorier';
import { DeleteKategoriButton } from './forms/DeleteKategoriButton';
import { EditKategoriButton } from './forms/EditKategoriButton';
import { createArrayFromLength } from '../../utils/createArrayFromLength';

export const KategoriTableLoading: React.FC = () => (
    <VStack width="full" spacing="2" aria-label="Laster inn...">
        {createArrayFromLength(3).map((value) => (
            <Skeleton key={value} width="full" height="50px" />
        ))}
    </VStack>
);

export const KategoriTable: React.FC = () => {
    const { data: kategorier, isLoading, isError } = useKategorier();

    if (isLoading) {
        return <KategoriTableLoading />;
    }

    if (isError) {
        return <Text>Beklager, klarte ikke å laste kategorier.</Text>;
    }

    if (kategorier && kategorier?.length <= 0) return <Text>Ingen registrerte kategorier</Text>;

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th scope="col">Navn</Th>
                    <Th scope="col">
                        <VisuallyHidden>Handlinger</VisuallyHidden>
                    </Th>
                </Tr>
            </Thead>
            <Tbody>
                {(kategorier || []).map((kategori) => (
                    <Tr key={kategori.id}>
                        <Td>{kategori.navn}</Td>
                        <Td textAlign="end">
                            <ButtonGroup spacing="3" size="sm">
                                <EditKategoriButton kategori={kategori} />
                                <DeleteKategoriButton kategori={kategori} />
                            </ButtonGroup>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};
