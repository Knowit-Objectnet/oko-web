import * as React from 'react';
import { HStack, Text, VStack } from '@chakra-ui/react';
import { KategoriBadge } from './KategoriBadge';
import { ApiVektregistrering } from '../../../services/vektregistrering/VektregistreringService';
import { useKategorier } from '../../../services/kategori/useKategorier';

interface Props {
    vektregistreringer: Array<ApiVektregistrering>;
}

export const KategorierMedVekt: React.FC<Props> = ({ vektregistreringer }) => {
    const { data: kategorier } = useKategorier();
    return (
        <>
            <VStack spacing={4}>
                {/* For each kategori */}
                {vektregistreringer.map((vektregistrering) => {
                    const kategori = kategorier?.find((kategori) => kategori.id === vektregistrering.kategoriId);
                    return (
                        <HStack key={vektregistrering.id}>
                            <KategoriBadge name={kategori?.navn || ''} />
                            <Text fontSize="0.9rem" fontWeight="normal">
                                {`${vektregistrering.vekt} kg`}
                            </Text>
                        </HStack>
                    );
                })}
            </VStack>
        </>
    );
};
