import * as React from 'react';
import { HStack, Text, VStack } from '@chakra-ui/react';
import { KategoriBadge } from './KategoriBadge';

export const KategorierMedVekt: React.FC = () => (
    <>
        <VStack spacing={4}>
            {/* For each kategori */}
            <HStack>
                <KategoriBadge name="Bygg" />
                <Text fontSize="0.9rem" fontWeight="normal">
                    23 kg
                </Text>
            </HStack>
            <HStack>
                <KategoriBadge name="Barn" />
                <Text fontSize="0.9rem" fontWeight="normal">
                    23 kg
                </Text>
            </HStack>
            <HStack>
                <KategoriBadge name="Møbler" />
                <Text fontSize="0.9rem" fontWeight="normal">
                    23 kg
                </Text>
            </HStack>
        </VStack>
    </>
);
