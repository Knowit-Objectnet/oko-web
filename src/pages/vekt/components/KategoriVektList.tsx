import * as React from 'react';
import { HStack, Tag, VStack, Text } from '@chakra-ui/react';
import { ApiVektregistrering } from '../../../services/vektregistrering/VektregistreringService';

interface Props {
    vektregistreringer: Array<ApiVektregistrering>;
}

export const KategoriVektList: React.FC<Props> = ({ vektregistreringer }) => (
    <VStack as="dl" alignItems="flex-start">
        {vektregistreringer.map((vektregistrering) => (
            <HStack key={vektregistrering.id} whiteSpace="nowrap">
                <Tag as="dt" variant="kategori">
                    {vektregistrering.kategoriNavn}
                </Tag>
                <Text as="dd">{vektregistrering.vekt} kg</Text>
            </HStack>
        ))}
    </VStack>
);
